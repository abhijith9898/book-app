import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import colors from './colors';

export default function BookList({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    
    const booksCollection = collection(db, 'books');
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      setBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();

  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
          >
            <Text style={styles.bookName}>{item.name.toUpperCase()}</Text>
            <Text style={styles.authorName}>{item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  card: {
    backgroundColor: colors.card,
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  authorName: {
    fontSize: 14,
    color: colors.secondary,
  },
});
