import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import { dateToString, toggleStar } from '../utils';
import Star from '../components/Star';

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
          isStar: data.isStar,
        });
      });
    }
    return unsubcribe;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <View>
          <TouchableOpacity style={styles.memoStar} onPress={() => { toggleStar(memo); }}>
            <Star
              isStar={memo && memo.isStar}
              name={['star', 'star']}
              size={32}
              color={['#FFCC00', '#ffffff']}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
          <Text style={styles.memoDate}>{memo && dateToString(memo.updatedAt)}</Text>
        </View>
      </View>

      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          {memo && memo.bodyText}
        </Text>
      </ScrollView>

      <CircleButton
        name="edit-2"
        style={{ top: 60, bottom: 'auto' }}
        onPress={() => {
          navigation.navigate('MemoEdit', { id: memo.id, bodyText: memo.bodyText });
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#467FD3',
    height: 96,
    paddingVertical: 24,
  },
  memoStar: {
    padding: 8,
    justifyContent: 'center',
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
