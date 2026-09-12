import React, { useState } from 'react';
import { COMMON_PANTRY_STAPLES } from '../utils/recommender';
import { Refrigerator, Plus, X, Sparkles, Check, Trash2 } from 'lucide-react';

interface PantryMatcherProps {
  pantryItems: string[];
  setPantryItems: React.Dispatch<React.SetStateAction<string[]>>;
  onClose?: () => void;
}

export const PantryMatcher: React.FC<PantryMatcherProps> = ({
  pantryItems,
  setPantryItems,
  onClose,
}) => {
  const [customInput, setCustomInput] = useState('');

  const addIngredient = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!pantryItems.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      setPantryItems(prev => [...prev, trimmed]);
    }
    setCustomInput('');
  };

  const removeIngredient = (name: string) => {
    setPantryItems(prev => prev.filter(i => i.toLowerCase() !== name.toLowerCase()));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient(customInput);
    }
  };

  const clearAll = () => {
    setPantryItems([]);
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-emerald-500/10 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md mb-8 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
        <Refrigerator className="w-64 h-64 text-amber-900" />
      </div>

      <div className="relative z-10">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Refrigerator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
                What's In Your Fridge? <Sparkles className="w-5 h-5 text-amber-500" />
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Select or type the ingredients you have. We'll automatically calculate recipe match percentages!
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Input for custom ingredient */}
        <div className="flex gap-2 max-w-xl mb-5">
          <div className="relative flex-1">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type an ingredient (e.g. mushrooms, milk, bell pepper)..."
              className="w-full px-4 py-3 bg-white text-stone-900 text-sm rounded-2xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none shadow-sm transition-all placeholder:text-stone-400"
            />
          </div>
          <button
            onClick={() => addIngredient(customInput)}
            disabled={!customInput.trim()}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-amber-500/25 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {/* Active Pantry Ingredients Chips */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Your Kitchen Staples ({pantryItems.length}):
            </span>
            {pantryItems.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
          </div>

          {pantryItems.length === 0 ? (
            <p className="text-xs text-stone-500 italic bg-white/60 p-3 rounded-xl border border-stone-200/50">
              No ingredients selected yet. Tap the common staples below or type above to start matching recipes!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {pantryItems.map(item => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-amber-900 font-semibold text-xs rounded-xl border border-amber-300 shadow-sm animate-in fade-in"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item}</span>
                  <button
                    onClick={() => removeIngredient(item)}
                    className="text-stone-400 hover:text-rose-600 p-0.5 rounded-full hover:bg-rose-50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Common Quick-Add Suggestions */}
        <div className="mt-5 pt-4 border-t border-amber-200/60">
          <span className="text-xs font-bold text-stone-500 mb-2 block">Quick-add popular ingredients:</span>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_PANTRY_STAPLES.map(staple => {
              const inPantry = pantryItems.some(p => p.toLowerCase() === staple.toLowerCase());
              return (
                <button
                  key={staple}
                  onClick={() => inPantry ? removeIngredient(staple) : addIngredient(staple)}
                  className={`text-xs px-2.5 py-1.5 rounded-xl font-medium transition-all ${
                    inPantry
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white/80 text-stone-700 hover:bg-white border border-stone-200/80 hover:border-amber-300'
                  }`}
                >
                  {inPantry ? '✓ ' : '+ '}{staple}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
