import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { instance, endpoints } from '../../api/apiConfig';
import styles from '../../styles/styles';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const localStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

function PostCard({ post }: { post: Post }) {
  return (
    <View style={localStyles.card}>
      <View>
        <Text style={[styles.normalText, localStyles.title]}>{post.title}</Text>
        <Text style={styles.smallText}>{post.body}</Text>
      </View>
    </View>
  );
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;

  const fetchPosts = () => {
    instance.get(endpoints.posts)
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const paginatedPosts = posts.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
// 1 tane geride kaldi
  return (
    <View style={{ paddingBottom: 50 }}>
      <FlatList
        data={paginatedPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Button title="Önceki" onPress={() => setPage(oldPage => Math.max(oldPage - 1, 0))} />
        <Text>Sayfa {page + 1}</Text>
        <Button title="Sonraki" onPress={() => setPage(oldPage => Math.min(oldPage + 1, Math.ceil(posts.length / itemsPerPage) - 1))} /> 
      </View>
    </View>
  );
}