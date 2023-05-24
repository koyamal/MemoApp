import React, { createContext } from 'react';
import { shape } from 'prop-types';

export const StarContext = createContext({});

export default function StarProvider(props) {
  const { children } = props;
  const contextName = 'Test context';
  return (
    <StarContext.Provider value={{ contextName }}>
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
