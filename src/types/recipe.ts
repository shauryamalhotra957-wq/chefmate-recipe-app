export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';

export type Cuisine = 
  | 'Italian'
  | 'Mexican'
  | 'Asian'
  | 'Indian'
  | 'Mediterranean'
  | 'American'
  | 'Middle Eastern'
  | 'French';

export type DietaryTag = 
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Keto'
  | 'Dairy-Free'
  | 'High-Protein'
  | 'Low-Carb'
  | 'Quick (<30m)';

export type MoodTag = 
  | 'Comfort Food'
  | 'Quick & Easy'
  | 'Light & Fresh'
  | 'High Protein'
  | 'Date Night'
  | 'One-Pot Wonder'
  | 'Sweet Tooth';

export interface Ingredient {
  item: string;
  amount: number; // base amount for baseServings
  unit: string;
  metricAmount?: number;
  metricUnit?: string;
  notes?: string;
  category?: string; // Produce, Meat, Dairy, Pantry, Spices
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  timerSeconds?: number; // e.g. 300 = 5 min
  ingredientsUsed?: string[]; // list of item names used in this step
  tip?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber?: number;  // in grams
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cuisine: Cuisine;
  mealType: MealType;
  difficulty: Difficulty;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  baseServings: number;
  dietaryTags: DietaryTag[];
  moodTags: MoodTag[];
  nutrition: NutritionInfo;
  ingredients: Ingredient[];
  steps: CookingStep[];
  rating: number;
  reviewCount: number;
  author?: string;
  isCustom?: boolean;
}

export interface GroceryItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  checked: boolean;
  recipeSource?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedMealType: MealType | 'All';
  selectedCuisine: Cuisine | 'All';
  selectedDietary: DietaryTag[];
  selectedMood: MoodTag | 'All';
  maxCookTime: number; // 0 means any
  difficulty: Difficulty | 'All';
  sortBy: 'recommended' | 'quickest' | 'rating' | 'calories';
}

export interface MatchResult {
  recipe: Recipe;
  matchScore: number; // 0 to 100
  matchingIngredients: string[];
  missingIngredients: Ingredient[];
}
