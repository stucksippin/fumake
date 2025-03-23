import { create } from 'zustand';

// Функция для загрузки из localStorage
const loadFromLocalStorage = () => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window !== 'undefined') {
        try {
            const storedFavorites = localStorage.getItem('favorites');
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (error) {
            console.error('Ошибка при загрузке из localStorage:', error);
            return [];
        }
    }
    return []; // На сервере возвращаем пустой массив
};

// Функция для сохранения в localStorage
const saveToLocalStorage = (favorites) => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Ошибка при сохранении в localStorage:', error);
        }
    }
};

const useFavoritesStore = create((set) => ({
    favorites: loadFromLocalStorage(), // Загружаем избранное при инициализации
    addToFavorites: (item) =>
        set((state) => {
            const newFavorites = [...state.favorites, item];
            saveToLocalStorage(newFavorites); // Сохраняем в localStorage
            console.log('Товар добавлен в избранное:', item); // Логируем добавление
            return { favorites: newFavorites };
        }),
    removeFromFavorites: (id) =>
        set((state) => {
            const newFavorites = state.favorites.filter((item) => item.id !== id);
            saveToLocalStorage(newFavorites); // Сохраняем в localStorage
            console.log('Товар удален из избранного:', id); // Логируем удаление
            return { favorites: newFavorites };
        }),
    isInFavorites: (id) => {
        const isInFavorites = useFavoritesStore.getState().favorites.some((item) => item.id === id);
        return isInFavorites;
    },
}));

export default useFavoritesStore;