import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import update from "react-addons-update";
import Konva from 'konva'
import {Image, Rect,} from "react-konva";

import {Storage, StorageInit, URL} from './components/Storage'
import MainPage from './components/MainPage'
import EditorPage from './components/EditorPage'
import * as Methods from './components/Methods'
import * as CropRect from './components/Settings/Crop/CropRect'
import * as BlurRect from './components/Settings/Face/BlurRect'
import * as AdjustMethods from './components/Settings/Adjust/AdjustMethods'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: false,

      innerW: window.innerWidth,
      innerH: window.innerHeight,

      imgFile: null,
      imgURL: "",
      img: null,
      imgWidth: 0,
      imgHeight: 0,
      // imgTag : [],
      imgHistory: [],
      imgUpload: this.imgUpload,

      allSegList: [],
      segLabels: [],
      segList: [],
      segCheckList: [],
      // segHistory: [],

      allFaceList: [],
      faceList: [],
      faceCheckList: [],
      // faceHistory: [],

      tagList: [],
      tagCheckList: [],
      checkTag: this.checkTag,

      //rotate
      rotateDegree: 0,
      rotateCount: 0,
      rotateMode: "",
      rotating: false,
      changeRotateMode: this.changeRotateMode,
      tempStageHistory: {
        width: 0,
        height: 0,
        scale: 0,
        ratio: 0,
      },
      tempImgTag: null,
      beforeImg: {
        width: 0,
        height: 0,
      },
      faceLocaList: [],

      layerRef: React.createRef(),

      stageRef: React.createRef(),
      stageHistory: [
        {
          width: 0,
          height: 0,
          scale: 0,
          ratio: 0,
        },
      ],
      stageIdx: 0,
      stageInit: this.stageInit,

      modalConfirm: this.modalConfirm,
      backToMain: this.backToMain,

      applyChange: this.applyChange,
      refreshChange: this.refreshChange,
      cancelChange: this.cancelChange,

      curMode: "",
      changeMode: this.changeMode,

      historyIdx: 0,
      changeHistory: this.changeHistory,

      filterHistory: [
        {
          hue: 0,
          saturation: 0,
          luminance: 0,
          contrast: 0,
          blur: 0,
        },
      ],
      changeAdjust: this.changeAdjust,
      changeFilter: this.changeFilter,
    };
  }

  componentDidMount() {
    if (this.state.imgFile === null) {
      this.backToMain();
    }
  }

  //setState 비동기 때문에 열받아서 만든 함수
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  imgUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const _imgFile = e.target.files[0];
    reader.readAsDataURL(_imgFile);
    reader.onloadend = () => {
      this.setStateAsync({
        imgFile: _imgFile,
        imgURL: reader.result,
      })
        .then(this.stageInit())
        .then(this.props.history.push(`Editor`));
    };
  };

  stageInit = () => {
    const _img = Methods.imgUrlToTag(this.state.imgURL);
    _img.onload = () => {
      this.setStateAsync({
        img: _img,
      })
        .then(() => {
          this.setState({
            stageHistory: [Methods.calcStage(_img.width, _img.height)],
          });
        })
        .then(() => {
          this.setState({
            imgHistory: [
              <Image key={0} id={String(this.state.historyIdx)} image={_img} />,
            ],
          });
        });
    };
  };

  backToMain = () => {
    this.setState(StorageInit);
    this.props.history.replace("/");
  };

  modalConfirm = (e) => {
    const _confirm = e.currentTarget.id
    
    if(this.state.curMode === 'origin'){
      if(_confirm === 'yes'){
        this.setStateAsync({
          curMode: '',
          imgHistory: [this.state.imgHistory[0]],
          stageHistory: [this.state.stageHistory[0]],

          historyIdx: 0,

          segCheckList: this.state.segCheckList.map(
            (value, i) => value && false
          ),

          faceCheckList: this.state.faceCheckList.map((value, i) => value && false),
          
          filterHistory: update(this.state.filterHistory, {
            [this.state.historyIdx]: {
              blur: { $set: 0 },
              hue: { $set: 0 },
              saturation: { $set: 0 },
              contrast: { $set: 0 },
              luminance: { $set: 0 },
            },
          }),
        })
        .then(() => {
          // const layer = this.state.layerRef.getLayer();
          // const img = layer.find(`#${this.state.historyIdx}`)[0];
          // img.cache();
          // img.filters([Konva.Filters.Blur, Konva.Filters.HSL]);
          // img.blurRadius(0);
          // img.hue(0);
          // img.saturation(0);
          // img.luminance(0);
          // layer.batchDraw()
          AdjustMethods.InitDispAdjust(this.state.layerRef.getLayer(), this.state.historyIdx)
        })
      }
      else{
        this.setState({
          curMode: "",
        });
      }
    } 
    
    else if (this.state.curMode === "backToMain") {
      if (_confirm === "yes") {
        this.backToMain();
      } else {
        this.setState({
          curMode: "",
        });
      }
    }

    else{
      this.setState({
        curMode: "tag",
      });
    }
  };

  changeRotateMode = (e) => {
    const _rotateMode = e.currentTarget.id
    const _curHistIdx = this.state.historyIdx

    let plusDegree = 90
    if(_rotateMode === 'left') {
      plusDegree = 270
    }

    const stage = this.state.stageRef.getStage()
    const _layer = this.state.layerRef.getLayer()
    const img = _layer.find(`#${this.state.historyIdx}`)[0]
    const _ratio = this.state.stageHistory[this.state.historyIdx].ratio
    const _dataURL = _layer.toDataURL({ pixelRatio: _ratio })

    console.log(img)

    // 초기값 저장
    // applyChange / cancleChange를 누르기 전까지는 img.getAttr('width'), img.getAttr('height')가 
    // 변화하지 않고 계속 똑같음. rotating도 누적됨.
    // const curStage = this.state.stageHistory[_curHistIdx]
    // if(this.state.rotating === false) {     

    //   this.setStateAsync({
    //     rotating: true,
    //     tempStageHistory: curStage,
    //     tempImgTag: _imgTag, //이미지 타입 다시 체크!!

    //     rotateCount: this.state.rotateCount + 1,

    //     stageHistory: this.state.stageHistory.concat(img.getAttr('height'), img.getAttr('width')),
    //     historyIdx: this.state.historyIdx + 1,
    //     imgHistory: this.state.imgHistory.concat(<Image id = {this.state.historyIdx + 1} image = {_imgTag} />)
    //     // stageHistory: this.state.stageHistory.slice(0, _curHistIdx)
    //     //   .concat(Methods.calcStage(img.getAttr('height'), img.getAttr('width')))
    //   }).then(() => {

    //     const layer = this.state.layerRef.getLayer()
    //     const img = layer.find(`#${this.state.historyIdx}`)[0]

    //     console.log(img)

    //     // rotation
    //     console.log('imgDegree: ', img.getAttr('rotation'))
    //     let degree = (img.getAttr('rotation') + plusDegree) % 360
    //     if (degree < 0) degree = 360 + degree

    //     img.rotation(degree)
    //     console.log('imgDegree: ', img.getAttr('rotation'))

    //     // rotate 후 좌표 설정
    //     if(degree === 90) {
    //       img.x(img.getAttr('height'))
    //       img.y(0)
    //     } else if(degree === 180) {
    //       img.y(img.getAttr('height'))
    //       img.x(img.getAttr('width'))
    //     } else if(degree === 270) {
    //       img.x(0)
    //       img.y(img.getAttr('width'))
    //     } else {
    //       img.x(0)
    //       img.y(0)
    //     }

    //     layer.batchDraw()
    //   })
    // } 
    // else {

      // rotation
      // console.log('degree:::::::::::::::', img.rotation)
      console.log('imgDegree: ', img.getAttr('rotation'))
      let degree = (img.getAttr('rotation') + plusDegree) % 360

      img.rotation(degree)
      console.log('imgDegree: ', img.getAttr('rotation'))

      // rotate 후 좌표 설정
      if(degree === 90) {
        img.x(img.getAttr('height'))
        img.y(0)
      } else if(degree === 180) {
        img.y(img.getAttr('height'))
        img.x(img.getAttr('width'))
      } else if(degree === 270) {
        img.x(0)
        img.y(img.getAttr('width'))
      } else {
        img.x(0)
        img.y(0)
      }

      _layer.batchDraw()

      let imgW = img.getAttr('width')
      let imgH = img.getAttr('height')
      if(this.state.rotateCount % 2 === 0) {
        imgW = img.getAttr('height')
        imgH = img.getAttr('width')
      }

      console.log("W/H", imgW, imgH)

      this.setStateAsync({
        rotateCount: this.state.rotateCount + 1,
        stageHistory: this.state.stageHistory.slice(0, _curHistIdx)
          .concat(Methods.calcStage(imgW, imgH))
      }).then(() => {
        console.log(this.state.stageHistory)
      })
  }

  changeFilter = async (hue, saturation, luminance, contrast, blur) => {
    const layer = this.state.layerRef.getLayer();
    const img = layer.find(`#${this.state.historyIdx}`)[0];
    console.log(img)
    img.cache();
    img.filters([
      Konva.Filters.Blur,
      Konva.Filters.HSL,
      Konva.Filters.Contrast,
    ]);
    img.hue(hue);
    img.saturation(saturation);
    img.luminance(luminance);
    img.blurRadius(blur);
    img.contrast(contrast);
    layer.batchDraw();
  };

  changeAdjust = async (e, _value) => {
    const channel = e.currentTarget.id;
    const value = _value;

    const layer = this.state.layerRef.getLayer();
    const img = layer.find(`#${this.state.historyIdx}`)[0];
    img.cache();
    img.filters([
      Konva.Filters.Blur,
      Konva.Filters.HSL,
      Konva.Filters.Contrast,
    ]);

    if (channel === "blur") {
      await this.setStateAsync({
        filterHistory: update(this.state.filterHistory, {
          [this.state.historyIdx]: {
            blur: { $set: value },
          },
        }),
      });
      img.blurRadius(value);
    } else if (channel === "hue") {
      await this.setStateAsync({
        filterHistory: update(this.state.filterHistory, {
          [this.state.historyIdx]: {
            hue: { $set: value },
          },
        }),
      });
      img.hue(value);
    } else if (channel === "saturation") {
      await this.setStateAsync({
        filterHistory: update(this.state.filterHistory, {
          [this.state.historyIdx]: {
            saturation: { $set: value },
          },
        }),
      });
      img.saturation(value);
    } else if (channel === "luminance") {
      await this.setStateAsync({
        filterHistory: update(this.state.filterHistory, {
          [this.state.historyIdx]: {
            luminance: { $set: value },
          },
        }),
      });
      img.luminance(value);
    } else if (channel === "contrast") {
      await this.setStateAsync({
        filterHistory: update(this.state.filterHistory, {
          [this.state.historyIdx]: {
            contrast: { $set: value },
          },
        }),
      });
      img.contrast(value);
    }
    layer.batchDraw();
  };

  changeMode = async (e) => {
    const _curMode = e.currentTarget.id;
    console.log(_curMode)

    await this.setStateAsync({
      loading: true,
    });

    if (_curMode !== "") {
      await this.setStateAsync({
        curMode: _curMode,
      });

      /* 모드 변경시 작성란 */

      if (_curMode === "crop") { //자르기일 때, 크롭되는 사각형 영역을 생성한다.
        await this.setStateAsync({ loading: false });

        const _width = this.state.stageHistory[this.state.historyIdx].width;
        const _height = this.state.stageHistory[this.state.historyIdx].height;
        const _ratio = this.state.stageHistory[this.state.historyIdx].ratio;
        const _initVal = {
          x: (_width * _ratio) / 4,
          y: (_height * _ratio) / 4,
          width: (_width * _ratio) / 2,
          height: (_height * _ratio) / 2,
        }
        CropRect.createCropRect(this.state.stageRef, _initVal)
      }

      else if(_curMode === 'segment'){ //원본 사진에서 객체를 뽑아내기 위해 서버쪽에 axios 요청을 보낸다.
        if(this.state.allSegList.length === 0){ //객체 리스트가 비어있으면 요청을 보낸다.
          try{
            const formData = new FormData();
            formData.append("images", this.state.imgFile);

            axios({
              method: "post",
              url: `${URL}/images`,
              data: formData,
            }).then((res) => {
              const resData = res.data;

              resData.map((_resData, i) => {
                const _view = new window.Image();
                const _base64 = `data:image/png;base64,${_resData.view}`;
                const _label = _resData.label;

                _view.src = _base64;
                _view.onload = () => {
                  const _viewW = _view.width;
                  const _viewH = _view.height;
                  const _style = Methods.calcSegView(_viewW, _viewH).style;
                  const _width = Methods.calcSegView(_viewW, _viewH).width;
                  const _height = Methods.calcSegView(_viewW, _viewH).height;

                  this.setState({
                    segLabels: this.state.segLabels.concat(_label),
                    segCheckList: this.state.segCheckList.concat(false),
                    allSegList: this.state.allSegList.concat(
                      <div key={i} style={_style}>
                        <img
                          id={i}
                          src={_base64}
                          alt=""
                          width={`${_width}px`}
                          height={`${_height}px`}
                          onClick={this.checkSeg}
                        />
                      </div>
                    ),
                  });
                };
              });
              this.setStateAsync({
                loading: false,
              }).then(
                this.setState({
                  segList: resData.map((_resData, i) => {
                    return (
                      <Image
                        key={i}
                        id={`segment-${i}`}
                        image={Methods.imgUrlToTag(
                          `data:image/png;base64,${_resData.origin}`
                        )}
                      />
                    );
                  }),
                })
              );
            });
          } 
          catch (err) {
            console.log("Axios Error", err);
            this.setState({
              loading: false,

            });
          }
        } 
        else {
          this.setState({
            loading: false,
          });
        }
      } 
      
      else if (_curMode === "face") {
        if (this.state.allFaceList.length === 0) {
          //얼굴 리스트가 비어있으면
          try {
            const formData = new FormData();
            formData.append("images", this.state.imgFile);
            axios({
              method : 'post',
              url : `${URL}/faces`,
              data : formData,
            }).then(function(response){
              this.setStateAsync({
                faceCheckList: response.data.response.map(() => true),
                allFaceList: response.data.response.map((_base64, i) => { 
                  const _style = Methods.calcFaceView().style
                  return(
                  <div key={i} style={_style}>
                    <img
                      id={i}
                      src={`data:image/png;base64,${_base64.base64}`} 
                      alt='' 
                      width='100%' 
                      height='100%'
                      onClick={this.checkFace}
                    />
                  </div>
                )}),
                faceList: response.data.response.map((_base64, i) => {
                    return(
                    <Image key={i}
                      id={`face-blur`}
                      x={_base64.x}
                      y={_base64.y}
                      width={_base64.width}
                      height={_base64.height}
                      image={Methods.imgUrlToTag(`data:image/png;base64,${_base64.base64}`)}
                      filters={[Konva.Filters.Blur]}
                      blurRadius={50}
                    />
                  )
                }),
                loading: false,
              })
              .then(() => {
                BlurRect.updateBlur(this.state.stageRef.getStage(), this.state.layerRef.getLayer())
              })
            }.bind(this))
          }
          catch(err){
            console.log('Axios Error', err) 
            this.setState({
              loading: false,
              // allFaceList : ["얼굴을 인식하지 못했습니다."],
            });
          }
        }
        else{
          this.setStateAsync({
            loading: false,
            faceCheckList: this.state.faceCheckList.map(() => true),
          })
          .then(
            BlurRect.updateBlur(this.state.stageRef.getStage(), this.state.layerRef.getLayer())
          );
        }
      }

      else if(_curMode === 'tag'){
        const formData = new FormData();
        formData.append('images', this.state.imgFile);
        axios({
          method : 'post',
          url : `${URL}/tags`,
          data : formData,
        })
        .then((response) => {
          this.setStateAsync({
            loading: false,
            tagList : response.data.response,
          })
          .then(()=>{
            const init = this.state.tagList.map(() => true)
            this.setState({
              tagCheckList: init
            })
          })
        })
        .catch(function(error){
          this.setState({
            loading: false,
            // imgTag : ["태그를 가져오지 못했습니다. ㅠㅅㅠ"]
          })
        }.bind(this))
      }

      else if(_curMode === 'rotate') {
        const _layer = this.state.layerRef.getLayer()
        const img = _layer.find(`#${this.state.historyIdx}`)[0]
        const _ratio = this.state.stageHistory[this.state.historyIdx].ratio
        const _dataURL = _layer.toDataURL({ pixelRatio: _ratio })
        const _imgTag = Methods.imgUrlToTag(_dataURL)

        // const _preStageHist = this.state.stageHistory.slice(0, this.state.historyIdx + 1) //현재 인덱스 부터 앞쪽 히스토리
        // const _backStageHist = this.state.stageHistory.slice(this.state.historyIdx) //현재 인덱스 부터 뒤쪽 히스토리
        
        // const _preImgHist = this.state.imgHistory.slice(0, this.state.historyIdx + 1) //현재 인덱스 부터 앞쪽 히스토리
        // const _backImgHist = this.state.imgHistory.slice(this.state.historyIdx) //현재 인덱스 부터 뒤쪽 히스토리

        this.setStateAsync({
          rotating: true,
          historyIdx: this.state.historyIdx + 1,
          stageHistory: this.state.stageHistory.concat(this.state.stageHistory[this.state.historyIdx]),
          imgHistory: this.state.imgHistory.concat(<Image id = {String(this.state.historyIdx + 1)} image = {_imgTag} />)
        })
      }
    } 
    
    else {
      this.setStateAsync({
        curMode: "",
      });
    }
  };

  applyChange = async () => {
    const _curHistIdx = this.state.historyIdx;
    if (_curHistIdx < this.state.imgHistory.length - 1) { //편집 기록을 재설정해준다.
      await this.setStateAsync({
        stageHistory: this.state.stageHistory.slice(0, _curHistIdx + 1),
        imgHistory: this.state.imgHistory.slice(0, _curHistIdx + 1),
      });
    }

    const _stage = this.state.stageRef.getStage();
    const _layer = this.state.layerRef.getLayer();
    const _ratio = this.state.stageHistory[_curHistIdx].ratio;
    const _dataURL = _layer.toDataURL({ pixelRatio: _ratio });
    const _img = Methods.imgUrlToTag(_dataURL);

    if (this.state.curMode === "crop") {
      const cropRect = _stage.find("#crop-rect")[0].attrs;
      const cropInfo = {
        x: cropRect.x,
        y: cropRect.y,
        width: cropRect.width * cropRect.scaleX,
        height: cropRect.height * cropRect.scaleY,
      };
      this.setStateAsync({
        allSegList: [],
        segLabels: [],
        segList: [],
        segCheckList: [],

        allFaceList: [],
        faceList: [],
        faceCheckList: [],

        filterHistory: this.state.filterHistory.concat([this.state.filterHistory[this.state.historyIdx]]),

        historyIdx: this.state.historyIdx + 1,
        stageHistory: this.state.stageHistory.concat(
          Methods.calcStage(cropInfo.width, cropInfo.height)
        ),
        imgHistory: this.state.imgHistory.concat(
          <Rect 
            key={this.state.historyIdx + 1} 
            id={String(this.state.historyIdx + 1)}
            width={cropInfo.width}
            height={cropInfo.height}
            fillPatternImage={_img}
            fillPatternOffset={{
              x: cropInfo.x,
              y: cropInfo.y,
            }}
          />
        ),
      })
    }

    else if(this.state.curMode === 'rotate') {
      // console.log("ROTATE")
      // console.log(this.state.historyIdx)
      // console.log(this.state.stageHistory)
      // console.log(this.state.imgHistory)

      this.setState({
        // _img가 rotation, x, y 값을 모두 가지고 있는 상태이므로
        imgHistory: this.state.imgHistory.slice(0, this.state.historyIdx)
          .concat(<Image id={String(this.state.historyIdx)} image={_img} rotation = {0} x={0} y={0}/>),

        allSegList: [],
        segLabels: [],
        segList: [],
        segCheckList: [],

        allFaceList: [],
        faceList: [],
        faceCheckList: [],
        
        filterHistory: this.state.filterHistory.concat([this.state.filterHistory[this.state.historyIdx - 1]]),
      })
      
    }

    // else if(this.state.curMode === 'segment'){ 
    // }

    // else if(this.state.curMode === 'face'){ 
    // }

    // else if(this.state.curMode === 'adjust'){
    // }

    this.setState({
      curMode: "",
      rotating: false,
      rotateCount: 0,
    })
  };

  refreshChange = () => { //설정 값 새로고침 함수
    if(this.state.curMode === 'filter' || this.state.curMode === 'adjust'){ 
      this.setStateAsync({
        filterHistory: update(this.state.filterHistory, {
          [this.state.historyIdx]: {
            blur: { $set: 0 },
            hue: { $set: 0 },
            saturation: { $set: 0 },
            luminance: { $set: 0 },
            contrast: { $set: 0 },
          },
        }),
      }).then(() => {
        // const layer = this.state.layerRef.getLayer();
        // const img = layer.find(`#${this.state.historyIdx}`)[0];
        // img.cache();
        // img.filters([
        //   Konva.Filters.Blur,
        //   Konva.Filters.HSL,
        //   Konva.Filters.Contrast,
        // ]);
        // img.blurRadius(0);
        // img.hue(0);
        // img.saturation(0);
        // img.luminance(0);
        // layer.batchDraw()
        AdjustMethods.InitDispAdjust(this.state.layerRef.getLayer(), this.state.historyIdx)
      })
    }

    else if(this.state.curMode === 'segment'){  
      this.setState({
        segCheckList: this.state.segCheckList.map((value) => value && false),
      });
    } 
    
    else if (this.state.curMode === "face") {
      this.setState({
        faceCheckList: this.state.faceCheckList.map((value) => value && false),
      });
    }
    
    // else if(this.state.curMode === 'rotate' && this.state.rotating !== false) {
    
    // }
  };

  cancelChange = () => {
    //취소 버튼, 모드를 초기화 시킨다.
    this.refreshChange();

    if (this.state.curMode === "rotate") {
      const curHistIdx = this.state.historyIdx

      // console.log(this.state.stageHistory)
      // console.log(this.state.imgHistory)
      // console.log(this.state.historyIdx)

      this.setStateAsync({//Async 제외

        historyIdx : curHistIdx - 1,
        stageHistory: this.state.stageHistory.slice(0, curHistIdx),
        imgHistory: this.state.imgHistory.slice(0, curHistIdx)

      })
      // .then(() => {
      //   console.log(this.state.stageHistory)
      //   console.log(this.state.imgHistory)
      //   console.log(this.state.historyIdx)
      //   console.log('CancelChange', this.state.stageHistory[_curHistIdx])
      // })
    }

    this.setState({
      curMode: '',
      rotateCount: 0,
      rotating: false,
    })
  };

  changeHistory = (e) => {
    //undo, redo 버튼 클릭시 편집된 <Image/> 태그 리스트를 왔다리 갔다리 해준다.
    const _id = e.currentTarget.id;
    if (_id === "undo" && this.state.historyIdx > 0) {
      this.setState({
        historyIdx: this.state.historyIdx - 1,
      });
    } else if (
      _id === "redo" &&
      this.state.historyIdx < this.state.imgHistory.length - 1
    ) {
      this.setState({
        historyIdx: this.state.historyIdx + 1,
      });
    }
  };

  checkSeg = (e) => {
    //객체 클릭시 화면에 보여주는 함수
    const _id = e.currentTarget.id;
    this.setState({
      segCheckList: this.state.segCheckList.map((value, i) => {
        if (i === Number(_id)) {
          return !value;
        } else {
          return value;
        }
      }),
    });
  };

  checkFace = (e) => {
    //얼굴 클릭시 화면에 보여주는 함수
    const _id = e.currentTarget.id;
    this.setStateAsync({
      faceCheckList: this.state.faceCheckList.map((value, i) => {
        if (i === Number(_id)) {
          return !value;
        } else {
          return value;
        }
      }),
    }).then(() => {
      BlurRect.updateBlur(
        this.state.stageRef.getStage(),
        this.state.layerRef.getLayer()
      );
    });
  };

  checkTag = (e) => {
    const _id = e.currentTarget.id;
    // console.log("tag id: ", _id)
    // e.currentTarget.style.color:
    const taglist = this.state.tagCheckList
    console.log(taglist)
    if(taglist[_id] == true) {
      console.log('contains')
      e.currentTarget.style.color="white"
    } else {
      console.log('not')
      e.currentTarget.style.color="#8989f5"
    }
    this.setState({
      tagCheckList: this.state.tagCheckList.map((value, i) => {
        if (i === Number(_id)) {
          return !value;
        } else {
          return value;
        }
      }),
    });
  }

  render() {
    return (
      <div
        className="app"
        style={{ width: window.innerWidth, height: window.innerHeight }}
      >
        <Storage.Provider value={this.state}>
          <Route exact path="/" component={MainPage} />
          <Route path="/Editor" component={EditorPage} />
        </Storage.Provider>
      </div>
    );
  }
}
export default withRouter(App);
