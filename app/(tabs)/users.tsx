import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { instance, endpoints } from '../../api/apiConfig';
import styles from '../../styles/styles';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  // add other fields if necessary
};

const localStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  innerView: {
    margin: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  textWithMargin: {
    marginBottom: 5,
  },
  menuIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

function UserCard({ user }: { user: User }) {
  return (
    <View style={localStyles.card}>
      <Image source={{ uri: `https://robohash.org/${user.id}` }} style={{ width: 50, height: 50, marginRight: 10 }} />
      <View style={localStyles.innerView}>
        <Text style={[styles.normalText, localStyles.textWithMargin]}>{user.name}</Text>
        <Text style={[styles.smallText, localStyles.textWithMargin]}>{user.email}</Text>
        <Text style={styles.smallText}>{user.phone}</Text>
      </View>
      <Ionicons name="information-circle-outline" size={24} color="black" style={localStyles.menuIcon} onPress={() => {}} />
    </View>
  );
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    instance.get(endpoints.users)
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ padding: 20 }}>
      <View style={localStyles.searchBar}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput
          style={[styles.mediumText, { marginLeft: 10 }]}
          placeholder="Kullanıcı ara..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
      />
    </View>
  );
}