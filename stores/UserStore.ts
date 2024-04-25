import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
  website: string;
};

class UserStore {
  favorites: User[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  addFavorite = (user: User) => {
    this.favorites.push(user);
    this.saveFavorites();
  }

  removeFavorite = (user: User) => {
    this.favorites = this.favorites.filter(favorite => favorite.id !== user.id);
    this.saveFavorites();
  }

  loadFavorites = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
  }

  saveFavorites = async () => {
    await AsyncStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}

export default new UserStore();