import { useState, useEffect } from "react";
import { Recipe, UserRating } from "@/types/recipe";
import { initialRecipes } from "@/data/recipes";

const RECIPES_STORAGE_KEY = "recipes";
const RATINGS_STORAGE_KEY = "userRatings";
const BOOKMARKS_STORAGE_KEY = "bookmarks";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userRatings, setUserRatings] = useState<UserRating[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load recipes from localStorage or use initial data
    const storedRecipes = localStorage.getItem(RECIPES_STORAGE_KEY);
    const storedRatings = localStorage.getItem(RATINGS_STORAGE_KEY);
    const storedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);

    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    } else {
      setRecipes(initialRecipes);
      localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(initialRecipes));
    }

    if (storedRatings) {
      setUserRatings(JSON.parse(storedRatings));
    }

    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }

    setIsLoading(false);
  }, []);

  const rateRecipe = (recipeId: string, rating: number) => {
    // Update user ratings
    const existingRatingIndex = userRatings.findIndex(r => r.recipeId === recipeId);
    let newUserRatings: UserRating[];
    
    if (existingRatingIndex >= 0) {
      newUserRatings = [...userRatings];
      newUserRatings[existingRatingIndex] = { recipeId, rating };
    } else {
      newUserRatings = [...userRatings, { recipeId, rating }];
    }
    
    setUserRatings(newUserRatings);
    localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(newUserRatings));

    // Update recipe average rating
    const updatedRecipes = recipes.map(recipe => {
      if (recipe.id === recipeId) {
        const wasRatedBefore = existingRatingIndex >= 0;
        const newCount = wasRatedBefore ? recipe.ratingCount : recipe.ratingCount + 1;
        const oldTotal = recipe.rating * recipe.ratingCount;
        const previousUserRating = wasRatedBefore ? userRatings[existingRatingIndex].rating : 0;
        const adjustedTotal = wasRatedBefore ? oldTotal - previousUserRating + rating : oldTotal + rating;
        const newRating = adjustedTotal / newCount;
        
        return {
          ...recipe,
          rating: Math.round(newRating * 10) / 10,
          ratingCount: newCount,
        };
      }
      return recipe;
    });

    setRecipes(updatedRecipes);
    localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(updatedRecipes));
  };

  const toggleBookmark = (recipeId: string) => {
    const isBookmarked = bookmarks.includes(recipeId);
    const newBookmarks = isBookmarked
      ? bookmarks.filter(id => id !== recipeId)
      : [...bookmarks, recipeId];
    
    setBookmarks(newBookmarks);
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(newBookmarks));

    const updatedRecipes = recipes.map(recipe =>
      recipe.id === recipeId
        ? { ...recipe, isBookmarked: !isBookmarked }
        : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(updatedRecipes));
  };

  const getUserRating = (recipeId: string): number | null => {
    const rating = userRatings.find(r => r.recipeId === recipeId);
    return rating ? rating.rating : null;
  };

  const isBookmarked = (recipeId: string): boolean => {
    return bookmarks.includes(recipeId);
  };

  const getBookmarkedRecipes = (): Recipe[] => {
    return recipes.filter(recipe => bookmarks.includes(recipe.id));
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
  };
}
