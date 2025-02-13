import { create } from "zustand";

const useCartStore = create((set) => {
    const savedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    const initialState = savedCart ? JSON.parse(savedCart) : [];

    return {
        items: initialState,

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

                localStorage.setItem("cart", JSON.stringify(updatedItems)); // Сохраняем в localStorage
                return { items: updatedItems };
            }),

        removeItem: (itemId) =>
            set((state) => {
                const updatedItems = state.items.filter((item) => item.id !== itemId);
                localStorage.setItem("cart", JSON.stringify(updatedItems));
                return { items: updatedItems };
            }),

        updateQuantity: (itemId, quantity) =>
            set((state) => {
                const updatedItems = state.items.map((item) =>
                    item.id === itemId ? { ...item, quantity } : item
                );

                localStorage.setItem("cart", JSON.stringify(updatedItems)); // Обновляем localStorage
                return { items: updatedItems };
            }),

        clearCart: () => {
            localStorage.removeItem("cart"); // Очищаем localStorage
            set({ items: [] });
        },
    };
});

export default useCartStore;
