import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { instance, endpoints } from '../../api/apiConfig';
import styles from '../../styles/styles';

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
  const showAdditionalInfo = () => {
    Alert.alert(
      'Ayrıntılar',
      `👤 Kullanıcı: ${user.username}\n📧 Email: ${user.email}\n📞 Telefon: ${user.phone}\n🏠 Adres: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}\n🏢 İş Yeri: ${user.company.name}\n🌐 Website: ${user.website}`,
      [{ text: 'Tamam', onPress: () => console.log(' basildi') }],
      { cancelable: false },
    );
  };

  return (
    <View style={localStyles.card}>
      <Image source={{ uri: `https://robohash.org/${user.id}` }} style={{ width: 50, height: 50, marginRight: 10 }} />
      <View style={localStyles.innerView}>
        <Text style={[styles.normalText, localStyles.textWithMargin]}>{user.name}</Text>
        <Text style={[styles.smallText, localStyles.textWithMargin]}>{user.email}</Text>
        <Text style={styles.smallText}>{user.phone}</Text>
      </View>
      <Ionicons name="information-circle-outline" size={24} color="black" style={localStyles.menuIcon} onPress={showAdditionalInfo} />
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