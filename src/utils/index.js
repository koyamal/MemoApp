import { format } from 'date-fns';
import firebase from 'firebase';
import { Alert } from 'react-native';

export async function waitSeconds(waitTime) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("hello");
      resolve();
    }, waitTime);
  })
}

export function dateToString(date) {
  if (!date) {
    return '';
  }
  return format(date, 'yyyy年M月d日 HH時mm分');
}

export function toggleStar(item) {
  if (item) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(item.id);
      ref.set({
        isStar: !item.isStar,
      }, { merge: true })
        .then(() => {
        })
        .catch((error) => {
          Alert.alert(error.code);
        });
    }
  }
}
