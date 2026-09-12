import React from 'react';
import { MatchResult } from '../types/recipe';
import { Clock, Flame, Star, ChefHat, Heart, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface RecipeCardProps {
  matchResult: MatchResult;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onSelectRecipe: (recipeId: string) => void;
  onStartCooking: (recipeId: string) => void;
  hasPantryActive: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  matchResult,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe,
  onStartCooking,
  hasPantryActive,
}) => {
  const { recipe, matchScore, missingIngredients, matchingIngredients } = matchResult;
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div 
      onClick={() => onSelectRecipe(recipe.id)}
      className="group bg-white rounded-3xl border border-stone-200/80 hover:border-amber-400/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-600 hover:text-rose-500 hover:bg-white shadow-md transition-all active:scale-90"
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'text-rose-500 fill-rose-500' : ''
            }`}
          />
        </button>

        {/* Pantry Match Pill */}
        {hasPantryActive && (
          <div className="absolute top-3.5 left-3.5">
            {matchScore === 100 ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" /> 100% Match!
              </span>
            ) : matchScore >= 60 ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" /> {matchScore}% Pantry Match
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-900/80 backdrop-blur-sm text-stone-200">
                {matchScore}% Match
              </span>
            )}
          </div>
        )}

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <span className="px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-sm">
            {recipe.cuisine} • {recipe.mealType}
          </span>
          <div className="flex items-center gap-1 bg-amber-500/90 text-white px-2 py-0.5 rounded-lg shadow-sm font-bold">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span>{recipe.rating.toFixed(1)}</span>
            <span className="text-[10px] opacity-80">({recipe.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {recipe.dietaryTags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug group-hover:text-amber-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {recipe.subtitle}
          </p>
        </div>

        {/* Pantry Matching Details */}
        {hasPantryActive && (
          <div className="bg-stone-50 rounded-xl p-2.5 text-xs space-y-1 border border-stone-100">
            {matchingIngredients.length > 0 && (
              <p className="text-emerald-700 font-medium flex items-center gap-1 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span>You have: {matchingIngredients.slice(0, 3).join(', ')}{matchingIngredients.length > 3 ? ` +${matchingIngredients.length - 3} more` : ''}</span>
              </p>
            )}
            {missingIngredients.length > 0 && (
              <p className="text-stone-500 flex items-center gap-1 truncate">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                <span>Need: {missingIngredients.slice(0, 2).map(m => m.item).join(', ')}{missingIngredients.length > 2 ? ` +${missingIngredients.length - 2} more` : ''}</span>
              </p>
            )}
          </div>
        )}

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1 font-semibold">
            <Clock className="w-4 h-4 text-stone-400" />
            <span>{totalTime} mins</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>{recipe.nutrition.calories} kcal</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <ChefHat className="w-4 h-4 text-stone-400" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectRecipe(recipe.id);
            }}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
          >
            View Recipe
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStartCooking(recipe.id);
            }}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-500/20 transition-all flex items-center justify-center gap-1"
          >
            <span>Cook Step-by-Step</span>
          </button>
        </div>

      </div>
    </div>
  );
};
