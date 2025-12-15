import { Clock, Users, ChefHat } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { StarRating } from "./StarRating";
import { BookmarkButton } from "./BookmarkButton";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  onBookmarkToggle: (recipeId: string) => void;
  onClick: () => void;
  isBookmarked: boolean;
}

export function RecipeCard({
  recipe,
  onBookmarkToggle,
  onClick,
  isBookmarked,
}: RecipeCardProps) {
  const difficultyColors = {
    easy: "bg-secondary text-secondary-foreground",
    medium: "bg-primary/10 text-primary",
    hard: "bg-destructive/10 text-destructive",
  };

  return (
    <article
      className={cn(
        "group relative bg-card rounded-xl overflow-hidden",
        "shadow-sm hover:shadow-xl transition-all duration-500",
        "animate-fade-in cursor-pointer",
        "border border-border/50"
      )}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url(${recipe.image})`,
            backgroundColor: "hsl(var(--muted))",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Bookmark Button */}
        <div
          className="absolute top-3 right-3 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle(recipe.id);
          }}
        >
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggle={() => {}}
            size="md"
          />
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full">
            {recipe.category}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full capitalize",
              difficultyColors[recipe.difficulty]
            )}
          >
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime + recipe.cookTime}m</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChefHat className="w-4 h-4" />
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
        </div>

        {/* Rating */}
        <StarRating
          rating={recipe.rating}
          size="sm"
          showCount
          count={recipe.ratingCount}
        />
      </div>
    </article>
  );
}
