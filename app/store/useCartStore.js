import { create } from "zustand";

const useCartStore = create((set) => {
    const savedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    const initialState = savedCart ? JSON.parse(savedCart) : [];
    const savedDiscountedPrice = typeof window !== "undefined" ? localStorage.getItem("discountedPrice") : null;
    const initialDiscountedPrice = savedDiscountedPrice ? parseFloat(savedDiscountedPrice) : 0;
    const savedPromoCodeUsed = typeof window !== "undefined" ? localStorage.getItem("promoCodeUsed") : null;
    const initialPromoCodeUsed = savedPromoCodeUsed === 'true'; // Проверяем, был ли промокод применён

    // Функция для пересчета скидочной цены
    const calculateDiscountedPrice = (items, totalPrice, promoCodeUsed) => {
        const secretWord = 'qwerty';
        const perOfDiscount = 15;

        // Если промокод использован, применяем скидку
        if (promoCodeUsed) {
            return totalPrice - (totalPrice * (perOfDiscount / 100));
        }

        // Если корзина пуста, то нет скидки
        if (items.length === 0) {
            return 0;
        }

        // Если промокод не использован, возвращаем полную цену
        return totalPrice;
    };

    return {
        items: initialState,
        discountedPrice: initialDiscountedPrice,
        promoCodeUsed: initialPromoCodeUsed,

        addItem: (item) =>
            set((state) => {
                const existingItem = state.items.find(
                    (i) => i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
                );

                let updatedItems;
                if (existingItem) {
                    updatedItems = state.items.map((i) =>
                        i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    );
                } else {
                    updatedItems = [...state.items, { ...item, quantity: 1 }];
                }

                const totalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
                const newDiscountedPrice = calculateDiscountedPrice(updatedItems, totalPrice, state.promoCodeUsed);

                localStorage.setItem("cart", JSON.stringify(updatedItems)); // Сохраняем корзину
                localStorage.setItem("discountedPrice", String(newDiscountedPrice)); // Сохраняем обновленную цену
                return { items: updatedItems, discountedPrice: newDiscountedPrice };
            }),

        removeItem: (itemId) =>
            set((state) => {
                const updatedItems = state.items.filter((item) => item.id !== itemId);
                const totalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
                const newDiscountedPrice = calculateDiscountedPrice(updatedItems, totalPrice, state.promoCodeUsed); // Пересчитываем скидку

                localStorage.setItem("cart", JSON.stringify(updatedItems)); // Обновляем корзину в localStorage
                localStorage.setItem("discountedPrice", String(newDiscountedPrice)); // Сохраняем обновленную скидочную цену
                return { items: updatedItems, discountedPrice: newDiscountedPrice };
            }),

        updateQuantity: (itemId, quantity) =>
            set((state) => {
                const updatedItems = state.items.map((item) =>
                    item.id === itemId ? { ...item, quantity } : item
                );

                const totalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
                const newDiscountedPrice = calculateDiscountedPrice(updatedItems, totalPrice, state.promoCodeUsed); // Пересчитываем скидку

                localStorage.setItem("cart", JSON.stringify(updatedItems)); // Обновляем корзину в localStorage
                localStorage.setItem("discountedPrice", String(newDiscountedPrice)); // Сохраняем обновленную скидочную цену
                return { items: updatedItems, discountedPrice: newDiscountedPrice };
            }),

        clearCart: () => {
            localStorage.removeItem("cart"); // Очищаем корзину
            localStorage.removeItem("discountedPrice"); // Очищаем скидочную цену
            localStorage.removeItem("promoCodeUsed"); // Очищаем информацию о применённом промокоде
            set({ items: [], discountedPrice: 0, promoCodeUsed: false }); // Обнуляем состояние
        },

        updateDiscountedPrice: (newPrice) => {
            set({ discountedPrice: newPrice });
            localStorage.setItem("discountedPrice", String(newPrice)); // Сохраняем цену с учетом скидки в localStorage
        },

        setPromoCodeUsed: (used) => {
            set({ promoCodeUsed: used });
            localStorage.setItem("promoCodeUsed", String(used)); // Сохраняем состояние промокода
        },
    };
});

export default useCartStore;
