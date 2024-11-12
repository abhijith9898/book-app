import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import { db } from './firebase';
import { doc, getDoc, collection, query, where, onSnapshot, setDoc } from 'firebase/firestore';
import colors from './colors';

export default function BookDetail({ route, navigation }) {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    
    const bookDocRef = doc(db, 'books', bookId);
    
    const unsubscribeBook = onSnapshot(bookDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setBook({ id: docSnapshot.id, ...docSnapshot.data() });
      }
    });

    const borrowedCollectionRef = collection(db, 'borrowed');
    const borrowedQuery = query(borrowedCollectionRef, where('userId', '==', 'currentUserId'));
    const unsubscribeBorrowed = onSnapshot(borrowedQuery, (snapshot) => {
      setBorrowedBooks(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      unsubscribeBook();
      unsubscribeBorrowed();
    };

  }, [bookId]);

  const borrowBook = async () => {
    if (borrowedBooks.length < 3) {
      try {
        const borrowedDocRef = doc(db, 'borrowed', bookId);
        await setDoc(borrowedDocRef, { ...book, userId: 'currentUserId' });
        Alert.alert('Success', 'Book borrowed successfully!');
      } catch (error) {
        Alert.alert('Error', 'Failed to borrow the book. Please try again.');
      }
    } else {
      Alert.alert('Limit Reached', 'Cannot borrow more than 3 books at a time.');
    }
  };

  if (!book) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.bookName}>{book.name.toUpperCase()}</Text>
      <Text style={styles.authorName}>by {book.author}</Text>
      {book.coverURL ? (
        <Image source={{ uri: book.coverURL }} style={styles.coverImage} />
      ) : (
        <Text style={styles.noCoverText}>No cover available</Text>
      )}
      <Text style={styles.ratingText}>Rating: {book.rating}</Text>
      <Text style={styles.summaryText}>{book.summary}</Text>
      <Button color={colors.button} title="Borrow" onPress={borrowBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    alignItems: 'center',
  },
  bookName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  authorName: {
    fontSize: 18,
    color: colors.textSecondary,
    marginVertical: 8,
  },
  coverImage: {
    width: 150,
    height: 220,
    marginVertical: 10,
    borderRadius: 10,
  },
  noCoverText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginVertical: 8,
  },
  summaryText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginVertical: 10,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 20,
  },
});
