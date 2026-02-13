"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data/products";
import { motion } from "framer-motion";
import { useState } from "react";
import { formatPrice, calculateVAT, calculatePriceInclVAT } from "@/lib/utils";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

type RentalPeriodType = "standard" | "custom";

interface ConfirmState {
  isOpen: boolean;
  productId: string | null;
  productName: string;
  action: "remove" | "decrease";
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);
  const [rentalPeriodType, setRentalPeriodType] = useState<RentalPeriodType>("standard");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [editingQuantities, setEditingQuantities] = useState<Record<string, string>>({});
  const [confirmDialog, setConfirmDialog] = useState<ConfirmState>({
    isOpen: false,
    productId: null,
    productName: "",
    action: "remove",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-12 max-w-md mx-auto">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start adding items to your cart to get started!</p>
            <Link
              href="/catalog"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleClearCart = () => {
    setConfirmDialog({
      isOpen: true,
      productId: null,
      productName: "",
      action: "remove",
    });
  };

  const handleConfirmRemove = () => {
    if (confirmDialog.productId) {
      removeItem(confirmDialog.productId);
    } else {
      // Clear entire cart
      setIsClearing(true);
      clearCart();
      setTimeout(() => setIsClearing(false), 300);
    }
    setConfirmDialog({ isOpen: false, productId: null, productName: "", action: "remove" });
  };

  const handleCancelRemove = () => {
    setConfirmDialog({ isOpen: false, productId: null, productName: "", action: "remove" });
  };

  const requestRemoveConfirmation = (productId: string, productName: string) => {
    setConfirmDialog({
      isOpen: true,
      productId,
      productName,
      action: "remove",
    });
  };


  const handleQuantityInputChange = (productId: string, value: string) => {
    // Allow empty string, numbers only
    if (value === "" || /^\d+$/.test(value)) {
      setEditingQuantities((prev) => ({ ...prev, [productId]: value }));
    }
  };

  const handleQuantityInputBlur = (productId: string, currentQuantity: number) => {
    const inputValue = editingQuantities[productId];
    if (inputValue === undefined || inputValue === "") {
      // Reset naar huidige quantity als leeg
      setEditingQuantities((prev) => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
      return;
    }

    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue) || numValue < 0) {
      // Invalid input, reset naar huidige quantity
      setEditingQuantities((prev) => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
      return;
    }

    const product = products.find((p) => p.id === productId);
    const availabilityCount = product?.availabilityCount ?? 0;
    const clampedValue = Math.min(Math.max(0, numValue), availabilityCount);

    // Reset editing state
    setEditingQuantities((prev) => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });

    // Als gebruiker 0 invoert, vraag bevestiging VOORDAT we verwijderen
    if (clampedValue === 0 && currentQuantity > 0) {
      const productName = product?.name || "dit item";
      // Toon custom confirm dialog
      requestRemoveConfirmation(productId, productName);
    } else if (clampedValue > 0) {
      updateQuantity(productId, clampedValue);
    }
  };

  const handleQuantityInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, productId: string, currentQuantity: number) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      handleQuantityInputBlur(productId, currentQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Your Cart</h1>
        <p className="text-lg text-gray-600">
          {items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)} item(s) in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Rental Period Selector */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Huurperiode</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rentalPeriod"
                    value="standard"
                    checked={rentalPeriodType === "standard"}
                    onChange={(e) => setRentalPeriodType(e.target.value as RentalPeriodType)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700 font-medium">Standaard (3 dagen)</span>
                </label>
                <span className="text-sm text-gray-500">Vrijdag t/m zondag</span>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rentalPeriod"
                    value="custom"
                    checked={rentalPeriodType === "custom"}
                    onChange={(e) => setRentalPeriodType(e.target.value as RentalPeriodType)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700 font-medium">Aangepaste periode</span>
                </label>
              </div>

              {rentalPeriodType === "custom" && (
                <div className="ml-6 mt-3 space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Ophaaldatum
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Retourdatum
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        min={customStartDate || new Date().toISOString().split("T")[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  {customStartDate && customEndDate && (
                    <div className="text-sm text-gray-600">
                      {(() => {
                        const start = new Date(customStartDate);
                        const end = new Date(customEndDate);
                        const diffTime = Math.abs(end.getTime() - start.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                        return diffDays >= 3 ? (
                          <span className="text-green-600 font-medium">
                            ✓ Periode: {diffDays} dagen (minimum: 3 dagen)
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            ⚠ Periode: {diffDays} dagen (minimum: 3 dagen vereist)
                          </span>
                        );
                      })()}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Minimum huurperiode is 3 dagen. Voor aangepaste periodes neem contact met ons op voor beschikbaarheid en prijsopgave.
                  </p>
                </div>
              )}
            </div>
          </div>
          {items.map((item: { productId: string; quantity: number }, index: number) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;

            const availabilityCount = product.availabilityCount ?? 0;
            const maxQuantity = availabilityCount;
            const canIncrease = item.quantity < maxQuantity;

            return (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                {product.image ? (
                  <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg relative overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-500">
                          {availabilityCount > 0 ? `${availabilityCount} beschikbaar` : "Niet beschikbaar"}
                        </p>
                        {product.minimumRentalPeriod && (
                          <p className="text-xs text-gray-500">
                            Minimum huurperiode: {product.minimumRentalPeriod} dag{product.minimumRentalPeriod !== 1 ? "en" : ""}
                          </p>
                        )}
                        {product.deposit && (
                          <p className="text-xs text-orange-600 font-medium">
                            Waarborg: {formatPrice(product.deposit)} per stuk
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const product = products.find((p) => p.id === item.productId);
                        const productName = product?.name || "dit item";
                        requestRemoveConfirmation(item.productId, productName);
                      }}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1 flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <label htmlFor={`quantity-${item.productId}`} className="text-sm font-medium text-gray-700">
                        Aantal:
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          type="button"
                          onClick={() => {
                            // Sla de waarden op VOORDAT we iets doen
                            const currentQty = item.quantity;
                            const productId = item.productId;
                            
                            // Vraag bevestiging VOORDAT we het aantal verlagen naar 0
                            if (currentQty === 1) {
                              const product = products.find((p) => p.id === productId);
                              const productName = product?.name || "dit item";
                              // Toon custom confirm dialog
                              requestRemoveConfirmation(productId, productName);
                            } else if (currentQty > 1) {
                              // Gewoon verlagen zonder bevestiging
                              updateQuantity(productId, currentQty - 1);
                            }
                          }}
                          className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Verlaag aantal"
                          disabled={item.quantity <= 0}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        {editingQuantities[item.productId] !== undefined ? (
                          <input
                            type="text"
                            value={editingQuantities[item.productId]}
                            onChange={(e) => handleQuantityInputChange(item.productId, e.target.value)}
                            onBlur={() => handleQuantityInputBlur(item.productId, item.quantity)}
                            onKeyDown={(e) => handleQuantityInputKeyDown(e, item.productId, item.quantity)}
                            className="px-4 py-1 text-gray-900 font-medium min-w-[3rem] text-center border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                            maxLength={3}
                          />
                        ) : (
                          <span
                            onClick={() => setEditingQuantities((prev) => ({ ...prev, [item.productId]: item.quantity.toString() }))}
                            className="px-4 py-1 text-gray-900 font-medium min-w-[3rem] text-center cursor-pointer hover:bg-gray-50 rounded"
                            title="Klik om aantal aan te passen"
                          >
                            {item.quantity}
                          </span>
                        )}
                        <button
                          onClick={() => {
                            if (canIncrease) {
                              updateQuantity(item.productId, Math.min(maxQuantity, item.quantity + 1));
                            }
                          }}
                          className={`px-3 py-1 transition-colors ${
                            canIncrease
                              ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                              : "text-gray-400 cursor-not-allowed opacity-50"
                          }`}
                          aria-label="Verhoog aantal"
                          disabled={!canIncrease}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Prijs per stuk</p>
                      <p className="text-lg font-semibold text-gray-900">{formatPrice(product.price)}</p>
                      <p className="text-xs text-gray-500">per periode (3 dagen)</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Totaal: {formatPrice(product.price * item.quantity)}
                      </p>
                      <p className="text-xs text-gray-500">
                        BTW (21%): {formatPrice(calculateVAT(product.price * item.quantity))}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Clear Cart Button */}
          <div className="pt-4">
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Overzicht</h2>
            
            <p className="text-xs text-gray-500 mb-4">Alle prijzen zijn excl. BTW</p>
            
            <div className="space-y-4 mb-6">
              <div className="text-gray-600 text-sm">
                <span>{items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)} item{items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0) !== 1 ? "s" : ""} in winkelwagen</span>
              </div>

              {/* Price breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                {items.map((item: { productId: string; quantity: number }) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;
                  const subtotalExclVAT = product.price * item.quantity;
                  return (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {product.name} × {item.quantity}
                      </span>
                      <span className="text-gray-900 font-medium">
                        {formatPrice(subtotalExclVAT)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                {(() => {
                  const subtotalExclVAT = items.reduce((sum: number, item: { productId: string; quantity: number }) => {
                    const product = products.find((p) => p.id === item.productId);
                    return sum + (product?.price || 0) * item.quantity;
                  }, 0);
                  const vatAmount = calculateVAT(subtotalExclVAT);
                  const totalInclVAT = calculatePriceInclVAT(subtotalExclVAT);
                  
                  return (
                    <>
                      <div className="flex justify-between text-base">
                        <span className="text-gray-700 font-medium">Subtotaal (per periode)</span>
                        <span className="text-gray-900 font-semibold">
                          {formatPrice(subtotalExclVAT)}
                        </span>
                      </div>
                      <div className="flex justify-between text-base">
                        <span className="text-gray-700 font-medium">BTW (21%)</span>
                        <span className="text-gray-900 font-semibold">
                          {formatPrice(vatAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg border-t border-gray-300 pt-2 mt-2">
                        <span className="text-gray-900 font-bold">Totaal incl. BTW</span>
                        <span className="text-gray-900 font-bold">
                          {formatPrice(totalInclVAT)}
                        </span>
                      </div>
                    </>
                  );
                })()}
                {items.some((item: { productId: string }) => {
                  const product = products.find((p) => p.id === item.productId);
                  return product?.deposit && product.deposit > 0;
                }) && (
                  <>
                    {/* Waarborg breakdown */}
                    <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Waarborg breakdown</h3>
                      {items
                        .filter((item: { productId: string }) => {
                          const product = products.find((p) => p.id === item.productId);
                          return product?.deposit && product.deposit > 0;
                        })
                        .map((item: { productId: string; quantity: number }) => {
                          const product = products.find((p) => p.id === item.productId);
                          if (!product || !product.deposit) return null;
                          const depositTotal = product.deposit * item.quantity;
                          return (
                            <div key={item.productId} className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {product.name} × {item.quantity}
                              </span>
                              <span className="text-orange-600 font-medium">
                                {formatPrice(depositTotal)}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                    <div className="flex justify-between text-base border-t border-gray-200 pt-2 mt-2">
                      <span className="text-gray-700 font-medium">Totaal waarborg</span>
                      <span className="text-orange-600 font-semibold">
                        {formatPrice(
                          items.reduce((sum: number, item: { productId: string; quantity: number }) => {
                            const product = products.find((p) => p.id === item.productId);
                            return sum + (product?.deposit || 0) * item.quantity;
                          }, 0)
                        )}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/booking"
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Ga naar Reservering
              </Link>
              <Link
                href="/catalog"
                className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
              >
                Verder Winkelen
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Let op:</strong>{" "}
                {rentalPeriodType === "standard" ? (
                  <>Alle prijzen zijn per huurperiode van 3 dagen (vrijdag-zondag). Standaard ophaal op vrijdagavond, terugbrengen op zondagavond.</>
                ) : (
                  <>Je hebt een aangepaste periode geselecteerd. De definitieve prijs en beschikbaarheid worden bevestigd bij het voltooien van je reservering.</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.productId ? "Item verwijderen?" : "Winkelwagen legen?"}
        message={
          confirmDialog.productId
            ? `Weet je zeker dat je "${confirmDialog.productName}" uit je winkelwagen wilt verwijderen?`
            : "Weet je zeker dat je alle items uit je winkelwagen wilt verwijderen?"
        }
        confirmText="Verwijderen"
        cancelText="Annuleren"
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </div>
  );
}
