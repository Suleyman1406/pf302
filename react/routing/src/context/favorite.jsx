import { useState } from "react";
import { createContext } from "react";
import { LOCALSTORAGE_FAVORITES_KEY } from "../constants/keys";

export const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  function toggleFavorite(product) {
    const favoriteProductIdx = favorites.findIndex(
      (favProduct) => favProduct.id === product.id
    );

    if (favoriteProductIdx === -1) {
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      setFavoritesToLocalStorage(newFavorites);
      return true;
    } else {
      favorites.splice(favoriteProductIdx, 1);
      const newFavorites = [...favorites];
      setFavorites(newFavorites);
      setFavoritesToLocalStorage(newFavorites);
      return false;
    }
  }

  function setFavoritesToLocalStorage(favorites) {
    localStorage.setItem(LOCALSTORAGE_FAVORITES_KEY, JSON.stringify(favorites));
  }

  function getFavoritesFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_FAVORITES_KEY)) || [];
  }

  function isFavorite(product) {
    return favorites.some((favProduct) => favProduct.id === product.id);
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
