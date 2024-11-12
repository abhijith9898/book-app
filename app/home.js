import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import bookList from './bookList';
import bookDetail from './bookDetail';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BooksList" component={bookList} options={{ title: 'Books' }} />
      <Stack.Screen name="BookDetail" component={bookDetail} options={{ title: 'Book Details' }} />
    </Stack.Navigator>
  );
}
