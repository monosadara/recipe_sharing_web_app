import { Download, FileSpreadsheet, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Recipe } from "@/types/recipe";
import { exportToCSV, exportToMarkdown, parseCSVToRecipes } from "@/utils/export";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

interface ExportMenuProps {
  recipes: Recipe[];
  onImport?: (recipes: Partial<Recipe>[]) => void;
}

export function ExportMenu({ recipes, onImport }: ExportMenuProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportCSV = () => {
    if (recipes.length === 0) {
      toast({
        title: "No recipes to export",
        description: "Add some recipes first before exporting.",
        variant: "destructive",
      });
      return;
    }
    exportToCSV(recipes);
    toast({
      title: "Export successful",
      description: `Exported ${recipes.length} recipes to CSV for Google Sheets.`,
    });
  };

  const handleExportMarkdown = () => {
    if (recipes.length === 0) {
      toast({
        title: "No recipes to export",
        description: "Add some recipes first before exporting.",
        variant: "destructive",
      });
      return;
    }
    exportToMarkdown(recipes);
    toast({
      title: "Export successful",
      description: `Exported ${recipes.length} recipes to Markdown for Notion.`,
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const importedRecipes = parseCSVToRecipes(content);
        
        if (onImport && importedRecipes.length > 0) {
          onImport(importedRecipes);
          toast({
            title: "Import successful",
            description: `Imported ${importedRecipes.length} recipes from CSV.`,
          });
        } else {
          toast({
            title: "No recipes found",
            description: "The CSV file appears to be empty or incorrectly formatted.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "There was an error parsing the CSV file.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export / Import
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleExportCSV} className="gap-3 cursor-pointer">
            <FileSpreadsheet className="w-4 h-4 text-accent" />
            <div>
              <p className="font-medium">Export to CSV</p>
              <p className="text-xs text-muted-foreground">For Google Sheets</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportMarkdown} className="gap-3 cursor-pointer">
            <FileText className="w-4 h-4 text-primary" />
            <div>
              <p className="font-medium">Export to Markdown</p>
              <p className="text-xs text-muted-foreground">For Notion</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleImportClick} className="gap-3 cursor-pointer">
            <Upload className="w-4 h-4" />
            <div>
              <p className="font-medium">Import from CSV</p>
              <p className="text-xs text-muted-foreground">From Google Sheets</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
