import { create } from "zustand";

const useFilterStore = create((set) => ({
    category: null,
    color: null,
    priceMin: 1000,
    priceMax: 100000,

    setCategory: (category) => set({ category }),
    setColor: (color) => set({ color }),
    setPriceRange: (priceMin, priceMax) => set({ priceMin, priceMax }),


    resetFilters: () => set({
        category: null,
        color: null,
        priceMin: 1000, //
        priceMax: 100000, //
    }),

    fetchPriceRange: async () => {
        const response = await fetch("/api/price-range");
        const data = await response.json();
        set({ priceMin: data.min, priceMax: data.max });
    }

}));

export default useFilterStore;


//ЕСЛИ КОГДА-ТО ЗАХОЧУ ССЫЛКУ ДЛЯ ОТФИЛТРОВАННЫХ ТОВАРОВ
// fetchFurniture: async () => {
//     const { category, color, priceMin, priceMax } = getState();

//     const query = new URLSearchParams({
//         ...(category && { category }),
//         ...(color && { color }),
//         priceMin: priceMin.toString(),
//         priceMax: priceMax.toString(),
//     });

//     try {
//         const response = await fetch(`/api/furniture?${query.toString()}`);
//         const data = await response.json();
//         set({ furniture: data });
//     } catch (error) {
//         console.error("Ошибка загрузки мебели:", error);
//     }
// }