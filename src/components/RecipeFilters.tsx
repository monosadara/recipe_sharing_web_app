import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type CategoryFilter = "all" | "Main Course" | "Soup" | "Salad" | "Dessert" | "Appetizer" | "Other";
export type DifficultyFilter = "all" | "easy" | "medium" | "hard";

interface RecipeFiltersProps {
  categoryFilter: CategoryFilter;
  difficultyFilter: DifficultyFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  onDifficultyChange: (value: DifficultyFilter) => void;
  onReset: () => void;
}

const categories: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "Main Course", label: "Main Course" },
  { value: "Soup", label: "Soup" },
  { value: "Salad", label: "Salad" },
  { value: "Dessert", label: "Dessert" },
  { value: "Appetizer", label: "Appetizer" },
  { value: "Other", label: "Other" },
];

const difficulties: { value: DifficultyFilter; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export function RecipeFilters({
  categoryFilter,
  difficultyFilter,
  onCategoryChange,
  onDifficultyChange,
  onReset,
}: RecipeFiltersProps) {
  const hasActiveFilters = categoryFilter !== "all" || difficultyFilter !== "all";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>

      <Select value={categoryFilter} onValueChange={(value) => onCategoryChange(value as CategoryFilter)}>
        <SelectTrigger className={cn(
          "w-[160px] bg-card",
          categoryFilter !== "all" && "border-primary text-primary"
        )}>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-card border border-border z-50">
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={difficultyFilter} onValueChange={(value) => onDifficultyChange(value as DifficultyFilter)}>
        <SelectTrigger className={cn(
          "w-[140px] bg-card",
          difficultyFilter !== "all" && "border-primary text-primary"
        )}>
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent className="bg-card border border-border z-50">
          {difficulties.map((diff) => (
            <SelectItem key={diff.value} value={diff.value} className="capitalize">
              {diff.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
