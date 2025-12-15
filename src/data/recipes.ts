import { Recipe } from "@/types/recipe";
import tuscanChickenImg from "@/assets/recipe-tuscan-chicken.jpg";
import frenchOnionImg from "@/assets/recipe-french-onion.jpg";
import quinoaBowlImg from "@/assets/recipe-quinoa-bowl.jpg";
import margheritaPizzaImg from "@/assets/recipe-margherita-pizza.jpg";
import lavaCakeImg from "@/assets/recipe-lava-cake.jpg";
import thaiCurryImg from "@/assets/recipe-thai-curry.jpg";

export const initialRecipes: Recipe[] = [
  {
    id: "1",
    title: "Creamy Tuscan Garlic Chicken",
    description: "Sun-dried tomatoes, garlic, and spinach in a creamy sauce that's perfect over pasta or with crusty bread.",
    image: tuscanChickenImg,
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "medium",
    ingredients: [
      "4 boneless chicken breasts",
      "2 tablespoons olive oil",
      "1 cup heavy cream",
      "1/2 cup chicken broth",
      "1 cup sun-dried tomatoes",
      "3 cups fresh spinach",
      "6 cloves garlic, minced",
      "1 teaspoon Italian seasoning",
      "1/2 cup parmesan cheese",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season chicken with salt, pepper, and Italian seasoning.",
      "Heat olive oil in a large skillet over medium-high heat.",
      "Sear chicken for 5-7 minutes per side until golden and cooked through. Remove and set aside.",
      "In the same skillet, add garlic and sauté for 1 minute.",
      "Add heavy cream and chicken broth, stirring to combine.",
      "Add sun-dried tomatoes and parmesan, simmer for 3 minutes.",
      "Add spinach and cook until wilted.",
      "Return chicken to the skillet and simmer for 5 minutes.",
      "Serve immediately with pasta or crusty bread."
    ],
    category: "Main Course",
    rating: 4.8,
    ratingCount: 124,
    isBookmarked: false,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Classic French Onion Soup",
    description: "Rich beef broth with caramelized onions, topped with crusty bread and melted Gruyère cheese.",
    image: frenchOnionImg,
    prepTime: 20,
    cookTime: 60,
    servings: 6,
    difficulty: "medium",
    ingredients: [
      "4 large onions, thinly sliced",
      "4 tablespoons butter",
      "6 cups beef broth",
      "1 cup dry white wine",
      "2 sprigs fresh thyme",
      "1 bay leaf",
      "6 slices French bread",
      "2 cups Gruyère cheese, grated",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Melt butter in a large pot over medium heat.",
      "Add onions and cook slowly for 45 minutes, stirring occasionally until deeply caramelized.",
      "Add wine and scrape up any browned bits from the bottom.",
      "Add beef broth, thyme, and bay leaf. Simmer for 30 minutes.",
      "Season with salt and pepper to taste.",
      "Ladle soup into oven-safe bowls.",
      "Top each with a slice of bread and generous amount of cheese.",
      "Broil until cheese is bubbly and golden.",
      "Serve immediately with caution - bowls will be hot!"
    ],
    category: "Soup",
    rating: 4.9,
    ratingCount: 89,
    isBookmarked: true,
    createdAt: "2024-01-10"
  },
  {
    id: "3",
    title: "Mediterranean Quinoa Bowl",
    description: "Fresh and healthy bowl with quinoa, cucumber, tomatoes, feta, and a lemon herb dressing.",
    image: quinoaBowlImg,
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "easy",
    ingredients: [
      "1 cup quinoa",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, finely diced",
      "1/2 cup kalamata olives",
      "1/2 cup feta cheese, crumbled",
      "3 tablespoons olive oil",
      "2 tablespoons lemon juice",
      "2 tablespoons fresh parsley",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook quinoa according to package instructions and let cool.",
      "In a large bowl, combine cucumber, tomatoes, red onion, and olives.",
      "Add cooled quinoa and toss to combine.",
      "Whisk together olive oil, lemon juice, salt, and pepper.",
      "Pour dressing over salad and mix well.",
      "Top with crumbled feta and fresh parsley.",
      "Serve immediately or refrigerate for later."
    ],
    category: "Salad",
    rating: 4.6,
    ratingCount: 67,
    isBookmarked: false,
    createdAt: "2024-01-20"
  },
  {
    id: "4",
    title: "Homemade Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella, basil, and a perfect homemade crust.",
    image: margheritaPizzaImg,
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: "medium",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 packet active dry yeast",
      "1 teaspoon sugar",
      "1 teaspoon salt",
      "3/4 cup warm water",
      "2 tablespoons olive oil",
      "1 cup San Marzano tomatoes, crushed",
      "8 oz fresh mozzarella, sliced",
      "Fresh basil leaves",
      "Extra virgin olive oil for drizzling"
    ],
    instructions: [
      "Combine warm water, yeast, and sugar. Let sit for 5 minutes until foamy.",
      "Mix flour and salt in a large bowl. Add yeast mixture and olive oil.",
      "Knead dough for 10 minutes until smooth and elastic.",
      "Let rise in a warm place for 1 hour until doubled.",
      "Preheat oven to 475°F with a pizza stone if available.",
      "Stretch dough into a 12-inch circle.",
      "Spread crushed tomatoes evenly, leaving a border.",
      "Top with mozzarella slices.",
      "Bake for 12-15 minutes until crust is golden and cheese is bubbling.",
      "Top with fresh basil and drizzle with olive oil."
    ],
    category: "Main Course",
    rating: 4.7,
    ratingCount: 156,
    isBookmarked: false,
    createdAt: "2024-01-08"
  },
  {
    id: "5",
    title: "Chocolate Lava Cakes",
    description: "Decadent individual chocolate cakes with a molten center. Perfect for special occasions.",
    image: lavaCakeImg,
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    difficulty: "hard",
    ingredients: [
      "4 oz bittersweet chocolate",
      "1/2 cup butter",
      "1 cup powdered sugar",
      "2 eggs",
      "2 egg yolks",
      "6 tablespoons flour",
      "Butter and cocoa for ramekins",
      "Vanilla ice cream for serving",
      "Fresh raspberries for garnish"
    ],
    instructions: [
      "Preheat oven to 425°F. Butter and dust 4 ramekins with cocoa.",
      "Melt chocolate and butter together in a double boiler or microwave.",
      "Stir in powdered sugar until smooth.",
      "Whisk in eggs and egg yolks.",
      "Fold in flour until just combined.",
      "Divide batter among prepared ramekins.",
      "Bake for exactly 12 minutes - edges should be firm, center soft.",
      "Let cool for 1 minute, then invert onto plates.",
      "Serve immediately with ice cream and raspberries."
    ],
    category: "Dessert",
    rating: 4.9,
    ratingCount: 203,
    isBookmarked: true,
    createdAt: "2024-01-25"
  },
  {
    id: "6",
    title: "Thai Green Curry",
    description: "Aromatic coconut curry with vegetables and your choice of protein. Ready in 30 minutes.",
    image: thaiCurryImg,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "easy",
    ingredients: [
      "2 tablespoons green curry paste",
      "1 can coconut milk",
      "1 lb chicken or tofu, cubed",
      "1 cup bamboo shoots",
      "1 red bell pepper, sliced",
      "1 cup Thai basil leaves",
      "2 tablespoons fish sauce",
      "1 tablespoon palm sugar",
      "4 kaffir lime leaves",
      "Jasmine rice for serving"
    ],
    instructions: [
      "Heat a tablespoon of coconut cream in a wok over medium-high heat.",
      "Add curry paste and fry for 1 minute until fragrant.",
      "Add chicken/tofu and cook until lightly browned.",
      "Pour in remaining coconut milk and bring to a simmer.",
      "Add bamboo shoots, bell pepper, and lime leaves.",
      "Season with fish sauce and palm sugar.",
      "Simmer for 10 minutes until vegetables are tender.",
      "Stir in Thai basil just before serving.",
      "Serve over jasmine rice."
    ],
    category: "Main Course",
    rating: 4.5,
    ratingCount: 78,
    isBookmarked: false,
    createdAt: "2024-01-18"
  }
];
