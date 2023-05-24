import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Alert,
} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Empty from '../components/Empty';
import StarEmpty from '../components/StarEmpty';
import CircleStarButton from '../components/CircleStarButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onlyStar, setOnlyStar] = useState(false);

  useEffect(() => {
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
                console.log(doc.id, data);
                userMemos.push({
                  id: doc.id,
                  bodyText: data.bodyText,
                  updatedAt: data.updatedAt.toDate(),
                  isStar: data.isStar,
                });
              }
            } else {
              console.log(doc.id, data);
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
    return (
      <StarEmpty isLoading={isLoading} setOnlyStar={setOnlyStar} onlyStar={onlyStar} />
    );
  }

  if (memos.length === 0 && !onlyStar) {
    return (
      <Empty isLoading={isLoading} />
    );
  }

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
      <CircleStarButton setOnlyStar={setOnlyStar} onlyStar={onlyStar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});
