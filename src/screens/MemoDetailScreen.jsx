import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';

export default function MemoDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const [memo, setMemo] = useState(null);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubcribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      unsubcribe = ref.onSnapshot((doc) => {
        console.log(doc.id, doc.data());
        const data = doc.data();
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updatedAt: data.updatedAt.toDate(),
        });
      });
    }
    return unsubcribe;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト1</Text>
        <Text style={styles.memoDate}>2023年05月12日 10:00</Text>
      </View>

      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          買い物リスト1
          testtesttesttesttesttesttest
          testtesttest
        </Text>
      </ScrollView>

      <CircleButton
        name="edit-2"
        style={{ top: 60, bottom: 'auto' }}
        onPress={() => {
          navigation.navigate('MemoEdit');
        }}
      />
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
