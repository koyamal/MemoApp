import React from 'react';

import MemoListScreen from './MemoListScreen';
import StarProvider from '../components/provider/StarProvider';

export default function MemoListWrapScreen() {
  return (
    <StarProvider>
      <MemoListScreen />
    </StarProvider>
  );
}
