import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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

  useEffect(() => {
    instance.get(endpoints.posts)
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}