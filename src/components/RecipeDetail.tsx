import { Clock, Users, ChefHat, ArrowLeft, Check } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { StarRating } from "./StarRating";
import { BookmarkButton } from "./BookmarkButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onRate: (rating: number) => void;
  onBookmarkToggle: () => void;
  userRating: number | null;
  isBookmarked: boolean;
}

export function RecipeDetail({
  recipe,
  onBack,
  onRate,
  onBookmarkToggle,
  userRating,
  isBookmarked,
}: RecipeDetailProps) {
  const difficultyColors = {
    easy: "text-accent",
    medium: "text-primary",
    hard: "text-destructive",
  };

  return (
    <article className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2 hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to recipes
        </Button>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-medium bg-secondary rounded-full">
                {recipe.category}
              </span>
              <span
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full capitalize bg-muted",
                  difficultyColors[recipe.difficulty]
                )}
              >
                {recipe.difficulty}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
              {recipe.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {recipe.description}
            </p>
          </div>

          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggle={onBookmarkToggle}
            variant="full"
          />
        </div>
      </div>

      {/* Image */}
      <div
        className="w-full h-64 md:h-96 rounded-2xl bg-cover bg-center mb-8"
        style={{
          backgroundImage: `url(${recipe.image})`,
          backgroundColor: "hsl(var(--muted))",
        }}
      />

      {/* Meta & Rating */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-card rounded-xl border border-border/50 mb-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Time</p>
              <p className="font-semibold">{recipe.prepTime + recipe.cookTime} min</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Servings</p>
              <p className="font-semibold">{recipe.servings}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Difficulty</p>
              <p className="font-semibold capitalize">{recipe.difficulty}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <p className="text-sm text-muted-foreground mb-1">Rate this recipe</p>
          <StarRating
            rating={recipe.rating}
            onRate={onRate}
            size="lg"
            interactive
            showCount
            count={recipe.ratingCount}
            userRating={userRating}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="md:col-span-1">
          <h2 className="font-heading text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-secondary-foreground" />
                </div>
                <span className="text-sm">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="md:col-span-2">
          <h2 className="font-heading text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li
                key={index}
                className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-semibold">
                  {index + 1}
                </div>
                <p className="text-foreground/90 leading-relaxed pt-1">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
