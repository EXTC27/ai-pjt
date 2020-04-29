import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Storage, StorageInit, URL } from "./components/Storage";
import MainPage from "./components/MainPage";
import EditorPage from "./components/EditorPage";
import * as Methods from "./components/Methods";
import * as CropRect from "./components/Settings/Crop/CropRect";
import * as BlurRect from "./components/Settings/Face/BlurRect";
import Konva from "konva";

import axios from "axios";
import Adjust from "./components/Settings/Adjust/Adjust";
import { Image, Rect, Circle } from "react-konva";
import update from "react-addons-update";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      innerW: window.innerWidth,
      innerH: window.innerHeight,

      imgFile: "",
      imgURL: "",
      img: null,
      imgWidth: 0,
      imgHeight: 0,
      // imgTag : [],
      imgHistory: [],
      imgUpload: this.imgUpload,

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
      rotateMode: "",
      rotating: false,
      changeRotateMode: this.changeRotateMode,
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
      cancelChange: this.cancelChange,

      curMode: "",
      changeMode: this.changeMode,

      historyIdx: 0,
      changeHistory: this.changeHistory,

      filterHistory: [
        {
          blur: 0,
          hue: 0,
          saturation: 0,
          luminance: 0,
        },
      ],

      changeAdjust: this.changeAdjust,
      changeFilter: this.changeFilter,
    };
  }

  changeFilter = async (hue, saturation, luminance, blur) => {
    console.log("값 :" + hue + "," + saturation + "," + luminance + "," + blur);
    const layer = this.state.layerRef.getLayer();
    const img = layer.find(`#${this.state.historyIdx}`)[0];
    img.cache();
    img.filters([Konva.Filters.Blur, Konva.Filters.HSL]);

    await this.setStateAsync({
      filterHistory: update(this.state.filterHistory, {
        [this.state.historyIdx]: {
          hue: { $set: hue },
          saturation: { $set: saturation },
          luminance: { $set: luminance },
          blur: { $set: blur },
        },
      }),
    });

    img.hue(hue);
    img.saturation(saturation);
    img.luminance(luminance);
    img.blurRadius(blur);
    layer.batchDraw();
  };

  changeAdjust = async (e) => {
    const value = e.currentTarget.value;
    const channel = e.currentTarget.id;

    const layer = this.state.layerRef.getLayer();
    const img = layer.find(`#${this.state.historyIdx}`)[0];
    img.cache();
    img.filters([Konva.Filters.Blur, Konva.Filters.HSL]);

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
    } else if (channel === "lum") {
      await this.setStateAsync({
        filterHistory: update(this.state.filterHistory, {
          [this.state.historyIdx]: {
            luminance: { $set: value },
          },
        }),
      });
      img.luminance(value);
    }
    const { hue, saturation, luminance, blur } = this.state.filterHistory[
      this.state.historyIdx
    ];
    console.log(hue + "," + saturation + "," + luminance + "," + blur);
    layer.batchDraw();
  };

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

  // imgUrlToTag = (_imgURL) => {
  //   const _img = new window.Image()
  //   _img.src = _imgURL
  //   return _img
  // }

  // calcStage = (imgW, imgH) => {
  //   const canvW = document.querySelector('#canvas-container').offsetWidth
  //   const canvH = document.querySelector('#canvas-container').offsetHeight

  //   if(imgW >= imgH) {
  //     const scale = canvW / imgW
  //     const ratio = imgW / canvW
  //     return {
  //       width: canvW,
  //       height: scale * imgH,
  //       scale: scale,
  //       ratio: ratio
  //     }
  //   }
  //   else {
  //     const scale = canvH / imgH
  //     const ratio = imgH / canvH
  //     return {
  //       width: scale * imgW,
  //       height: canvH,
  //       scale: scale,
  //       ratio: ratio
  //     }
  //   }
  // }

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
    const _confirm = e.currentTarget.id;

    if (this.state.curMode === "origin") {
      if (_confirm === "yes") {
        this.setState({
          curMode: "",
          imgHistory: [this.state.imgHistory[0]],
          stageHistory: [this.state.stageHistory[0]],

          historyIdx: 0,

          segCheckList: this.state.segCheckList.map(
            (value, i) => value && false
          ),

          allFaceList: [],
          faceList: [],
          faceCheckList: [],
          faceLocaList: [],
        });
      } else {
        this.setState({
          curMode: "",
        });
      }
    } else if (this.state.curMode === "backToMain") {
      if (_confirm === "yes") {
        this.backToMain();
      } else {
        this.setState({
          curMode: "",
        });
      }
    }
  };

  changeRotateMode = (e) => {
    const _rotateMode = e.currentTarget.id;
    let _rotateDegree = this.state.rotateDegree;

    const _curHistIdx = this.state.historyIdx;
    const _layer = this.state.layerRef.getLayer();
    //const _layer = React.createRef.getLayer()
    const _ratio = this.state.stageHistory[_curHistIdx].ratio;
    const _dataURL = _layer.toDataURL({ pixelRatio: _ratio });
    const _imgTag = this.imgUrlToTag(_dataURL);
    const _tempImgTag = _imgTag;

    if (_rotateMode === "right") {
      _rotateDegree = 90;
    } else {
      _rotateDegree = -90;
    }

    // const history = this.state.imgHistory[_curHistIdx]
    // console.log("IMG : ", history)
    // console.log("IMG : ", history.props.image)
    // // history.rotation(90)

    // const historyImg = new Konva.Image({
    //   image: history.props.image
    // })
    // historyImg.rotation(90)
    // historyImg.x(historyImg.height)

    _imgTag.onload = () => {
      const img = new Konva.Image({
        image: _imgTag,
      });
      img.rotation(_rotateDegree);

      // console.log("check: ", _imgTag.width, _imgTag.height, _imgTag.x, _imgTag.y)

      if (_rotateMode !== "right") {
        img.x(0);
        img.y(_imgTag.width);
      } else {
        img.x(_imgTag.height);
        img.y(0);
      }
      // console.log("ㅠㅠ", img)
      _layer.add(img);
      _layer.draw(img);

      if (this.state.rotating === false) {
        console.log("false");
        this.setStateAsync({
          rotating: true,
          tempStageHistory: this.state.stageHistory[_curHistIdx],
          tempImgHistory: _tempImgTag,
          beforeImg: {
            width: _imgTag.width,
            height: _imgTag.height,
          },
          temp_layer: _layer,
        }).then(() => {});
      }

      this.setStateAsync({
        //Async 제외
        stageHistory: this.state.stageHistory
          .slice(0, _curHistIdx)
          .concat(this.calcStage(_imgTag.height, _imgTag.width)),
        // imgHistory: this.state.imgHistory.slice(0, _curHistIdx)
        // // imgHistory: [<Image key={0} image={_img}/>]
        // .concat(<Image key = {_curHistIdx + 1} img={_imgTag} rotation = {90} x = {_imgTag.height}/>),
      }).then(() => {});
    };
  };

  changeMode = async (e) => {
    const _curMode = e.currentTarget.id;
    await this.setStateAsync({
      loading: true,
    });

    if (_curMode !== "") {
      await this.setStateAsync({
        curMode: _curMode,
      });

      /* 모드 변경시 작성란 */

      if (_curMode === "crop") {
        //자르기일 때, 크롭되는 사각형 영역을 생성한다.
        await this.setStateAsync({ loading: false });

        const _width = this.state.stageHistory[this.state.historyIdx].width;
        const _height = this.state.stageHistory[this.state.historyIdx].height;
        const _ratio = this.state.stageHistory[this.state.historyIdx].ratio;
        const _initVal = {
          x: (_width * _ratio) / 4,
          y: (_height * _ratio) / 4,
          width: (_width * _ratio) / 2,
          height: (_height * _ratio) / 2,
        };
        CropRect.createCropRect(this.state.stageRef, _initVal);
      } else if (_curMode === "tag") {
        const formData = new FormData();
        formData.append("images", this.state.imgFile);
        axios({
          method: "post",
          url: `${URL}/tags`,
          data: formData,
        })
          .then(
            function (response) {
              this.setState({
                loading: false,
                // imgTag : response.data.response
                tagList: response.data.response,
              });
            }.bind(this)
          )
          .catch(
            function (error) {
              this.setState({
                loading: false,
                // imgTag : ["태그를 가져오지 못했습니다. ㅠㅅㅠ"]
              });
            }.bind(this)
          );
      } else if (_curMode === "segment") {
        //원본 사진에서 객체를 뽑아내기 위해 서버쪽에 axios 요청을 보낸다.
        if (this.state.allSegList.length === 0) {
          //객체 리스트가 비어있으면 요청을 보낸다.
          try {
            const formData = new FormData();
            formData.append("images", this.state.imgFile);

            axios({
              method: "post",
              url: `${URL}/images`,
              // url: `http://13.124.235.166:5002/images`,
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
          } catch (err) {
            console.log("Axios Error", err);
            this.setState({
              loading: false,
            });
          }
        } else {
          this.setState({
            loading: false,
          });
        }
      } else if (_curMode === "face") {
        if (!this.state.allFaceList.length > 0) {
          //얼굴 리스트가 비어있으면
          try {
            const formData = new FormData();
            formData.append("images", this.state.imgFile);
            axios({
              method: "post",
              url: `${URL}/faces`,
              data: formData,
            }).then(
              function (response) {
                this.setStateAsync({
                  faceCheckList: response.data.response.map(() => true),
                  allFaceList: response.data.response.map((_base64, i) => {
                    const _style = Methods.calcFaceView().style;
                    return (
                      <div key={i} style={_style}>
                        <img
                          id={i}
                          src={`data:image/png;base64,${_base64.base64}`}
                          alt=""
                          width="100%"
                          height="100%"
                          onClick={this.checkFace}
                        />
                      </div>
                    );
                  }),
                  faceList: response.data.response.map((_base64, i) => {
                    return (
                      <Image
                        key={i}
                        id={`blur`}
                        x={_base64.x}
                        y={_base64.y}
                        width={_base64.width}
                        height={_base64.height}
                        image={Methods.imgUrlToTag(
                          `data:image/png;base64,${_base64.base64}`
                        )}
                        filters={[Konva.Filters.Blur]}
                        blurRadius={50}
                      />
                    );
                  }),
                  loading: false,
                }).then(() => {
                  BlurRect.updateBlur(
                    this.state.stageRef.getStage(),
                    this.state.layerRef.getLayer()
                  );
                });
              }.bind(this)
            );
          } catch (err) {
            console.log("Axios Error", err);
            this.setState({
              loading: false,
              // allFaceList : ["얼굴을 인식하지 못했습니다."],
            });
          }
        } else {
          this.setStateAsync({
            loading: false,
            faceCheckList: this.state.faceCheckList.map(() => true),
          }).then(
            BlurRect.updateBlur(
              this.state.stageRef.getStage(),
              this.state.layerRef.getLayer()
            )
          );
        }
      }

      // else if(_curMode === 'rotate'){
      //   const _curHistIdx = this.state.historyIdx
      //   const _layer = this.state.layerRef.getLayer()
      //   const _ratio = this.state.stageHistory[_curHistIdx].ratio
      //   const _dataURL = _layer.toDataURL({ pixelRatio: _ratio })
      //   const _imgTag = Methods.imgUrlToTag(_dataURL)

      //   _imgTag.onload = () => {
      //     const img = new Konva.Image({
      //       id: 'rotate',
      //       image: _imgTag,
      //     })
      //     img.rotate(90)
      //     img.x(_imgTag.height)
      //     img.y(0)

      //     _layer.add(img)
      //     _layer.draw()
      //     this.setState({
      //       stageHistory: this.state.stageHistory.slice(0, _curHistIdx)
      //       .concat(Methods.calcStage(_imgTag.height, _imgTag.width))
      //     })
      //   }
      // }
    } else {
      this.setStateAsync({
        curMode: "",
      });
    }
  };

  applyChange = async () => {
    const _curHistIdx = this.state.historyIdx;
    if (_curHistIdx < this.state.imgHistory.length - 1) {
      //편집 기록을 재설정해준다.
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

    console.log("curMode: ", this.state.curMode);

    if (this.state.curMode === "crop") {
      const cropRect = _stage.find("#crop-rect")[0].attrs;
      const cropInfo = {
        x: cropRect.x,
        y: cropRect.y,
        width: cropRect.width * cropRect.scaleX,
        height: cropRect.height * cropRect.scaleY,
      };
      this.setStateAsync({
        historyIdx: this.state.historyIdx + 1,
        stageHistory: this.state.stageHistory.concat(
          Methods.calcStage(cropInfo.width, cropInfo.height)
        ),
        imgHistory: this.state.imgHistory.concat(
          <Rect
            key={this.state.historyIdx + 1}
            id={this.state.historyIdx + 1}
            width={cropInfo.width}
            height={cropInfo.height}
            fillPatternImage={_img}
            fillPatternOffset={{
              x: cropInfo.x,
              y: cropInfo.y,
            }}
          />
        ),
      });
    } else if (this.state.curMode === "segment") {
    } else if (this.state.curMode === "face") {
    } else if (this.state.curMode === "rotate") {
      console.log("ROTATE");
      const curStage = this.state.stageHistory[_curHistIdx];
      const tempStage = this.state.tempStageHistory;
      const newStage = {
        width: curStage.width,
        height: curStage.height,
        scale: curStage.scale,
        ratio: curStage.ratio,
      };

      console.log(tempStage);
      console.log(newStage);

      // const img = new Konva.Image({
      //   image: this.state._tempImg,
      // })

      this.setStateAsync({
        stageHistory: this.state.stageHistory
          .slice(0, _curHistIdx)
          .concat(tempStage)
          .concat(newStage),
        // stageIdx: this.state.stageIdx + 1,
        imgHistory: this.state.imgHistory.concat(
          <Image image={this.state._tempImg} />
        ),
        historyIdx: this.state.historyIdx + 1,
        rotating: false,
      }).then(() => {
        console.log(this.state.stageIdx, this.state.historyIdx);
        console.log(
          "len: ",
          this.state.stageHistory.length,
          this.state.stageHistory[this.state.stageIdx]
        );
        console.log(
          "stageHistory: ",
          this.state.stageHistory[this.state.historyIdx]
        );
        console.log(
          "imgHistory: ",
          this.state.imgHistory.length,
          this.state.imgHistory[this.state.historyIdx]
        );
      });
    }

    console.log("applyChange: ");

    this.setState({
      curMode: "",
      rotating: false,
    });
  };

  cancelChange = () => {
    //취소 버튼, 모드를 초기화 시킨다.

    if (this.state.curMode === "segment") {
      this.setState({
        segCheckList: this.state.segCheckList.map((value) => value && false),
      });
    } else if (this.state.curMode === "face") {
      this.setState({
        faceCheckList: this.state.faceCheckList.map((value) => value && false),
      });
    } else if (this.state.curMode === "rotate") {
      const _curHistIdx = this.state.historyIdx;
      // console.log('cancel/ ', this.state.beforeImg)

      const _tempImg = this.state.tempImgHistory;
      const _layer = this.state.layerRef.getLayer();

      const img = new Konva.Image({
        image: _tempImg,
      });
      img.x(0);
      img.y(0);

      // _layer.c
      _layer.add(img);
      _layer.draw(img);

      console.log("CancelChange", this.state.stageHistory[_curHistIdx]);
      this.setStateAsync({
        //Async 제외
        stageHistory: this.state.stageHistory
          .slice(0, _curHistIdx)
          .concat(
            Methods.calcStage(
              this.state.beforeImg.width,
              this.state.beforeImg.height
            )
          ),
      }).then(() => {
        // console.log('CancelChange', this.state.stageHistory[_curHistIdx])
      });
    }

    this.setState({
      curMode: "",
    });
  };

  changeHistory = (e) => {
    //undo, redo 버튼 클릭시 편집된 <Image/> 태그 리스트를 왔다리 갔다리 해준다.
    const _id = e.currentTarget.id;
    if (_id === "undo" && this.state.historyIdx > 0) {
      this.setState({
        historyIdx: this.state.historyIdx - 1,
        // imgHistory: this.state.imgHistory.slice(0, this.state.historyIdx),
        // stageHistory: this.state.stageHistory.slice(0, this.state.historyIdx)
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
