import { useState, useEffect, useMemo } from 'react';
import { Recipe, FilterState, GroceryItem } from './types/recipe';
import { INITIAL_RECIPES } from './data/recipes';
import { filterAndSortRecipes } from './utils/recommender';
import { Navbar } from './components/Navbar';
import { FiltersBar } from './components/FiltersBar';
import { RecipeCard } from './components/RecipeCard';
import { PantryMatcher } from './components/PantryMatcher';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { StepByStepCookingMode } from './components/StepByStepCookingMode';
import { GroceryListModal } from './components/GroceryListModal';
import { AddRecipeModal } from './components/AddRecipeModal';
import { 
  Sparkles, 
  ChefHat, 
  Flame, 
  Heart, 
  Refrigerator, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

const STORAGE_KEYS = {
  RECIPES: 'chefmate_custom_recipes',
  FAVORITES: 'chefmate_favorite_ids',
  PANTRY: 'chefmate_pantry_items',
  GROCERY: 'chefmate_grocery_items',
};

export function App() {
  // 1. Recipes state
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECIPES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...INITIAL_RECIPES, ...parsed];
      }
    } catch {
      // fallback
    }
    return INITIAL_RECIPES;
  });

  // 2. Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'recipes' | 'pantry' | 'favorites'>('recipes');

  // 3. Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedMealType: 'All',
    selectedCuisine: 'All',
    selectedDietary: [],
    selectedMood: 'All',
    maxCookTime: 0,
    difficulty: 'All',
    sortBy: 'recommended',
  });

  // 4. Pantry ingredients
  const [pantryItems, setPantryItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PANTRY);
      return saved ? JSON.parse(saved) : ['Garlic', 'Olive Oil', 'Eggs'];
    } catch {
      return ['Garlic', 'Olive Oil', 'Eggs'];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PANTRY, JSON.stringify(pantryItems));
  }, [pantryItems]);

  // 5. Favorites
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['tuscan-garlic-chicken'];
    } catch {
      return ['tuscan-garlic-chicken'];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (recipeId: string) => {
    setFavoriteIds(prev =>
      prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
    );
  };

  // 6. Grocery List
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GROCERY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GROCERY, JSON.stringify(groceryItems));
  }, [groceryItems]);

  const handleAddToGrocery = (items: { name: string; amount: number; unit: string; recipeSource: string }[]) => {
    setGroceryItems(prev => [
      ...prev,
      ...items.map(i => ({
        id: `grocery-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: i.name,
        amount: i.amount,
        unit: i.unit,
        checked: false,
        recipeSource: i.recipeSource
      }))
    ]);
  };

  const handleToggleGroceryItem = (id: string) => {
    setGroceryItems(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleRemoveGroceryItem = (id: string) => {
    setGroceryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddCustomGroceryItem = (name: string, amount: number, unit: string) => {
    setGroceryItems(prev => [
      ...prev,
      {
        id: `grocery-custom-${Date.now()}`,
        name,
        amount,
        unit,
        checked: false
      }
    ]);
  };

  const handleClearCompletedGrocery = () => {
    setGroceryItems(prev => prev.filter(item => !item.checked));
  };

  const handleClearAllGrocery = () => {
    setGroceryItems([]);
  };

  // 7. Modals
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [cookingRecipeId, setCookingRecipeId] = useState<string | null>(null);
  const [isGroceryOpen, setIsGroceryOpen] = useState<boolean>(false);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState<boolean>(false);

  // 8. Add recipe handler
  const handleAddRecipe = (newRecipe: Recipe) => {
    setRecipes(prev => [newRecipe, ...prev]);
    try {
      const customOnly = recipes.filter(r => r.isCustom);
      localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify([newRecipe, ...customOnly]));
    } catch {
      // storage error fallback
    }
  };

  // 9. Surprise Me handler (random recipe selector)
  const handleSurpriseMe = () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    if (randomRecipe) {
      setSelectedRecipeId(randomRecipe.id);
    }
  };

  // 10. Filter & Match calculations
  const displayRecipes = useMemo(() => {
    if (activeTab === 'favorites') {
      return recipes.filter(r => favoriteIds.includes(r.id));
    }
    return recipes;
  }, [recipes, activeTab, favoriteIds]);

  const matchResults = useMemo(() => {
    return filterAndSortRecipes(displayRecipes, filters, pantryItems);
  }, [displayRecipes, filters, pantryItems]);

  const selectedRecipe = useMemo(() => {
    return recipes.find(r => r.id === selectedRecipeId) || null;
  }, [recipes, selectedRecipeId]);

  const cookingRecipe = useMemo(() => {
    return recipes.find(r => r.id === cookingRecipeId) || null;
  }, [recipes, cookingRecipeId]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans text-stone-900 selection:bg-amber-500 selection:text-white">
      
      {/* Interactive Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={filters.searchQuery}
        setSearchQuery={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
        groceryCount={groceryItems.filter(i => !i.checked).length}
        favoritesCount={favoriteIds.length}
        pantryCount={pantryItems.length}
        onOpenGrocery={() => setIsGroceryOpen(true)}
        onOpenAddRecipe={() => setIsAddRecipeOpen(true)}
        onSurpriseMe={handleSurpriseMe}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        
        {/* Hero Banner (Shown when on standard explore) */}
        {activeTab === 'recipes' && !filters.searchQuery && (
          <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-6 sm:p-10 mb-8 shadow-xl border border-stone-800">
            <div className="absolute -right-16 -top-16 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Culinary Assistant</span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-5xl leading-tight">
                Cook effortlessly with what you already have.
              </h1>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                Discover dishes tailored to your pantry staples, dietary preferences, and current craving. Follow along with hands-free voice read-aloud and smart kitchen timers.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('pantry')}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition-all flex items-center gap-2"
                >
                  <Refrigerator className="w-4 h-4" />
                  <span>Match My Fridge Ingredients</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSurpriseMe}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Random Chef's Pick</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pantry Matcher View / Drawer */}
        {(activeTab === 'pantry' || pantryItems.length > 0) && (
          <PantryMatcher
            pantryItems={pantryItems}
            setPantryItems={setPantryItems}
            onClose={activeTab === 'pantry' ? () => setActiveTab('recipes') : undefined}
          />
        )}

        {/* Favorites Header View */}
        {activeTab === 'favorites' && (
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl text-stone-900">Your Saved Recipes</h2>
                <p className="text-xs text-stone-500">{favoriteIds.length} bookmarked dishes ready to cook</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('recipes')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-2 rounded-xl transition-colors"
            >
              Browse All Recipes
            </button>
          </div>
        )}

        {/* Filters and Controls */}
        <FiltersBar
          filters={filters}
          setFilters={setFilters}
          totalResults={matchResults.length}
        />

        {/* Recipe Cards Grid */}
        {matchResults.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <ChefHat className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900">No Recipes Matched</h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              No recipes met your selected combination of cuisine, dietary preferences, and ingredients. Try loosening your filters or adding ingredients in "My Fridge".
            </p>
            <button
              onClick={() => {
                setFilters({
                  searchQuery: '',
                  selectedMealType: 'All',
                  selectedCuisine: 'All',
                  selectedDietary: [],
                  selectedMood: 'All',
                  maxCookTime: 0,
                  difficulty: 'All',
                  sortBy: 'recommended'
                });
                setActiveTab('recipes');
              }}
              className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {matchResults.map(result => (
              <RecipeCard
                key={result.recipe.id}
                matchResult={result}
                isFavorite={favoriteIds.includes(result.recipe.id)}
                onToggleFavorite={toggleFavorite}
                onSelectRecipe={(id) => setSelectedRecipeId(id)}
                onStartCooking={(id) => setCookingRecipeId(id)}
                hasPantryActive={pantryItems.length > 0}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-stone-200 bg-white py-8 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900 text-sm">ChefMate</span>
            <span>•</span>
            <span>Your Personal Culinary & Cooking Assistant</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-500" /> Scalable Servings</span>
            <span>•</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-emerald-500" /> Interactive Timers & Voice</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipeId(null)}
          onStartCooking={(id) => {
            setSelectedRecipeId(null);
            setCookingRecipeId(id);
          }}
          isFavorite={favoriteIds.includes(selectedRecipe.id)}
          onToggleFavorite={toggleFavorite}
          onAddToGrocery={handleAddToGrocery}
          pantryItems={pantryItems}
        />
      )}

      {cookingRecipe && (
        <StepByStepCookingMode
          recipe={cookingRecipe}
          onExit={() => setCookingRecipeId(null)}
        />
      )}

      {isGroceryOpen && (
        <GroceryListModal
          items={groceryItems}
          onToggleItem={handleToggleGroceryItem}
          onRemoveItem={handleRemoveGroceryItem}
          onAddItem={handleAddCustomGroceryItem}
          onClearCompleted={handleClearCompletedGrocery}
          onClearAll={handleClearAllGrocery}
          onClose={() => setIsGroceryOpen(false)}
        />
      )}

      {isAddRecipeOpen && (
        <AddRecipeModal
          onAddRecipe={handleAddRecipe}
          onClose={() => setIsAddRecipeOpen(false)}
        />
      )}

    </div>
  );
}

export default App;
