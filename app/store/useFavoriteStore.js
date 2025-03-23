import { create } from 'zustand';

const loadFromLocalStorage = () => {
    try {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error('Ошибка при загрузке из localStorage:', error);
        return [];
    }
};

const saveToLocalStorage = (favorites) => {
    try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error);
    }
};

const useFavoritesStore = create((set) => ({
    favorites: loadFromLocalStorage(),
    addToFavorites: (item) =>
        set((state) => {
            const newFavorites = [...state.favorites, item];
            saveToLocalStorage(newFavorites);
            console.log('Товар добавлен в избранное:', item); // Логируем добавление
            return { favorites: newFavorites };
        }),
    removeFromFavorites: (id) =>
        set((state) => {
            const newFavorites = state.favorites.filter((item) => item.id !== id);
            saveToLocalStorage(newFavorites);
            console.log('Товар удален из избранного:', id); // Логируем удаление
            return { favorites: newFavorites };
        }),
    isInFavorites: (id) => {
        const isInFavorites = useFavoritesStore.getState().favorites.some((item) => item.id === id);
        console.log('Проверка наличия товара в избранном:', id, isInFavorites); // Логируем проверку
        return isInFavorites;
    },

}));

export default useFavoritesStore;