export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  category: string;
  rating: number;
  ratingCount: number;
  isBookmarked: boolean;
  createdAt: string;
}

export interface UserRating {
  recipeId: string;
  rating: number;
}
