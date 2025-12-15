import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
  interactive?: boolean;
  userRating?: number | null;
}

export function StarRating({
  rating,
  onRate,
  size = "md",
  showCount = false,
  count = 0,
  interactive = false,
  userRating,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  const handleClick = (index: number) => {
    if (!interactive || !onRate) return;
    setAnimatingIndex(index);
    onRate(index);
    setTimeout(() => setAnimatingIndex(null), 300);
  };

  const displayRating = hoverRating || userRating || rating;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((index) => {
          const isFilled = index <= displayRating;
          const isHalfFilled = !isFilled && index - 0.5 <= displayRating;

          return (
            <button
              key={index}
              type="button"
              className={cn(
                "transition-transform duration-200 focus:outline-none",
                interactive && "cursor-pointer hover:scale-110",
                !interactive && "cursor-default",
                animatingIndex === index && "animate-star-pop"
              )}
              onMouseEnter={() => interactive && setHoverRating(index)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              onClick={() => handleClick(index)}
              disabled={!interactive}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors duration-200",
                  isFilled || isHalfFilled
                    ? "fill-star-filled text-star-filled"
                    : "fill-transparent text-star-empty"
                )}
              />
            </button>
          );
        })}
      </div>
      {showCount && (
        <span className="text-sm text-muted-foreground">
          ({count})
        </span>
      )}
      {userRating && (
        <span className="ml-1 text-xs text-primary font-medium">
          Your rating
        </span>
      )}
    </div>
  );
}
