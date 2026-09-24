/**
 * Recipe Dietary Restriction & Allergen Cross-Contamination Validator.
 * Audits ingredient lists against user allergen profiles and recommends substitutions.
 */
export class DietaryRestrictionValidator {
  static ALLERGEN_TAXONOMY = {
    gluten: ['wheat', 'barley', 'rye', 'flour', 'soy sauce'],
    dairy: ['milk', 'butter', 'cheese', 'cream', 'yogurt'],
    nuts: ['peanut', 'almond', 'walnut', 'cashew', 'pecan'],
    shellfish: ['shrimp', 'crab', 'lobster', 'prawn', 'clam'],
  };

  static ALLERGEN_SUBSTITUTES = {
    'soy sauce': 'tamari (gluten-free)',
    'milk': 'oat milk or almond milk',
    'butter': 'olive oil or vegan butter',
    'flour': 'almond flour or 1:1 gluten-free baking flour',
  };

  static validateRecipeIngredients(ingredients, restrictedAllergens) {
    const conflicts = [];
    const suggestions = [];

    const lowerIngredients = ingredients.map(i => i.toLowerCase());

    for (const allergen of restrictedAllergens) {
      const keywords = DietaryRestrictionValidator.ALLERGEN_TAXONOMY[allergen.toLowerCase()] || [];
      for (const item of lowerIngredients) {
        for (const kw of keywords) {
          if (item.includes(kw)) {
            conflicts.push({ allergen, ingredient: item, matchedKeyword: kw });
            if (DietaryRestrictionValidator.ALLERGEN_SUBSTITUTES[kw]) {
              suggestions.push({
                replace: item,
                with: DietaryRestrictionValidator.ALLERGEN_SUBSTITUTES[kw],
              });
            }
          }
        }
      }
    }

    return {
      isSafe: conflicts.length === 0,
      conflicts,
      substitutions: suggestions,
    };
  }
}
