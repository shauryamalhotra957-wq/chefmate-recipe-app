import { Recipe, FilterState, MatchResult, Ingredient } from '../types/recipe';

export const COMMON_PANTRY_STAPLES = [
  'Garlic',
  'Olive Oil',
  'Butter',
  'Eggs',
  'Chicken Breast',
  'Onion',
  'Tomatoes',
  'Soy Sauce',
  'Rice',
  'Pasta',
  'Lemon',
  'Parmesan Cheese',
  'Spinach',
  'Avocado',
  'Heavy Cream',
  'Sesame Oil',
  'Chili Flakes'
];

/**
 * Normalizes an ingredient name for flexible matching (e.g. 'eggs' -> 'egg', 'cloves of garlic' -> 'garlic')
 */
function normalizeName(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/s$/, '') // simple singular
    .replace(/es$/, '');
}

/**
 * Checks if a recipe ingredient matches any item in the user's pantry
 */
function isIngredientInPantry(recipeIngredient: Ingredient, pantryItems: string[]): boolean {
  const normRecipe = normalizeName(recipeIngredient.item);
  return pantryItems.some(pantryItem => {
    const normPantry = normalizeName(pantryItem);
    return normRecipe.includes(normPantry) || normPantry.includes(normRecipe);
  });
}

/**
 * Calculates match percentage and identifies missing ingredients for a recipe
 */
export function calculatePantryMatch(recipe: Recipe, userPantry: string[]): MatchResult {
  if (!userPantry || userPantry.length === 0) {
    return {
      recipe,
      matchScore: 0,
      matchingIngredients: [],
      missingIngredients: recipe.ingredients
    };
  }

  const matching: string[] = [];
  const missing: Ingredient[] = [];

  recipe.ingredients.forEach(ing => {
    if (isIngredientInPantry(ing, userPantry)) {
      matching.push(ing.item);
    } else {
      missing.push(ing);
    }
  });

  const matchRatio = recipe.ingredients.length > 0 
    ? matching.length / recipe.ingredients.length 
    : 0;

  const matchScore = Math.round(matchRatio * 100);

  return {
    recipe,
    matchScore,
    matchingIngredients: matching,
    missingIngredients: missing
  };
}

/**
 * Filters and sorts recipe results based on current search & filter state
 */
export function filterAndSortRecipes(
  recipes: Recipe[],
  filters: FilterState,
  userPantry: string[] = []
): MatchResult[] {
  // First calculate match results for all
  const results = recipes.map(recipe => calculatePantryMatch(recipe, userPantry));

  const filtered = results.filter(({ recipe }) => {
    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = recipe.title.toLowerCase().includes(q);
      const matchSub = recipe.subtitle.toLowerCase().includes(q);
      const matchCuisine = recipe.cuisine.toLowerCase().includes(q);
      const matchIng = recipe.ingredients.some(i => i.item.toLowerCase().includes(q));
      const matchTags = recipe.dietaryTags.some(t => t.toLowerCase().includes(q)) || recipe.moodTags.some(m => m.toLowerCase().includes(q));

      if (!matchTitle && !matchSub && !matchCuisine && !matchIng && !matchTags) {
        return false;
      }
    }

    // Meal Type
    if (filters.selectedMealType !== 'All' && recipe.mealType !== filters.selectedMealType) {
      return false;
    }

    // Cuisine
    if (filters.selectedCuisine !== 'All' && recipe.cuisine !== filters.selectedCuisine) {
      return false;
    }

    // Mood
    if (filters.selectedMood !== 'All' && !recipe.moodTags.includes(filters.selectedMood)) {
      return false;
    }

    // Difficulty
    if (filters.difficulty !== 'All' && recipe.difficulty !== filters.difficulty) {
      return false;
    }

    // Max Total Time (prep + cook)
    if (filters.maxCookTime > 0) {
      const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
      if (totalTime > filters.maxCookTime) {
        return false;
      }
    }

    // Dietary Tags (must satisfy all selected tags)
    if (filters.selectedDietary.length > 0) {
      const hasAllDietary = filters.selectedDietary.every(tag => 
        recipe.dietaryTags.includes(tag)
      );
      if (!hasAllDietary) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (filters.sortBy === 'quickest') {
      const timeA = a.recipe.prepTimeMinutes + a.recipe.cookTimeMinutes;
      const timeB = b.recipe.prepTimeMinutes + b.recipe.cookTimeMinutes;
      return timeA - timeB;
    }
    if (filters.sortBy === 'rating') {
      return b.recipe.rating - a.recipe.rating;
    }
    if (filters.sortBy === 'calories') {
      return a.recipe.nutrition.calories - b.recipe.nutrition.calories;
    }

    // Default 'recommended':
    // If user has pantry items selected, prioritize pantry match score!
    if (userPantry.length > 0) {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
    }
    return b.recipe.rating - a.recipe.rating;
  });

  return filtered;
}
