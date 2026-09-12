import React from 'react';
import { FilterState, MealType, Cuisine, DietaryTag, MoodTag } from '../types/recipe';
import { RotateCcw, SlidersHorizontal, Flame, Clock, ChefHat } from 'lucide-react';

interface FiltersBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
}

const MOODS: { label: string; value: MoodTag | 'All'; emoji: string }[] = [
  { label: 'All Cravings', value: 'All', emoji: '✨' },
  { label: 'Quick & Easy', value: 'Quick & Easy', emoji: '⚡' },
  { label: 'Comfort Food', value: 'Comfort Food', emoji: '🍲' },
  { label: 'High Protein', value: 'High Protein', emoji: '💪' },
  { label: 'Light & Fresh', value: 'Light & Fresh', emoji: '🥗' },
  { label: 'Date Night', value: 'Date Night', emoji: '🍷' },
  { label: 'One-Pot Wonder', value: 'One-Pot Wonder', emoji: '🥘' },
  { label: 'Sweet Tooth', value: 'Sweet Tooth', emoji: '🍰' },
];

const MEALS: (MealType | 'All')[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];

const CUISINES: (Cuisine | 'All')[] = [
  'All',
  'Italian',
  'Asian',
  'Mexican',
  'Indian',
  'Mediterranean',
  'American',
  'Middle Eastern',
  'French'
];

const DIETARY_OPTIONS: DietaryTag[] = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Keto',
  'High-Protein',
  'Quick (<30m)'
];

export const FiltersBar: React.FC<FiltersBarProps> = ({ filters, setFilters, totalResults }) => {
  const toggleDietary = (tag: DietaryTag) => {
    setFilters(prev => {
      const exists = prev.selectedDietary.includes(tag);
      return {
        ...prev,
        selectedDietary: exists
          ? prev.selectedDietary.filter(t => t !== tag)
          : [...prev.selectedDietary, tag]
      };
    });
  };

  const handleReset = () => {
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
  };

  const hasActiveFilters = 
    filters.selectedMealType !== 'All' ||
    filters.selectedCuisine !== 'All' ||
    filters.selectedDietary.length > 0 ||
    filters.selectedMood !== 'All' ||
    filters.maxCookTime > 0 ||
    filters.difficulty !== 'All';

  return (
    <div className="space-y-4 mb-8">
      {/* Mood / Craving Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {MOODS.map(mood => (
          <button
            key={mood.value}
            onClick={() => setFilters(prev => ({ ...prev, selectedMood: mood.value }))}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all duration-150 ${
              filters.selectedMood === mood.value
                ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30 ring-2 ring-amber-500/50'
                : 'bg-white text-stone-700 border border-stone-200/80 hover:bg-stone-100/80 hover:border-stone-300'
            }`}
          >
            <span>{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        ))}
      </div>

      {/* Main Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
          
          {/* Meal Type Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1 hidden sm:inline">Meal:</span>
            {MEALS.map(meal => (
              <button
                key={meal}
                onClick={() => setFilters(prev => ({ ...prev, selectedMealType: meal }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filters.selectedMealType === meal
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
                }`}
              >
                {meal}
              </button>
            ))}
          </div>

          {/* Results count & Sort */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs font-semibold text-stone-500">
              <span className="text-stone-900 font-bold">{totalResults}</span> recipes found
            </span>

            <div className="flex items-center gap-1.5">
              <label htmlFor="sort-by" className="text-xs font-bold text-stone-400 hidden sm:inline">Sort:</label>
              <select
                id="sort-by"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                className="text-xs font-semibold bg-stone-100 text-stone-800 py-1.5 px-2.5 rounded-xl border-none outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                <option value="recommended">Recommended (Best Match)</option>
                <option value="quickest">⚡ Quickest Total Time</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="calories">🥗 Lowest Calories</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-xl transition-all"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filter Controls: Cuisine, Dietary, Cook Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          
          {/* Cuisine selector */}
          <div className="flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200/60">
            <ChefHat className="w-4 h-4 text-stone-500 shrink-0" />
            <span className="text-xs font-bold text-stone-500">Cuisine:</span>
            <select
              value={filters.selectedCuisine}
              onChange={(e) => setFilters(prev => ({ ...prev, selectedCuisine: e.target.value as Cuisine | 'All' }))}
              className="w-full text-xs font-semibold bg-transparent text-stone-800 outline-none cursor-pointer"
            >
              {CUISINES.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Cuisines' : c}</option>
              ))}
            </select>
          </div>

          {/* Max Time Filter */}
          <div className="flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200/60">
            <Clock className="w-4 h-4 text-stone-500 shrink-0" />
            <span className="text-xs font-bold text-stone-500">Max Time:</span>
            <select
              value={filters.maxCookTime}
              onChange={(e) => setFilters(prev => ({ ...prev, maxCookTime: Number(e.target.value) }))}
              className="w-full text-xs font-semibold bg-transparent text-stone-800 outline-none cursor-pointer"
            >
              <option value="0">Any Cook Time</option>
              <option value="15">⚡ Under 15 minutes</option>
              <option value="30">⏱️ Under 30 minutes</option>
              <option value="45">🥘 Under 45 minutes</option>
              <option value="60">🍲 Under 60 minutes</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200/60">
            <SlidersHorizontal className="w-4 h-4 text-stone-500 shrink-0" />
            <span className="text-xs font-bold text-stone-500">Difficulty:</span>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value as FilterState['difficulty'] }))}
              className="w-full text-xs font-semibold bg-transparent text-stone-800 outline-none cursor-pointer"
            >
              <option value="All">Any Difficulty</option>
              <option value="Easy">Easy (Beginner friendly)</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard (Chef level)</option>
            </select>
          </div>

        </div>

        {/* Dietary Preferences Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-stone-400 mr-1.5 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Dietary:
          </span>
          {DIETARY_OPTIONS.map(tag => {
            const isSelected = filters.selectedDietary.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleDietary(tag)}
                className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}{tag}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
