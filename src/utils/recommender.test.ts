import { describe, it, expect } from 'vitest';
import { calculatePantryMatch, filterAndSortRecipes, COMMON_PANTRY_STAPLES } from './recommender';
import { Recipe, FilterState } from '../types/recipe';

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Garlic Butter Spaghetti',
    subtitle: 'Quick and comforting pasta',
    description: 'Classic garlic butter spaghetti with parmesan and herbs.',
    cuisine: 'Italian',
    mealType: 'Dinner',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    difficulty: 'Easy',
    baseServings: 2,
    rating: 4.8,
    reviewCount: 120,
    image: '',
    dietaryTags: ['Vegetarian'],
    moodTags: ['Comfort Food', 'Quick & Easy'],
    nutrition: { calories: 420, protein: 12, carbs: 65, fat: 14 },
    ingredients: [
      { item: 'Spaghetti Pasta', amount: 200, unit: 'g', category: 'Pantry' },
      { item: 'Garlic', amount: 4, unit: 'cloves', category: 'Produce' },
      { item: 'Butter', amount: 2, unit: 'tbsp', category: 'Dairy' },
      { item: 'Parmesan Cheese', amount: 30, unit: 'g', category: 'Dairy' }
    ],
    steps: [
      { stepNumber: 1, title: 'Boil pasta', instruction: 'Boil salted water and cook pasta.', timerSeconds: 480 }
    ]
  },
  {
    id: '2',
    title: 'Spicy Chicken Salad',
    subtitle: 'High protein fresh salad',
    description: 'Grilled chicken breast with fresh greens and chili flakes.',
    cuisine: 'American',
    mealType: 'Lunch',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    difficulty: 'Medium',
    baseServings: 2,
    rating: 4.6,
    reviewCount: 85,
    image: '',
    dietaryTags: ['High-Protein', 'Gluten-Free', 'Keto'],
    moodTags: ['Light & Fresh', 'High Protein'],
    nutrition: { calories: 350, protein: 42, carbs: 10, fat: 12 },
    ingredients: [
      { item: 'Chicken Breast', amount: 300, unit: 'g', category: 'Meat' },
      { item: 'Spinach', amount: 100, unit: 'g', category: 'Produce' },
      { item: 'Olive Oil', amount: 1, unit: 'tbsp', category: 'Pantry' },
      { item: 'Chili Flakes', amount: 1, unit: 'tsp', category: 'Spices' }
    ],
    steps: [
      { stepNumber: 1, title: 'Grill chicken', instruction: 'Season and grill chicken breast.', timerSeconds: 720 }
    ]
  }
];

describe('ChefMate Recipe Recommender & Pantry Engine', () => {
  it('identifies common pantry staples list', () => {
    expect(COMMON_PANTRY_STAPLES).toContain('Garlic');
    expect(COMMON_PANTRY_STAPLES).toContain('Olive Oil');
    expect(COMMON_PANTRY_STAPLES.length).toBeGreaterThan(10);
  });

  it('calculates 0% pantry match when pantry is empty', () => {
    const result = calculatePantryMatch(mockRecipes[0], []);
    expect(result.matchScore).toBe(0);
    expect(result.matchingIngredients.length).toBe(0);
    expect(result.missingIngredients.length).toBe(4);
  });

  it('correctly matches ingredients with flexible name resolution', () => {
    const userPantry = ['Garlic', 'Butter'];
    const result = calculatePantryMatch(mockRecipes[0], userPantry);

    expect(result.matchScore).toBe(50);
    expect(result.matchingIngredients).toContain('Garlic');
    expect(result.matchingIngredients).toContain('Butter');
  });

  it('filters recipes by dietary tag (Vegetarian)', () => {
    const filterState: FilterState = {
      searchQuery: '',
      selectedMealType: 'All',
      selectedCuisine: 'All',
      selectedMood: 'All',
      difficulty: 'All',
      maxCookTime: 0,
      selectedDietary: ['Vegetarian'],
      sortBy: 'recommended'
    };

    const results = filterAndSortRecipes(mockRecipes, filterState);
    expect(results.length).toBe(1);
    expect(results[0].recipe.title).toBe('Garlic Butter Spaghetti');
  });

  it('filters recipes by maximum total cooking time', () => {
    const filterState: FilterState = {
      searchQuery: '',
      selectedMealType: 'All',
      selectedCuisine: 'All',
      selectedMood: 'All',
      difficulty: 'All',
      maxCookTime: 20,
      selectedDietary: [],
      sortBy: 'quickest'
    };

    const results = filterAndSortRecipes(mockRecipes, filterState);
    expect(results.length).toBe(1);
    expect(results[0].recipe.title).toBe('Garlic Butter Spaghetti');
  });

  it('sorts recipes by quickest preparation time when requested', () => {
    const filterState: FilterState = {
      searchQuery: '',
      selectedMealType: 'All',
      selectedCuisine: 'All',
      selectedMood: 'All',
      difficulty: 'All',
      maxCookTime: 0,
      selectedDietary: [],
      sortBy: 'quickest'
    };

    const results = filterAndSortRecipes(mockRecipes, filterState);
    expect(results[0].recipe.title).toBe('Garlic Butter Spaghetti');
    expect(results[1].recipe.title).toBe('Spicy Chicken Salad');
  });
});
