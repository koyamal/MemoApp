import React, { createContext, useState } from 'react';
import { shape } from 'prop-types';

export const StarContext = createContext({});

export default function StarProvider(props) {
  const { children } = props;
  const [onlyStar, setOnlyStar] = useState(false);
  return (
    // eslint-disable-next-line
    <StarContext.Provider value={{ onlyStar, setOnlyStar }}>
      {children}
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: shape(),
};

StarProvider.defaultProps = {
  children: null,
};
