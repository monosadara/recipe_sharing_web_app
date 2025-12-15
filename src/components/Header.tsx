import { ChefHat, Bookmark, Plus, LogIn, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExportMenu } from "./ExportMenu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  bookmarkCount: number;
  showBookmarksOnly: boolean;
  onToggleBookmarks: () => void;
  onAddRecipe: () => void;
  recipes: Array<{
    title: string;
    description: string | null;
    ingredients: string[];
    instructions: string[];
    category: string;
    prep_time: number;
    cook_time: number;
    servings: number;
  }>;
}

export function Header({
  bookmarkCount,
  showBookmarksOnly,
  onToggleBookmarks,
  onAddRecipe,
  recipes,
}: HeaderProps) {
  const navigate = useNavigate();
  const { user, signOut, isAuthenticated } = useAuth();

  const exportRecipes = recipes.map((r) => ({
    title: r.title,
    description: r.description || "",
    image: "",
    prepTime: r.prep_time,
    cookTime: r.cook_time,
    servings: r.servings,
    difficulty: "easy" as const,
    ingredients: r.ingredients,
    instructions: r.instructions,
    category: r.category,
    rating: 0,
    ratingCount: 0,
    isBookmarked: false,
    createdAt: "",
    id: "",
  }));

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Now Clickable */}
          {/* Logo - Now Clickable */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="p-2 bg-primary/10 rounded-xl">
              <ChefHat className="w-7 h-7 text-primary" />
            </div>
            <div className="text-left">
              <h1 className="font-heading text-2xl font-bold">RecipeVault</h1>
              <p className="text-xs text-muted-foreground">Share & discover recipes</p>
            </div>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <Button
                variant="default"
                onClick={onAddRecipe}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Recipe</span>
              </Button>
            )}

            <Button
              variant={showBookmarksOnly ? "default" : "outline"}
              onClick={onToggleBookmarks}
              className={cn(
                "gap-2 transition-all",
                showBookmarksOnly && "shadow-md"
              )}
            >
              <Bookmark
                className={cn(
                  "w-4 h-4",
                  showBookmarksOnly && "fill-current"
                )}
              />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className={cn(
                  "ml-1 px-2 py-0.5 text-xs rounded-full",
                  showBookmarksOnly 
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-primary/10 text-primary"
                )}>
                  {bookmarkCount}
                </span>
              )}
            </Button>

            <ExportMenu recipes={exportRecipes} />

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border border-border z-50">
                  <div className="px-3 py-2 text-sm">
                    <p className="font-medium truncate max-w-[200px]">
                      {user?.user_metadata?.display_name || user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate("/auth")}
                className="gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}