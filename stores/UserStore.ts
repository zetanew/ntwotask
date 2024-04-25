import { makeAutoObservable } from 'mobx';

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
  }

  addFavorite = (user: User) => {
    this.favorites.push(user);
  }

  removeFavorite = (user: User) => {
    this.favorites = this.favorites.filter(favorite => favorite.id !== user.id);
  }
}

export default new UserStore();