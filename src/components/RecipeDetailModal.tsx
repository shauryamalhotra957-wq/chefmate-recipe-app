import React, { useState } from 'react';
import { Recipe, Ingredient } from '../types/recipe';
import { 
  X, 
  Clock, 
  Flame, 
  ChefHat, 
  Users, 
  Scale, 
  Check, 
  ShoppingCart, 
  Play, 
  Heart, 
  Star, 
  Lightbulb, 
  Sparkles 
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
  onStartCooking: (recipeId: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onAddToGrocery: (items: { name: string; amount: number; unit: string; recipeSource: string }[]) => void;
  pantryItems: string[];
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onStartCooking,
  isFavorite,
  onToggleFavorite,
  onAddToGrocery,
  pantryItems,
}) => {
  const [servings, setServings] = useState<number>(recipe.baseServings);
  const [useMetric, setUseMetric] = useState<boolean>(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    recipe.ingredients.forEach(ing => {
      const inPantry = pantryItems.some(p => 
        ing.item.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(ing.item.toLowerCase())
      );
      if (inPantry) {
        initial[ing.item] = true;
      }
    });
    return initial;
  });
  const [addedGroceryFeedback, setAddedGroceryFeedback] = useState(false);

  const scale = servings / recipe.baseServings;

  const toggleCheck = (item: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const formatAmount = (amount: number): string => {
    const val = amount * scale;
    if (val === 0) return '';
    // Format to clean fraction or decimal
    if (Math.abs(val - 0.25) < 0.05) return '1/4';
    if (Math.abs(val - 0.33) < 0.05) return '1/3';
    if (Math.abs(val - 0.5) < 0.05) return '1/2';
    if (Math.abs(val - 0.75) < 0.05) return '3/4';
    if (Math.abs(val - 1.5) < 0.05) return '1 1/2';
    if (Math.abs(val - 2.5) < 0.05) return '2 1/2';
    return Number(val.toFixed(1)).toString();
  };

  const getIngredientDisplay = (ing: Ingredient) => {
    if (useMetric && ing.metricAmount && ing.metricUnit) {
      const metricVal = Math.round(ing.metricAmount * scale);
      return `${metricVal} ${ing.metricUnit}`;
    }
    const scaledStr = formatAmount(ing.amount);
    return `${scaledStr} ${ing.unit}`.trim();
  };

  const handleAddMissingToGrocery = () => {
    const missing = recipe.ingredients
      .filter(ing => !checkedIngredients[ing.item])
      .map(ing => ({
        name: ing.item,
        amount: Number((ing.amount * scale).toFixed(1)),
        unit: ing.unit,
        recipeSource: recipe.title
      }));

    if (missing.length > 0) {
      onAddToGrocery(missing);
      setAddedGroceryFeedback(true);
      setTimeout(() => setAddedGroceryFeedback(false), 3000);
    }
  };

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Floating Top Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(recipe.id)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-rose-500 hover:bg-white shadow-lg transition-all"
            title="Save to favorites"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-white shadow-lg transition-all"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* Hero Banner */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-stone-900">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-white uppercase tracking-wider">
                  {recipe.cuisine}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
                  {recipe.mealType}
                </span>
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>{recipe.rating}</span>
                  <span className="text-white/70">({recipe.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl leading-tight">
                {recipe.title}
              </h1>
              <p className="text-stone-300 text-xs sm:text-sm line-clamp-2 max-w-2xl font-light">
                {recipe.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 bg-stone-50 border-b border-stone-200 text-center">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-200/60">
              <Clock className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <div className="text-xs text-stone-500 font-medium">Total Time</div>
              <div className="text-sm font-bold text-stone-900">{totalTime} mins</div>
              <div className="text-[10px] text-stone-400">Prep: {recipe.prepTimeMinutes}m | Cook: {recipe.cookTimeMinutes}m</div>
            </div>

            <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-200/60">
              <Flame className="w-5 h-5 mx-auto text-orange-500 mb-1" />
              <div className="text-xs text-stone-500 font-medium">Calories</div>
              <div className="text-sm font-bold text-stone-900">{recipe.nutrition.calories} kcal</div>
              <div className="text-[10px] text-stone-400">per serving</div>
            </div>

            <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-200/60">
              <ChefHat className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
              <div className="text-xs text-stone-500 font-medium">Difficulty</div>
              <div className="text-sm font-bold text-stone-900">{recipe.difficulty}</div>
              <div className="text-[10px] text-stone-400">{recipe.steps.length} clear steps</div>
            </div>

            <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-200/60">
              <Users className="w-5 h-5 mx-auto text-indigo-500 mb-1" />
              <div className="text-xs text-stone-500 font-medium">Base Portions</div>
              <div className="text-sm font-bold text-stone-900">{recipe.baseServings} servings</div>
              <div className="text-[10px] text-stone-400">scalable below</div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Description */}
            <p className="text-sm text-stone-700 leading-relaxed">
              {recipe.description}
            </p>

            {/* Servings Scaler & Units Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-200/80">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-bold text-stone-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-600" /> Servings:
                </span>
                <div className="flex items-center bg-white rounded-xl shadow-sm border border-amber-300 overflow-hidden">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100 active:scale-95 transition-all"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-extrabold text-sm text-stone-900">{servings}</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100 active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
                {scale !== 1 && (
                  <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {scale}x Scaled
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-stone-500" />
                <div className="flex bg-stone-200/80 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setUseMetric(false)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      !useMetric ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
                    }`}
                  >
                    US Customary
                  </button>
                  <button
                    onClick={() => setUseMetric(true)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      useMetric ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
                    }`}
                  >
                    Metric (g/ml)
                  </button>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                  <span>Ingredients</span>
                  <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    {recipe.ingredients.length} items
                  </span>
                </h3>

                <button
                  onClick={handleAddMissingToGrocery}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-all"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{addedGroceryFeedback ? '✓ Added to Grocery List!' : 'Add Missing to Grocery'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {recipe.ingredients.map(ing => {
                  const isChecked = checkedIngredients[ing.item] || false;
                  return (
                    <div
                      key={ing.item}
                      onClick={() => toggleCheck(ing.item)}
                      className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-300 text-stone-500'
                          : 'bg-stone-50 border-stone-200/70 hover:bg-stone-100/70 text-stone-800'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'border-stone-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className={`text-sm font-semibold truncate ${isChecked ? 'line-through opacity-70' : ''}`}>
                            {ing.item}
                          </span>
                          <span className="text-xs font-bold text-amber-700 shrink-0">
                            {getIngredientDisplay(ing)}
                          </span>
                        </div>
                        {ing.notes && (
                          <p className="text-[11px] text-stone-400 italic truncate">{ing.notes}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nutrition Breakdown */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Nutritional Profile (Per Serving)
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                  <div className="text-xs text-stone-500 font-medium">Protein</div>
                  <div className="text-sm font-extrabold text-stone-900">{Math.round(recipe.nutrition.protein * scale)}g</div>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                  <div className="text-xs text-stone-500 font-medium">Carbs</div>
                  <div className="text-sm font-extrabold text-stone-900">{Math.round(recipe.nutrition.carbs * scale)}g</div>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                  <div className="text-xs text-stone-500 font-medium">Fats</div>
                  <div className="text-sm font-extrabold text-stone-900">{Math.round(recipe.nutrition.fat * scale)}g</div>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                  <div className="text-xs text-stone-500 font-medium">Fiber</div>
                  <div className="text-sm font-extrabold text-stone-900">{recipe.nutrition.fiber ? Math.round(recipe.nutrition.fiber * scale) : 2}g</div>
                </div>
              </div>
            </div>

            {/* Steps Preview */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Cooking Steps ({recipe.steps.length})
              </h3>
              <div className="space-y-3">
                {recipe.steps.map(step => (
                  <div key={step.stepNumber} className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wide">
                        Step {step.stepNumber}: {step.title}
                      </span>
                      {step.timerSeconds && (
                        <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                          <Clock className="w-3 h-3 text-amber-500" />
                          {Math.round(step.timerSeconds / 60)} min
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {step.instruction}
                    </p>
                    {step.tip && (
                      <div className="flex items-start gap-1.5 text-xs text-amber-800 bg-amber-50/80 p-2 rounded-xl mt-2">
                        <Lightbulb className="w-4 h-4 shrink-0 text-amber-600" />
                        <span><strong>Chef Tip:</strong> {step.tip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 shadow-lg flex items-center justify-between gap-4">
          <div className="text-xs text-stone-500 hidden sm:block">
            Hands-free voice read aloud & built-in timers included!
          </div>

          <button
            onClick={() => onStartCooking(recipe.id)}
            className="w-full sm:w-auto ml-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Start Step-by-Step Cooking</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
