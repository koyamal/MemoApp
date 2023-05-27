import React, { useEffect, useState, useContext } from 'react';
import {
  View, StyleSheet, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Empty from '../components/Empty';
import StarEmpty from '../components/StarEmpty';
import CircleStarButton from '../components/CircleStarButton';
import { StarContext } from '../components/provider/StarProvider';

export default function MemoListScreen() {
  const navigation = useNavigation();
  const [memos, setMemos] = useState([]);
  const { onlyStar, setIsLoading } = useContext(StarContext);

  useEffect(() => {
    console.log('MemoListScreen');
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      setIsLoading(true);
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userMemos = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (onlyStar) {
              if (data.isStar) {
                // console.log(doc.id, data);
                userMemos.push({
                  id: doc.id,
                  bodyText: data.bodyText,
                  updatedAt: data.updatedAt.toDate(),
                  isStar: data.isStar,
                });
              }
            } else {
              // console.log(doc.id, data);
              userMemos.push({
                id: doc.id,
                bodyText: data.bodyText,
                updatedAt: data.updatedAt.toDate(),
                isStar: data.isStar,
              });
            }
          });
          setMemos(userMemos);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          console.log(error);
          Alert.alert('Load Data failed.');
        },
      );
    }
    return unsubscribe;
  }, [onlyStar]);

  if (memos.length === 0 && onlyStar) {
    return (<StarEmpty />);
  }

  if (memos.length === 0 && !onlyStar) {
    return (<Empty />);
  }

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
      <CircleStarButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});
