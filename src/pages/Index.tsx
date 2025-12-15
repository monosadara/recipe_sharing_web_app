import { useState } from "react";
import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeDetail } from "@/components/RecipeDetail";
import { RecipeFilters, CategoryFilter, DifficultyFilter } from "@/components/RecipeFilters";
import { RecipeForm } from "@/components/RecipeForm";
import { useSupabaseRecipes, RecipeWithRatings } from "@/hooks/useSupabaseRecipes";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const {
    recipes,
    isLoading,
    rateRecipe,
    toggleBookmark,
    getUserRating,
    isBookmarked,
    getBookmarkedRecipes,
    bookmarks,
    createRecipe,
    isAuthenticated,
  } = useSupabaseRecipes();

  const [selectedRecipe, setSelectedRecipe] = useState<RecipeWithRatings | null>(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");

  // Apply filters
  let displayedRecipes = showBookmarksOnly ? getBookmarkedRecipes() : recipes;

  if (categoryFilter !== "all") {
    displayedRecipes = displayedRecipes.filter((r) => r.category === categoryFilter);
  }

  if (difficultyFilter !== "all") {
    displayedRecipes = displayedRecipes.filter((r) => r.difficulty === difficultyFilter);
  }

  const handleResetFilters = () => {
    setCategoryFilter("all");
    setDifficultyFilter("all");
  };

  const handleCreateRecipe = async (data: {
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
    await createRecipe(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-52 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedRecipe) {
    const currentRecipe = recipes.find((r) => r.id === selectedRecipe.id) || selectedRecipe;
    return (
      <div className="min-h-screen bg-background">
        <Header
          recipes={showBookmarksOnly ? getBookmarkedRecipes() : recipes}
          bookmarkCount={bookmarks.length}
          showBookmarksOnly={showBookmarksOnly}
          onToggleBookmarks={() => setShowBookmarksOnly(!showBookmarksOnly)}
          onAddRecipe={() => setShowRecipeForm(true)}
        />
        <main className="container mx-auto px-4 py-8">
          <RecipeDetail
            recipe={{
              id: currentRecipe.id,
              title: currentRecipe.title,
              description: currentRecipe.description || "",
              image: currentRecipe.image || "",
              prepTime: currentRecipe.prep_time,
              cookTime: currentRecipe.cook_time,
              servings: currentRecipe.servings,
              difficulty: currentRecipe.difficulty,
              ingredients: currentRecipe.ingredients,
              instructions: currentRecipe.instructions,
              category: currentRecipe.category,
              rating: currentRecipe.rating,
              ratingCount: currentRecipe.ratingCount,
              isBookmarked: currentRecipe.isBookmarked,
              createdAt: currentRecipe.created_at,
            }}
            onBack={() => setSelectedRecipe(null)}
            onRate={(rating) => rateRecipe(currentRecipe.id, rating)}
            onBookmarkToggle={() => toggleBookmark(currentRecipe.id)}
            userRating={getUserRating(currentRecipe.id)}
            isBookmarked={isBookmarked(currentRecipe.id)}
          />
        </main>
        <RecipeForm
          open={showRecipeForm}
          onClose={() => setShowRecipeForm(false)}
          onSubmit={handleCreateRecipe}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        recipes={showBookmarksOnly ? getBookmarkedRecipes() : recipes}
        bookmarkCount={bookmarks.length}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarks={() => setShowBookmarksOnly(!showBookmarksOnly)}
        onAddRecipe={() => setShowRecipeForm(true)}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-slide-up">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {showBookmarksOnly ? "Your Saved Recipes" : "Discover Delicious Recipes"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {showBookmarksOnly
              ? "All your favorite recipes in one place. Ready to cook something amazing?"
              : "Browse our curated collection of recipes. Rate your favorites and save them for later."}
          </p>
          {!isAuthenticated && (
            <p className="text-sm text-muted-foreground mt-4">
              Sign in to save your bookmarks and ratings across devices.
            </p>
          )}
        </section>

        {/* Filters */}
        <RecipeFilters
          categoryFilter={categoryFilter}
          difficultyFilter={difficultyFilter}
          onCategoryChange={setCategoryFilter}
          onDifficultyChange={setDifficultyFilter}
          onReset={handleResetFilters}
        />

        {/* Recipe Grid */}
        {displayedRecipes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              {showBookmarksOnly
                ? "No saved recipes yet"
                : categoryFilter !== "all" || difficultyFilter !== "all"
                ? "No recipes match your filters"
                : "No recipes found"}
            </p>
            {showBookmarksOnly && (
              <p className="text-muted-foreground">
                Start exploring and bookmark recipes you love!
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-scale-in"
              >
                <RecipeCard
                  recipe={{
                    id: recipe.id,
                    title: recipe.title,
                    description: recipe.description || "",
                    image: recipe.image || "",
                    prepTime: recipe.prep_time,
                    cookTime: recipe.cook_time,
                    servings: recipe.servings,
                    difficulty: recipe.difficulty,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    category: recipe.category,
                    rating: recipe.rating,
                    ratingCount: recipe.ratingCount,
                    isBookmarked: recipe.isBookmarked,
                    createdAt: recipe.created_at,
                  }}
                  onBookmarkToggle={() => toggleBookmark(recipe.id)}
                  onClick={() => setSelectedRecipe(recipe)}
                  isBookmarked={isBookmarked(recipe.id)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>RecipeVault — Share, discover, and savor amazing recipes</p>
        </div>
      </footer>

      <RecipeForm
        open={showRecipeForm}
        onClose={() => setShowRecipeForm(false)}
        onSubmit={handleCreateRecipe}
      />
    </div>
  );
};

export default Index;
