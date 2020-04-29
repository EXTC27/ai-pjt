import React from 'react';
export const URL = 'https://i02a301.p.ssafy.io/api'
export const Storage = React.createContext({});
export const StorageInit = {
  loading: false,

  imgFile: '',
  imgURL: '',
  img: null,
  imgWidth: 0,
  imgHeight: 0,

  imgHistory: [],
  imgTag: [],

  allSegList: [],
  segList: [],
  segCheckList: [],

  allFaceList: [],
  faceList: [],
  faceCheckList: [],

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