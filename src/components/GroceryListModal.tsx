import React, { useState } from 'react';
import { GroceryItem } from '../types/recipe';
import { X, ShoppingCart, Check, Trash2, Plus, Copy, CheckCheck } from 'lucide-react';

interface GroceryListModalProps {
  items: GroceryItem[];
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: (name: string, amount: number, unit: string) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const GroceryListModal: React.FC<GroceryListModalProps> = ({
  items,
  onToggleItem,
  onRemoveItem,
  onAddItem,
  onClearCompleted,
  onClearAll,
  onClose,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('item');
  const [copied, setCopied] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onAddItem(newItemName.trim(), Number(newItemAmount) || 1, newItemUnit.trim());
    setNewItemName('');
  };

  const copyToClipboard = () => {
    if (items.length === 0) return;
    const text = items
      .map(i => `[${i.checked ? 'x' : ' '}] ${i.amount} ${i.unit} ${i.name}`)
      .join('\n');
    navigator.clipboard.writeText(`🛒 ChefMate Grocery List:\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const completedCount = items.filter(i => i.checked).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl">Smart Grocery List</h2>
              <p className="text-xs text-emerald-100">
                {items.length} items total • {completedCount} checked off
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add custom item form */}
        <form onSubmit={handleAdd} className="p-4 bg-stone-50 border-b border-stone-200 flex gap-2 shrink-0">
          <input
            type="text"
            placeholder="Add grocery item (e.g. olive oil)..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="number"
            step="any"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            className="w-14 px-2 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-center"
            title="Quantity"
          />
          <input
            type="text"
            placeholder="Unit"
            value={newItemUnit}
            onChange={(e) => setNewItemUnit(e.target.value)}
            className="w-16 px-2 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-center"
            title="Unit (g, pcs, cups)"
          />
          <button
            type="submit"
            disabled={!newItemName.trim()}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center gap-1 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {items.length === 0 ? (
            <div className="text-center py-12 text-stone-400 space-y-2">
              <ShoppingCart className="w-12 h-12 mx-auto stroke-1 text-stone-300" />
              <p className="text-sm font-medium">Your grocery list is currently empty.</p>
              <p className="text-xs text-stone-400">
                Click "Add Missing to Grocery" inside any recipe card or type above!
              </p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                onClick={() => onToggleItem(item.id)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                  item.checked
                    ? 'bg-stone-50 border-stone-200 text-stone-400'
                    : 'bg-white border-stone-200 hover:border-emerald-300 text-stone-800 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                    item.checked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-stone-300 bg-white'
                  }`}>
                    {item.checked && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <span className={`text-sm font-semibold truncate block ${item.checked ? 'line-through' : ''}`}>
                      {item.amount > 0 ? `${item.amount} ${item.unit} ` : ''}{item.name}
                    </span>
                    {item.recipeSource && (
                      <span className="text-[10px] text-stone-400 block truncate">
                        From: {item.recipeSource}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveItem(item.id);
                  }}
                  className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-sm transition-all"
            >
              {copied ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy List'}</span>
            </button>

            <div className="flex items-center gap-2">
              {completedCount > 0 && (
                <button
                  onClick={onClearCompleted}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-2 py-1.5"
                >
                  Clear Done ({completedCount})
                </button>
              )}
              <button
                onClick={onClearAll}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2 py-1.5"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
