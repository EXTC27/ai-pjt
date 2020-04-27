import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Storage, StorageInit } from './components/Storage';
import MainPage from './components/MainPage';
import EditorPage from './components/EditorPage';
import * as CropRect from './components/Settings/Crop/CropRect';
import axios from 'axios';
import { Image, Rect } from 'react-konva';
import Konva from 'konva';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import FilterTypeMenu from './components/Menus/FilterTypeMenu';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innerW: window.innerWidth,
      innerH: window.innerHeight,

      imgFile: '',
      imgURL: '',
      img: null,
      imgWidth: 0,
      imgHeight: 0,
      // imgList: [],
      imgHistory: [],
      imgUpload: this.imgUpload,
      // imgInit: this.imgInit,

      allSegList: [],
      segList: [],
      segCheckList: [],

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

      confirm: this.confirm,
      backToMain: this.backToMain,

      applyChange: this.applyChange,
      cancelChange: this.cancelChange,

      curMode: '',
      changeMode: this.changeMode,

      historyIdx: 0,
      changeHistory: this.changeHistory,

      fiterType: '',
      changefilterType: this.changefilterType,

      blurVal: 0,
      blurRef: React.createRef(),
      changeBlur: this.changeBlur,
      touchFlag: false,
      touchStart: this.touchStart,
      touchEnd: this.touchEnd,

      brightenVal: 0,
      brightenRef: React.createRef(),
      changeBrighten: this.changeBrighten,

      contrastVal: 0,
      contrastRef: React.createRef(),
      changeContrast: this.changeContrast,

      hue: 150,
      saturation: 0,
      value: 0,
      adjustRef: React.createRef(),
      changeAdjust: this.changeAdjust,
      onChangeHue: this.onChangeHue,
      onChangeSaturation: this.onChangeSaturation,
      onChangeValue: this.onChangeValue,

      embossRef: React.createRef(),
      embossOption: 'top',
      embossBlend: true,
      embossStrength: 0.5,
      embossWhiteLevel: 0.5,
      onChangeOption: this.onChangeOption,
      onChangeBlend: this.onChangeBlend,
      onChangeStrength: this.onChangeStrength,
      onChangeWhiteLevel: this.onChangeWhiteLevel,
      onChangeEmboss: this.onChangeEmboss,

      enhanceVal: 0,
      enhanceRef: React.createRef(),
      changeEnhance: this.changeEnhance,

      grayscaleRef: React.createRef(),
      changeGrayscale: this.changeGrayscale,
    };
  }

  onChangeOption = async (m) => {
    await this.setState({
      embossOption: m,
    });
  };
  onChangeBlend = async (m) => {
    await this.setState({
      embossBlend: m,
    });
  };
  onChangeStrength = async (m) => {
    await this.setState({
      embossStrength: m,
    });
  };
  onChangeWhiteLevel = async (m) => {
    await this.setState({
      embossWhiteLevel: m,
    });
  };

  onChangeEmboss = async () => {
    if (!this.state.touchFlag) {
      const stage = this.state.stageRef.getStage();

      const embossLayer = stage.find('#edit-layer');
      const embossimg = stage.find('#emboss-img')[0];
      embossimg.cache();
      embossimg['embossStrength'](this.state.embossStrength);
      embossimg['embossWhiteLevel'](this.state.embossWhiteLevel);
      embossimg['embossDirection'](this.state.embossDirection);
      embossimg.filters([Konva.Filters.Emboss]);
      embossLayer.batchDraw();
    }
  };

  onChangeHue = async (m) => {
    if (!this.state.touchFlag) {
      this.setState({
        hue: m,
      });
    }
    this.changeAdjust();
  };
  onChangeSaturation = async (m) => {
    if (!this.state.touchFlag) {
      this.setState({
        saturation: m,
      });
    }
    this.changeAdjust();
  };
  onChangeValue = async (m) => {
    if (!this.state.touchFlag) {
      await this.setState({
        value: m,
      });
    }
    this.changeAdjust();
  };
  changeAdjust = () => {
    const stage = this.state.stageRef.getStage();
    const adjustLayer = stage.find('#edit-layer');
    const adjustimg = stage.find('#adjust-img')[0];
    adjustimg.cache();

    console.log(
      '덮어 씌울 hue,saturation,value:' +
        this.state.hue +
        ',' +
        this.state.saturation +
        ',' +
        this.state.value
    );
    adjustimg.filters([Konva.Filters.HSV]);
    adjustimg[`hue`](this.state.hue);
    adjustimg[`saturation`](this.state.saturation);
    adjustimg[`value`](this.state.value);
    adjustLayer.batchDraw();
    //console.log(adjustimg);
  };

  changeBrighten = async (e, value) => {
    if (!this.state.touchFlag) {
      await this.setStateAsync({
        brightenVal: value,
      });
      const stage = this.state.stageRef.getStage();

      const brightenLayer = stage.find('#edit-layer');
      const brightenimg = stage.find('#brighten-img')[0];
      brightenimg.cache();
      brightenimg.filters([Konva.Filters.Brighten]);
      brightenimg.brightness(value);
      brightenLayer.batchDraw();
    }
  };

  changeEnhance = async (e, value) => {
    if (!this.state.touchFlag) {
      await this.setStateAsync({
        enhanceVal: value,
      });
      const stage = this.state.stageRef.getStage();
      const enhanceLayer = stage.find('#edit-layer');
      const enhanceimg = stage.find('#enhance-img')[0];
      enhanceimg.cache();
      enhanceimg.filters([Konva.Filters.Enhance]);
      enhanceimg.enhance(value);
      enhanceLayer.batchDraw();
    }
  };
  changeContrast = async (e, value) => {
    if (!this.state.touchFlag) {
      await this.setStateAsync({
        contrastVal: value,
      });
      const stage = this.state.stageRef.getStage();
      const contrastLayer = stage.find('#edit-layer');
      const contrastimg = stage.find('#contrast-img')[0];
      contrastimg.cache();
      contrastimg.filters([Konva.Filters.Contrast]);
      contrastimg[`contrast`](value);
      contrastLayer.batchDraw();
    }
  };
  changeGrayscale = async () => {
    const stage = this.state.stageRef.getStage();
    const grayscaleLayer = stage.find('#edit-layer');
    const grayscaleimg = stage.find('#grayscale-img')[0];
    grayscaleimg.cache();
    grayscaleimg.filters([Konva.Filters.Grayscale]);
    grayscaleLayer.batchDraw();
  };
  changeBlur = async (e, value) => {
    if (!this.state.touchFlag) {
      await this.setStateAsync({
        blurVal: value,
      });
      const stage = this.state.stageRef.getStage();
      const blurLayer = stage.find('#edit-layer');
      const blurimg = stage.find('#blur-img')[0];
      blurimg.cache();
      blurimg.filters([Konva.Filters.Blur]);
      blurimg.blurRadius(value);
      blurLayer.batchDraw();
    }
  };

  //setState 비동기 때문에 열받아서 만든 함수
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
  ////////////////////////////////

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

  imgUrlToTag = (_imgURL) => {
    const _img = new window.Image();
    _img.src = _imgURL;
    return _img;
  };

  stageInit = () => {
    // const _img = new window.Image();
    // _img.src = this.state.imgURL;
    const _img = this.imgUrlToTag(this.state.imgURL);
    _img.onload = () => {
      this.setStateAsync({
        img: _img,
        imgWidth: _img.width,
        imgHeight: _img.height,
      })
        .then(() => {
          const _cont = document.querySelector('#canvas-container');
          if (this.state.imgWidth > this.state.imgHeight) {
            const _contW = _cont.offsetWidth;
            const _scale = _contW / this.state.imgWidth;
            const _ratio = this.state.imgWidth / _contW;
            this.setState({
              stageHistory: [
                {
                  width: _contW,
                  height: _scale * this.state.imgHeight,
                  scale: _scale,
                  ratio: _ratio,
                },
              ],
            });
          } else {
            const _contH = _cont.offsetHeight;
            const _scale = _contH / this.state.imgHeight;
            const _ratio = this.state.imgHeight / _contH;
            this.setState({
              stageHistory: [
                {
                  width: _scale * this.state.imgWidth,
                  height: _contH,
                  scale: _scale,
                  ratio: _ratio,
                },
              ],
            });
          }
        })
        .then(() => {
          // this.imgInit(this.state.img)
          this.setState({
            imgHistory: [<Image key={0} image={_img} />],
          });
        });
    };
  };

  stageUpdate = (imgWidth, imgHeight) => {
    const _cont = document.querySelector('#canvas-container');
    if (imgWidth > imgHeight) {
      const _contW = _cont.offsetWidth;
      const _scale = _contW / imgWidth;
      const _ratio = imgWidth / _contW;
      this.setState({
        stageHistory: this.state.stageHistory.concat({
          width: _contW,
          height: _scale * imgHeight,
          scale: _scale,
          ratio: _ratio,
        }),
      });
    } else {
      const _contH = _cont.offsetHeight;
      const _scale = _contH / imgHeight;
      const _ratio = imgHeight / _contH;
      this.setState({
        stageHistory: this.state.stageHistory.concat({
          width: _scale * imgWidth,
          height: _contH,
          scale: _scale,
          ratio: _ratio,
        }),
      });
    }
  };

  backToMain = () => {
    this.setState(StorageInit);
    this.props.history.push('/');
  };

  confirm = (e) => {
    const _confirm = e.currentTarget.id;

    if (this.state.curMode === 'origin') {
      if (_confirm === 'yes') {
        this.setState({
          curMode: '',
          imgHistory: [this.state.imgHistory[0]],
          stageHistory: [this.state.stageHistory[0]],

          historyIdx: 0,

          allSegList: [],
          segList: [],
          segCheckList: [],
        });
      } else {
        this.setState({
          curMode: '',
        });
      }
    } else if (this.state.curMode === 'backToMain') {
      if (_confirm === 'yes') {
        this.backToMain();
      } else {
        this.setState({
          curMode: '',
        });
      }
    }
  };

  changefilterType = async (e) => {
    const _filterType = e.currentTarget.id;
    //console.log(_filterType);
    if (_filterType !== '') {
      await this.setStateAsync({
        filterType: _filterType,
      });
      const stage = this.state.stageRef.getStage();
      const filterLayer = stage.find('#edit-layer');

      if (_filterType === 'blur') {
        const blurimg = new Konva.Image({
          id: 'blur-img',
          image: this.state.img,
          blurRadius: this.state.blurVal,
        });
        filterLayer.add(blurimg);
      } else if (_filterType === 'brighten') {
        const brightenimg = new Konva.Image({
          id: 'brighten-img',
          image: this.state.img,
          brighteness: this.state.brightenVal,
        });
        filterLayer.add(brightenimg);
      } else if (_filterType === 'contrast') {
        const contrastimg = new Konva.Image({
          id: 'contrast-img',
          image: this.state.img,
          contrast: this.state.contrastVal,
        });
        filterLayer.add(contrastimg);
      } else if (_filterType === 'emboss') {
        const embossimg = new Konva.Image({
          id: 'embossimg-img',
          image: this.state.img,
        });
        filterLayer.add(embossimg);
      } else if (_filterType === 'enhance') {
        const enhanceimg = new Konva.Image({
          id: 'enhance-img',
          image: this.state.img,
        });
        filterLayer.add(enhanceimg);
      } else if (_filterType === 'grayscale') {
        const grayscaleimg = new Konva.Image({
          id: 'grayscale-img',
          image: this.state.img,
        });
        filterLayer.add(grayscaleimg);
        this.changeGrayscale();
      }
    }
  };

  changeMode = async (e) => {
    const _curMode = e.currentTarget.id;

    if (_curMode !== '') {
      await this.setStateAsync({
        curMode: _curMode,
      });

      ///////////////////////////////////////////// 모드 변경시 작성란
      if (_curMode === 'crop') {
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
      } else if (_curMode === 'segment') {
        try {
          const formData = new FormData();
          formData.append('file', this.state.imgFile);

          await axios({
            // method: 'post',
            // url: '',
            // data: formData,
            // headers: { 'content-Type': 'multipart/form-data' }
            method: 'get',
            url: 'https://picsum.photos/v2/list?page=1&limit=10',
            responseType: JSON,
          }).then((res) => {
            const resData = res.data;
            // console.log(JSON.stringify(resData, null, 2))
            this.setStateAsync({
              segCheckList: resData.map((i) => false),
            })
              .then(() => {
                this.setState({
                  allSegList: resData.map((_obj, i) => {
                    return (
                      <div key={_obj.id} style={{ margin: '10px' }}>
                        <img
                          id={i}
                          src={_obj.download_url}
                          width={80}
                          height={80}
                          alt=""
                          onClick={this.checkSeg}
                        />
                      </div>
                    );
                  }),
                });
              })
              .then(
                this.setState({
                  segList: resData.map((_obj, i) => {
                    return (
                      <Image
                        key={i}
                        image={this.imgUrlToTag(_obj.download_url)}
                        x={i * 300}
                        y={i * 300}
                        width={300}
                        height={300}
                      />
                    );
                  }),
                })
              );
          });
        } catch (err) {
          console.log(err);
        }
      } else if (_curMode === 'adjust') {
        const stage = this.state.stageRef.getStage();
        const adjustLayer = stage.find('#edit-layer');
        var img = new Konva.Image({
          id: 'adjust-img',
          image: this.state.img,
          hue: this.state.hue,
          saturation: this.state.saturation,
          value: this.state.value,
        });
        adjustLayer.add(img);
      } else if (_curMode === 'filter') {
        return <FilterTypeMenu />;
      }
    } else {
      this.setStateAsync({
        curMode: '',
      });
    }
  };

  applyChange = async () => {
    this.setState({
      curMode: '',
    });

    const _curHistIdx = this.state.historyIdx;
    if (_curHistIdx < this.state.imgHistory.length - 1) {
      console.log(this.state.stageHistory.slice(0, _curHistIdx + 1));
      await this.setStateAsync({
        stageHistory: this.state.stageHistory.slice(0, _curHistIdx + 1),
        imgHistory: this.state.imgHistory.slice(0, _curHistIdx + 1),
      });
    }

    const _stage = this.state.stageRef.getStage();
    const _layer = this.state.layerRef.getLayer();
    const _ratio = this.state.stageHistory[_curHistIdx].ratio;
    const _dataURL = _layer.toDataURL({ pixelRatio: Math.round(_ratio) });
    // const _img = new window.Image()
    // _img.src = _dataURL

    const _img = this.imgUrlToTag(_dataURL);

    if (this.state.curMode === 'crop') {
      const cropRect = _stage.find('#crop-rect')[0].attrs;
      const cropInfo = {
        x: cropRect.x,
        y: cropRect.y,
        width: cropRect.width * cropRect.scaleX,
        height: cropRect.height * cropRect.scaleY,
      };
      // console.log(cropInfo)
      this.stageUpdate(cropInfo.width, cropInfo.height);
      this.setStateAsync({
        imgHistory: this.state.imgHistory.concat(
          <Rect
            key={this.state.historyIdx + 1}
            width={cropInfo.width}
            height={cropInfo.height}
            fillPatternImage={_img}
            fillPatternOffset={{
              x: cropInfo.x,
              y: cropInfo.y,
            }}
          />
        ),
      }).then(
        this.setState({
          historyIdx: this.state.historyIdx + 1,
          // curMode: '',
        })
      );
    } else if (this.state.curMode === 'segment') {
      //얘는 적용했을 때 새로고침 시킬거임
      this.setState({});
    } else if (this.state.curMode === 'adjust') {
      const newHue = this.state.hue;
      const newSaturation = this.state.saturation;
      const newValue = this.state.value;

      this.setState({
        hue: newHue,
        saturation: newSaturation,
        value: newValue,
      });
    }
  };

  cancelChange = () => {
    this.setState({
      curMode: '',
    });
  };

  changeHistory = (e) => {
    const _id = e.currentTarget.id;
    if (_id === 'undo' && this.state.historyIdx > 0) {
      this.setState({
        historyIdx: this.state.historyIdx - 1,
      });
    } else if (
      _id === 'redo' &&
      this.state.historyIdx < this.state.imgHistory.length - 1
    ) {
      this.setState({
        historyIdx: this.state.historyIdx + 1,
      });
    }
  };

  checkSeg = (e) => {
    const _id = e.currentTarget.id;

    console.log(_id);
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

  render() {
    return (
      <div className="app">
        <Storage.Provider value={this.state}>
          <Route exact path="/" component={MainPage} />
          <Route path="/Editor" component={EditorPage} />
        </Storage.Provider>
      </div>
    );
  }
}

export default withRouter(App);
