import React from 'react';

export const Storage = React.createContext(
  {
    imgFile: '',
    imgURL: '',
    imgUpload: () => {},
    imgInit: () => {},
    innerW: 0,
    innerH: 0,
  }
);