import React from 'react';
import { 
  UtensilsCrossed, 
  Refrigerator, 
  ShoppingCart, 
  Heart, 
  Sparkles, 
  PlusCircle, 
  Search, 
  X 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'recipes' | 'pantry' | 'favorites';
  setActiveTab: (tab: 'recipes' | 'pantry' | 'favorites') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  groceryCount: number;
  favoritesCount: number;
  pantryCount: number;
  onOpenGrocery: () => void;
  onOpenAddRecipe: () => void;
  onSurpriseMe: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  groceryCount,
  favoritesCount,
  pantryCount,
  onOpenGrocery,
  onOpenAddRecipe,
  onSurpriseMe,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('recipes')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-orange-400 flex items-center justify-center text-white shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif font-bold text-2xl tracking-tight text-stone-900 flex items-center gap-1.5">
                ChefMate <span className="text-xs uppercase tracking-widest font-sans font-extrabold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">Pro</span>
              </span>
              <p className="text-xs text-stone-500 font-medium hidden sm:block">Smart Recipes & Step-by-Step Cooking</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search recipes, ingredients, cuisines (e.g. salmon, garlic, pasta)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-stone-900 text-sm rounded-xl border border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Tabs & Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Pantry / Fridge Matcher Tab */}
            <button
              onClick={() => setActiveTab(activeTab === 'pantry' ? 'recipes' : 'pantry')}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'pantry'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Refrigerator className="w-4 h-4" />
              <span className="hidden sm:inline">My Fridge</span>
              {pantryCount > 0 && (
                <span className={`ml-1 text-xs font-bold px-1.5 py-0.2 rounded-full ${
                  activeTab === 'pantry' ? 'bg-white text-amber-600' : 'bg-amber-100 text-amber-800'
                }`}>
                  {pantryCount}
                </span>
              )}
            </button>

            {/* Favorites Tab */}
            <button
              onClick={() => setActiveTab(activeTab === 'favorites' ? 'recipes' : 'favorites')}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'favorites'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
              title="Saved Favorites"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 && activeTab !== 'favorites' ? 'text-rose-500 fill-rose-500' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
              {favoritesCount > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.2 rounded-full ${
                  activeTab === 'favorites' ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Grocery List Modal Trigger */}
            <button
              onClick={onOpenGrocery}
              className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              title="Grocery Shopping List"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Grocery</span>
              {groceryCount > 0 && (
                <span className="text-xs font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                  {groceryCount}
                </span>
              )}
            </button>

            {/* Chef's Surprise Randomizer */}
            <button
              onClick={onSurpriseMe}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-sm hover:shadow transition-all"
              title="Surprise me with a recipe!"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="hidden lg:inline">Surprise Me</span>
            </button>

            {/* Add Custom Recipe */}
            <button
              onClick={onOpenAddRecipe}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-white shadow-sm transition-all"
              title="Create Custom Recipe"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span className="hidden xl:inline">New Recipe</span>
            </button>

          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-stone-100 text-stone-900 text-sm rounded-xl border-none focus:ring-2 focus:ring-amber-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
