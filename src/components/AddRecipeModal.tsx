import React, { useState } from 'react';
import { Recipe, Cuisine, MealType, Difficulty, Ingredient, CookingStep } from '../types/recipe';
import { X, Plus, Trash2, ChefHat, Sparkles } from 'lucide-react';

interface AddRecipeModalProps {
  onAddRecipe: (recipe: Recipe) => void;
  onClose: () => void;
}

const DEFAULT_PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80'
];

export const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ onAddRecipe, onClose }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState<Cuisine>('Italian');
  const [mealType, setMealType] = useState<MealType>('Dinner');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [prepTime, setPrepTime] = useState('15');
  const [cookTime, setCookTime] = useState('20');
  const [servings, setServings] = useState('4');
  const [calories, setCalories] = useState('450');
  const [protein, setProtein] = useState('25');
  const [image, setImage] = useState(DEFAULT_PRESET_IMAGES[0]);

  // Dynamic ingredients
  const [ingredients, setIngredients] = useState<{ item: string; amount: string; unit: string }[]>([
    { item: 'Olive Oil', amount: '2', unit: 'tbsp' },
    { item: 'Garlic', amount: '3', unit: 'cloves' },
  ]);

  // Dynamic steps
  const [steps, setSteps] = useState<{ title: string; instruction: string; timerMinutes: string }[]>([
    { title: 'Prep the ingredients', instruction: 'Chop all vegetables and season the base ingredients.', timerMinutes: '0' },
    { title: 'Sauté and cook', instruction: 'Heat olive oil in a pan over medium heat and sauté aromatics until fragrant.', timerMinutes: '5' }
  ]);

  const addIngredientRow = () => {
    setIngredients(prev => [...prev, { item: '', amount: '1', unit: 'pcs' }]);
  };

  const removeIngredientRow = (idx: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== idx));
  };

  const updateIngredient = (idx: number, field: 'item' | 'amount' | 'unit', val: string) => {
    setIngredients(prev => prev.map((item, i) => i === idx ? { ...item, [field]: val } : item));
  };

  const addStepRow = () => {
    setSteps(prev => [...prev, { title: '', instruction: '', timerMinutes: '0' }]);
  };

  const removeStepRow = (idx: number) => {
    setSteps(prev => prev.filter((_, i) => i !== idx));
  };

  const updateStep = (idx: number, field: 'title' | 'instruction' | 'timerMinutes', val: string) => {
    setSteps(prev => prev.map((step, i) => i === idx ? { ...step, [field]: val } : step));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedIngredients: Ingredient[] = ingredients
      .filter(i => i.item.trim())
      .map(i => ({
        item: i.item.trim(),
        amount: Number(i.amount) || 1,
        unit: i.unit.trim() || 'item'
      }));

    const formattedSteps: CookingStep[] = steps
      .filter(s => s.instruction.trim())
      .map((s, idx) => ({
        stepNumber: idx + 1,
        title: s.title.trim() || `Step ${idx + 1}`,
        instruction: s.instruction.trim(),
        timerSeconds: (Number(s.timerMinutes) || 0) * 60
      }));

    const newRecipe: Recipe = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A delicious homemade recipe.',
      description: description.trim() || 'Custom recipe created by you.',
      image: image.trim() || DEFAULT_PRESET_IMAGES[0],
      cuisine,
      mealType,
      difficulty,
      prepTimeMinutes: Number(prepTime) || 10,
      cookTimeMinutes: Number(cookTime) || 15,
      baseServings: Number(servings) || 2,
      dietaryTags: ['Quick (<30m)'],
      moodTags: ['Comfort Food'],
      nutrition: {
        calories: Number(calories) || 400,
        protein: Number(protein) || 20,
        carbs: 45,
        fat: 15
      },
      ingredients: formattedIngredients,
      steps: formattedSteps,
      rating: 5.0,
      reviewCount: 1,
      author: 'You',
      isCustom: true
    };

    onAddRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl">Create Custom Recipe</h2>
              <p className="text-xs text-stone-400">Add your own family or favorite recipe with timers & steps</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 uppercase tracking-wider text-xs border-b pb-1">1. Recipe Overview</h3>
            
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Recipe Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Grandma's Secret Sunday Marinara"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Short Subtitle</label>
              <input
                type="text"
                placeholder="e.g. Rich slow-cooked sauce with crushed San Marzano tomatoes"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Full Description</label>
              <textarea
                rows={2}
                placeholder="Tell the story or detailed overview of this dish..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cuisine</label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value as Cuisine)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none"
                >
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Asian">Asian</option>
                  <option value="Indian">Indian</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="American">American</option>
                  <option value="French">French</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Meal</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as MealType)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none"
                >
                  <option value="Dinner">Dinner</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Servings</label>
                <input
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Prep Time (min)</label>
                <input
                  type="number"
                  min="1"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cook Time (min)</label>
                <input
                  type="number"
                  min="0"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Calories (kcal)</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Protein (g)</label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none"
                />
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-1">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-xs">2. Ingredients</h3>
              <button
                type="button"
                onClick={addIngredientRow}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Ingredient
              </button>
            </div>

            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ingredient name (e.g. Pasta)"
                  value={ing.item}
                  onChange={(e) => updateIngredient(idx, 'item', e.target.value)}
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={ing.amount}
                  onChange={(e) => updateIngredient(idx, 'amount', e.target.value)}
                  className="w-20 px-2 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-center"
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={ing.unit}
                  onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
                  className="w-20 px-2 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-center"
                />
                <button
                  type="button"
                  onClick={() => removeIngredientRow(idx)}
                  disabled={ingredients.length <= 1}
                  className="p-2 text-stone-400 hover:text-rose-500 disabled:opacity-20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-1">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-xs">3. Cooking Steps</h3>
              <button
                type="button"
                onClick={addStepRow}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>

            {steps.map((step, idx) => (
              <div key={idx} className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-amber-700">Step {idx + 1}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-500">Timer (mins):</span>
                    <input
                      type="number"
                      min="0"
                      value={step.timerMinutes}
                      onChange={(e) => updateStep(idx, 'timerMinutes', e.target.value)}
                      className="w-16 px-2 py-1 bg-white border border-stone-300 rounded-lg text-center text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeStepRow(idx)}
                      disabled={steps.length <= 1}
                      className="p-1 text-stone-400 hover:text-rose-500 disabled:opacity-20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Step Headline (e.g. Sauté garlic in olive oil)"
                  value={step.title}
                  onChange={(e) => updateStep(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-xl outline-none text-xs"
                />
                <textarea
                  rows={2}
                  placeholder="Step instructions..."
                  value={step.instruction}
                  onChange={(e) => updateStep(idx, 'instruction', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-xl outline-none text-xs"
                />
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Save & Add Recipe to App</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
