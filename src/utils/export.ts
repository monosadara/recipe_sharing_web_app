import { Recipe } from "@/types/recipe";

export function exportToCSV(recipes: Recipe[]): void {
  const headers = [
    "Title",
    "Description",
    "Category",
    "Difficulty",
    "Prep Time (min)",
    "Cook Time (min)",
    "Servings",
    "Rating",
    "Ingredients",
    "Instructions",
  ];

  const rows = recipes.map((recipe) => [
    `"${recipe.title.replace(/"/g, '""')}"`,
    `"${recipe.description.replace(/"/g, '""')}"`,
    recipe.category,
    recipe.difficulty,
    recipe.prepTime,
    recipe.cookTime,
    recipe.servings,
    recipe.rating,
    `"${recipe.ingredients.join("; ").replace(/"/g, '""')}"`,
    `"${recipe.instructions.join(" | ").replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  
  downloadFile(csvContent, "recipes.csv", "text/csv");
}

export function exportToMarkdown(recipes: Recipe[]): void {
  const markdownContent = recipes
    .map((recipe) => {
      return `# ${recipe.title}

${recipe.description}

## Details
- **Category:** ${recipe.category}
- **Difficulty:** ${recipe.difficulty}
- **Prep Time:** ${recipe.prepTime} minutes
- **Cook Time:** ${recipe.cookTime} minutes
- **Servings:** ${recipe.servings}
- **Rating:** ${recipe.rating}/5 (${recipe.ratingCount} reviews)

## Ingredients
${recipe.ingredients.map((i) => `- ${i}`).join("\n")}

## Instructions
${recipe.instructions.map((inst, idx) => `${idx + 1}. ${inst}`).join("\n")}

---
`;
    })
    .join("\n\n");

  downloadFile(markdownContent, "recipes.md", "text/markdown");
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseCSVToRecipes(csvContent: string): Partial<Recipe>[] {
  const lines = csvContent.split("\n");
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
  
  return lines.slice(1).filter(line => line.trim()).map((line, index) => {
    const values = parseCSVLine(line);
    const recipe: Partial<Recipe> = {
      id: `imported-${Date.now()}-${index}`,
      title: values[headers.indexOf("title")] || "Untitled Recipe",
      description: values[headers.indexOf("description")] || "",
      category: values[headers.indexOf("category")] || "Main Course",
      difficulty: (values[headers.indexOf("difficulty")] as Recipe["difficulty"]) || "medium",
      prepTime: parseInt(values[headers.indexOf("prep time (min)")] || "0"),
      cookTime: parseInt(values[headers.indexOf("cook time (min)")] || "0"),
      servings: parseInt(values[headers.indexOf("servings")] || "4"),
      rating: parseFloat(values[headers.indexOf("rating")] || "0"),
      ratingCount: 0,
      ingredients: values[headers.indexOf("ingredients")]?.split(";").map(i => i.trim()) || [],
      instructions: values[headers.indexOf("instructions")]?.split("|").map(i => i.trim()) || [],
      image: "/placeholder.svg",
      isBookmarked: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    return recipe;
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}
