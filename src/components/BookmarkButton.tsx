import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "full";
}

export function BookmarkButton({
  isBookmarked,
  onToggle,
  size = "md",
  variant = "icon",
}: BookmarkButtonProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  if (variant === "full") {
    return (
      <Button
        variant={isBookmarked ? "default" : "outline"}
        onClick={onToggle}
        className={cn(
          "transition-all duration-300",
          isBookmarked && "animate-bookmark-bounce"
        )}
      >
        <Bookmark
          className={cn(
            "w-4 h-4 mr-2",
            isBookmarked ? "fill-current" : "fill-transparent"
          )}
        />
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </Button>
    );
  }

  return (
    <button
      onClick={onToggle}
      className={cn(
        buttonSizes[size],
        "rounded-full flex items-center justify-center transition-all duration-300",
        "bg-background/80 backdrop-blur-sm hover:bg-background",
        "shadow-md hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        isBookmarked && "animate-bookmark-bounce"
      )}
    >
      <Bookmark
        className={cn(
          sizeClasses[size],
          "transition-colors duration-200",
          isBookmarked
            ? "fill-primary text-primary"
            : "fill-transparent text-foreground/60 hover:text-foreground"
        )}
      />
    </button>
  );
}
