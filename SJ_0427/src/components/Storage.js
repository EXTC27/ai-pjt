import React from 'react';

export const Storage = React.createContext({});
export const StorageInit = {
  imgFile: '',
  imgURL: '',
  img: null,
  imgWidth: 0,
  imgHeight: 0,
  imgHistory: [],

  allSegList: [],
  segList: [],
  segCheckList: [],
  
  stageHistory: [
    {
      width: 0,
      height: 0,
      scale: 0,
      ratio: 0,
    }
  ],      
  stageIdx: 0,
  
  curMode: '',

  historyIdx: 0,
}