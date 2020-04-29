import React from 'react';
export const URL = 'https://i02a301.p.ssafy.io/api'
export const Storage = React.createContext({});
export const StorageInit = {
  loading: false,
  // innerW: window.innerWidth,
  // innerH: window.innerHeight,

  imgFile: null,
  imgURL: '',
  img: null,
  imgWidth: 0,
  imgHeight: 0,
  imgHistory: [],

  tagList: [],

  allSegList: [],
  segLabels: [],
  segList: [],
  segCheckList: [],
  segHistory: [],

  allFaceList: [],
  faceList: [],
  faceCheckList: [],
  faceHistory: [],

  //rotate
  rotateDegree: 0,
  rotateCount: 0,
  rotateMode: '',
  rotating: false,
  tempStageHistory: {
    width: 0,
    height: 0,
    scale: 0,
    ratio: 0,
  },
  tempImgHistory: null,
  beforeImg: {
    width: 0,
    height: 0,
  },
  faceLocaList: [],

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

  filterHistory: [
    {
      blur: 0,
      hue: 0,
      saturation: 0,
      luminance: 0,
    },
  ],
}