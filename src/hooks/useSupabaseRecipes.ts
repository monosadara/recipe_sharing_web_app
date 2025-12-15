import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface DbRecipe {
  id: string;
  user_id: string | null;
  title: string;
  description: string | null;
  image: string | null;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  ingredients: string[];
  instructions: string[];
  category: string;
  created_at: string;
  updated_at: string;
}

export interface RecipeWithRatings extends DbRecipe {
  rating: number;
  ratingCount: number;
  isBookmarked: boolean;
}

export function useSupabaseRecipes() {
  const { user, isAuthenticated } = useAuth();
  const [recipes, setRecipes] = useState<RecipeWithRatings[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all recipes with ratings
  const fetchRecipes = useCallback(async () => {
    try {
      const { data: recipesData, error: recipesError } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (recipesError) throw recipesError;

      // Fetch all ratings for calculating averages
      const { data: ratingsData, error: ratingsError } = await supabase
        .from("ratings")
        .select("recipe_id, rating");

      if (ratingsError) throw ratingsError;

      // Calculate average ratings per recipe
      const ratingsByRecipe: Record<string, { sum: number; count: number }> = {};
      ratingsData?.forEach((r) => {
        if (!ratingsByRecipe[r.recipe_id]) {
          ratingsByRecipe[r.recipe_id] = { sum: 0, count: 0 };
        }
        ratingsByRecipe[r.recipe_id].sum += r.rating;
        ratingsByRecipe[r.recipe_id].count += 1;
      });

      // Fetch user bookmarks if authenticated
      let userBookmarks: string[] = [];
      let userRatingsMap: Record<string, number> = {};

      if (user) {
        const { data: bookmarksData } = await supabase
          .from("bookmarks")
          .select("recipe_id")
          .eq("user_id", user.id);

        userBookmarks = bookmarksData?.map((b) => b.recipe_id) || [];

        const { data: userRatingsData } = await supabase
          .from("ratings")
          .select("recipe_id, rating")
          .eq("user_id", user.id);

        userRatingsData?.forEach((r) => {
          userRatingsMap[r.recipe_id] = r.rating;
        });
      }

      setBookmarks(userBookmarks);
      setUserRatings(userRatingsMap);

      const recipesWithRatings: RecipeWithRatings[] = (recipesData || []).map((recipe) => {
        const recipeRatings = ratingsByRecipe[recipe.id];
        return {
          ...recipe,
          difficulty: recipe.difficulty as "easy" | "medium" | "hard",
          rating: recipeRatings
            ? Math.round((recipeRatings.sum / recipeRatings.count) * 10) / 10
            : 0,
          ratingCount: recipeRatings?.count || 0,
          isBookmarked: userBookmarks.includes(recipe.id),
        };
      });

      setRecipes(recipesWithRatings);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Failed to load recipes");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Rate a recipe
  const rateRecipe = async (recipeId: string, rating: number) => {
    if (!user) {
      toast.error("Please sign in to rate recipes");
      return;
    }

    try {
      const { error } = await supabase.from("ratings").upsert(
        {
          user_id: user.id,
          recipe_id: recipeId,
          rating,
        },
        { onConflict: "user_id,recipe_id" }
      );

      if (error) throw error;

      setUserRatings((prev) => ({ ...prev, [recipeId]: rating }));
      await fetchRecipes(); // Refresh to get updated averages
      toast.success("Rating saved!");
    } catch (error) {
      console.error("Error rating recipe:", error);
      toast.error("Failed to save rating");
    }
  };

  // Toggle bookmark
  const toggleBookmark = async (recipeId: string) => {
    if (!user) {
      toast.error("Please sign in to bookmark recipes");
      return;
    }

    const isCurrentlyBookmarked = bookmarks.includes(recipeId);

    try {
      if (isCurrentlyBookmarked) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("recipe_id", recipeId);

        if (error) throw error;

        setBookmarks((prev) => prev.filter((id) => id !== recipeId));
        setRecipes((prev) =>
          prev.map((r) =>
            r.id === recipeId ? { ...r, isBookmarked: false } : r
          )
        );
      } else {
        const { error } = await supabase.from("bookmarks").insert({
          user_id: user.id,
          recipe_id: recipeId,
        });

        if (error) throw error;

        setBookmarks((prev) => [...prev, recipeId]);
        setRecipes((prev) =>
          prev.map((r) =>
            r.id === recipeId ? { ...r, isBookmarked: true } : r
          )
        );
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Failed to update bookmark");
    }
  };

  // Create a new recipe
  const createRecipe = async (recipeData: {
    title: string;
    description: string;
    image?: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: "easy" | "medium" | "hard";
    category: string;
    ingredients: string[];
    instructions: string[];
  }) => {
    if (!user) {
      toast.error("Please sign in to create recipes");
      return;
    }

    try {
      const { error } = await supabase.from("recipes").insert({
        user_id: user.id,
        title: recipeData.title,
        description: recipeData.description,
        image: recipeData.image || null,
        prep_time: recipeData.prepTime,
        cook_time: recipeData.cookTime,
        servings: recipeData.servings,
        difficulty: recipeData.difficulty,
        category: recipeData.category,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
      });

      if (error) throw error;

      await fetchRecipes();
      toast.success("Recipe created successfully!");
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast.error("Failed to create recipe");
      throw error;
    }
  };

  const getUserRating = (recipeId: string): number | null => {
    return userRatings[recipeId] || null;
  };

  const isBookmarked = (recipeId: string): boolean => {
    return bookmarks.includes(recipeId);
  };

  const getBookmarkedRecipes = (): RecipeWithRatings[] => {
    return recipes.filter((recipe) => bookmarks.includes(recipe.id));
  };

  return {
    recipes,
    isLoading,
    rateRecipe,
    toggleBookmark,
    getUserRating,
    isBookmarked,
    getBookmarkedRecipes,
    bookmarks,
    createRecipe,
    refetch: fetchRecipes,
    isAuthenticated,
  };
}
