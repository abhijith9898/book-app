import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { db } from './firebase'; 
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import colors from './colors'; 


export default function Borrowed() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
   
    const borrowedRef = collection(db, 'borrowed');

    const unsubscribe = onSnapshot(borrowedRef, (snapshot) => {
      setBorrowedBooks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const returnBook = async (bookId) => {
    try {
      const bookDocRef = doc(db, 'borrowed', bookId);
      await deleteDoc(bookDocRef);
      Alert.alert('Success', 'Book returned successfully!');
    } catch (error) {
      console.error('Error returning book: ', error);
      Alert.alert('Error', 'Failed to return the book. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookName}>{item.name.toUpperCase()}</Text>
            <Text style={styles.authorName}>by {item.author}</Text>
            <Button color={colors.button} title="Return" onPress={() => returnBook(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No books borrowed</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  bookItem: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  authorName: {
    fontSize: 16,
    color: colors.textSecondary,
    marginVertical: 4,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 20,
  },
});
