import React from 'react';
import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/UserStore';

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
};

const Favorite = observer(({ user }: { user: User }) => {
  const removeFavorite = () => {
    userStore.removeFavoriteById(user.id);
  };

  return (
    <View style={{ margin: 10, padding: 10, backgroundColor: '#f8f8f8', borderRadius: 5 }}>
      <Text>{user.name}</Text>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Button title="Favorilerden Kaldır" onPress={removeFavorite} />
    </View>
  );
});

const Favorites = observer(() => {
  return (
    <View>
      {userStore.favorites.map(user => (
        <Favorite key={user.id} user={user} />
      ))}
    </View>
  );
});

export default Favorites;