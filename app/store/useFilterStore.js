import { create } from "zustand";

const useFilterStore = create((set) => ({
    category: null,
    color: null,
    priceMin: 1000,
    priceMax: 100000,
    setCategory: (category) => set({ category }),
    setColor: (color) => set({ color }),
    setPriceRange: (priceMin, priceMax) => set({ priceMin, priceMax }),
    fetchPriceRange: async () => {
        const response = await fetch("/api/price-range");
        const data = await response.json();
        set({ priceMin: data.min, priceMax: data.max });
    }
}));

export default useFilterStore;
