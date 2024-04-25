import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Switch } from 'react-native';
import { instance, endpoints } from '../../api/apiConfig';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const localStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  title: {
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

function TodoCard({ todo }: { todo: Todo }) {
  const [completed, setCompleted] = useState(todo.completed);

  return (
    <View style={localStyles.card}>
      <Switch value={completed} onValueChange={setCompleted} />
      <Text style={localStyles.title}>{todo.title}</Text>
    </View>
  );
}

export default function Tasks() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');

  const fetchTodos = () => {
    instance.get(endpoints.todos)
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={localStyles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Ara..."
      />
      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TodoCard todo={item} />}
      />
    </View>
  );
}