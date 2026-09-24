import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { DietaryRestrictionValidator } from '../src/utils/dietary_validator.js';

describe('DietaryRestrictionValidator Test Suite', () => {
  test('flags gluten conflict and recommends tamari substitution', () => {
    const ingredients = ['2 tbsp soy sauce', '1 cup rice', 'fresh ginger'];
    const res = DietaryRestrictionValidator.validateRecipeIngredients(ingredients, ['gluten']);
    assert.strictEqual(res.isSafe, false);
    assert.strictEqual(res.conflicts.length, 1);
    assert.strictEqual(res.conflicts[0].matchedKeyword, 'soy sauce');
    assert.strictEqual(res.substitutions[0].with, 'tamari (gluten-free)');
  });

  test('confirms recipe safe when no allergens present', () => {
    const ingredients = ['olive oil', 'tomatoes', 'basil', 'sea salt'];
    const res = DietaryRestrictionValidator.validateRecipeIngredients(ingredients, ['nuts', 'dairy']);
    assert.strictEqual(res.isSafe, true);
    assert.strictEqual(res.conflicts.length, 0);
  });
});
