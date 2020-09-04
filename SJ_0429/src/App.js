import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Storage, StorageInit} from './components/Storage'
import MainPage from './components/MainPage'
import EditorPage from './components/EditorPage'
import * as CropRect from './components/Settings/Crop/CropRect'
import axios from 'axios'
import {Image, Rect} from "react-konva";
import Konva from 'konva'
import { LabelTwoTone, TurnedIn } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      innerW: window.innerWidth,
      innerH: window.innerHeight,
      
      imgFile: '',
      imgURL: '',
      img: null,
      imgWidth: 0,
      imgHeight: 0,

      imgHistory: [],
      imgUpload: this.imgUpload,

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
        }
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

      adjustVal: 0,
      adjust: null,
      adjustRef: React.createRef(),
      changeAdjust: this.changeAdjust,
    }
  }

  //setState 비동기 때문에 열받아서 만든 함수
  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  imgUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const _imgFile = e.target.files[0];
    reader.readAsDataURL(_imgFile)
    reader.onloadend = () => {      
      this.setStateAsync({
        imgFile: _imgFile,
        imgURL: reader.result,
      })
      .then(
        this.stageInit()
      )
      .then(
        this.props.history.push(`Editor`)
      )
    }
  }

  imgUrlToTag = (_imgURL) => {
    const _img = new window.Image()
    _img.src = _imgURL
    return _img
  }

  calcStage = (imgW, imgH) => {
    const canvW = document.querySelector('#canvas-container').offsetWidth
    const canvH = document.querySelector('#canvas-container').offsetHeight

    if(imgW >= imgH) {
      const scale = canvW / imgW
      const ratio = imgW / canvW
      return {
        width: canvW,
        height: scale * imgH,
        scale: scale,
        ratio: ratio
      }
    }
    else {
      const scale = canvH / imgH
      const ratio = imgH / canvH
      return {
        width: scale * imgW,
        height: canvH,
        scale: scale,
        ratio: ratio
      }
    }
  }

  stageInit = () => {
    const _img = this.imgUrlToTag(this.state.imgURL)
    _img.onload = () => {
      this.setStateAsync({
        img: _img,
        // imgWidth: _img.width,
        // imgHeight: _img.height,
      })
      .then(()=>{
        this.setState({
          stageHistory: [this.calcStage(_img.width, _img.height)]
        })
      })
      .then(() => {
        this.setState({
          imgHistory: [<Image key={0} image={_img}/>]
        })
      })
    }
  }

  backToMain = () => {
    this.setState(StorageInit)
    this.props.history.push('/')
  }

  confirm = (e) => {
    const _confirm = e.currentTarget.id

    if(this.state.curMode === 'origin'){
      if(_confirm === 'yes'){
        this.setState({
          curMode: '',
          imgHistory: [this.state.imgHistory[0]],
          stageHistory: [this.state.stageHistory[0]],

          historyIdx: 0,

          allSegList: [],
          segList: [],
          segCheckList: [],
        })
      }
      else{
        this.setState({
          curMode: ''
        })
      }
    }

    else if(this.state.curMode === 'backToMain'){
      if(_confirm === 'yes'){
        this.backToMain()
      }
      else{
        this.setState({
          curMode: ''
        })
      }
    }
  }

  changeMode = async (e) => {
    const _curMode = e.currentTarget.id

    if(_curMode !== ''){
      await this.setStateAsync({
        curMode: _curMode
      })
      
      ///////////////////////////////////////////// 모드 변경시 작성란
      if(_curMode === 'crop'){
        const _width = this.state.stageHistory[this.state.historyIdx].width
        const _height = this.state.stageHistory[this.state.historyIdx].height
        const _ratio = this.state.stageHistory[this.state.historyIdx].ratio
        const _initVal = {
          x: (_width * _ratio) / 4,
          y: (_height * _ratio) / 4,
          width: (_width * _ratio) / 2,
          height: (_height * _ratio) / 2,
        }
        CropRect.createCropRect(this.state.stageRef, _initVal)
      }

      else if(_curMode === 'segment'){
        if(!this.state.allSegList.length > 0){
          try{
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
            })
            .then((res) => {
              const resData = res.data;
              // console.log(JSON.stringify(resData, null, 2))
              this.setStateAsync({
                segCheckList: resData.map((i) => false)
              })
              .then(() => {
                this.setState({
                  allSegList: resData.map((_obj, i) => { return(
                    <div key={_obj.id} style={{'margin':'10px'}}>
                      <img id={i} src={_obj.download_url} width={80} height={80} alt='' onClick={this.checkSeg}/>
                    </div>
                  )}),
                })

              })
              .then(
                this.setState({
                  segList: resData.map((_obj, i) => { 
                    return(
                      <Image key={i} image={this.imgUrlToTag(_obj.download_url)} 
                        x={i*300}
                        y={i*300}
                        width={300} 
                        height={300}
                      />
                  )})
                })
              )
            })
            // .then((res) => {
            //   const resData = res.data;
            //   this.setState({
            //     allSegList: this.state.allSegList.concat(resData.map((_obj, i) => { return(
            //       <Image key={i} image={this.imgUrlToTag(_obj)}/>
            //     )}))
            //   })
            // })
          }
          catch(err){ console.log(err) }
        }
      }

      else if(_curMode === 'adjust'){
        // this.state.adjustRef.cache()
        // const _width = this.state.stageHistory[this.state.historyIdx].width
        // const _height = this.state.stageHistory[this.state.historyIdx].height
        // const _ratio = this.state.stageHistory[this.state.historyIdx].ratio

        const stage = this.state.stageRef.getStage();
        const adjustLayer = stage.find('#edit-layer');

        const rect = new Konva.Image({
          id: 'adjust-rect',
          image: this.state.img,
          blurRadius: 0,
        })
        adjustLayer.add(rect);
      }

      /////////////////////////////////////////////
      
    }
    else{
      this.setStateAsync({
        curMode: ''
      })
    }
  }

  applyChange = async () => {
    const _curHistIdx = this.state.historyIdx
    if(_curHistIdx < this.state.imgHistory.length - 1){
      await this.setStateAsync({
        stageHistory: this.state.stageHistory.slice(0, _curHistIdx + 1),
        imgHistory: this.state.imgHistory.slice(0, _curHistIdx + 1)
      })
    }

    const _stage = this.state.stageRef.getStage()
    const _layer = this.state.layerRef.getLayer()    
    const _ratio = this.state.stageHistory[_curHistIdx].ratio
    const _dataURL = _layer.toDataURL({ pixelRatio: _ratio })
    const _img = this.imgUrlToTag(_dataURL)

    if(this.state.curMode === 'crop'){

      const cropRect = _stage.find('#crop-rect')[0].attrs
      const cropInfo = {
        x: cropRect.x,
        y: cropRect.y,
        width: cropRect.width * cropRect.scaleX,
        height: cropRect.height * cropRect.scaleY,
      }
      this.setStateAsync({
        stageHistory: this.state.stageHistory.concat(this.calcStage(cropInfo.width, cropInfo.height)),
        imgHistory: this.state.imgHistory.concat(
          <Rect 
            key={this.state.historyIdx + 1} 
            width={cropInfo.width}
            height={cropInfo.height}
            fillPatternImage={_img}
            fillPatternOffset={{
              x:cropInfo.x,
              y:cropInfo.y
            }}
          />
        )
      })
      .then(
        this.setState({
          historyIdx: this.state.historyIdx + 1,
          curMode:''
        })
      )
      
    }

    else if(this.state.curMode === 'segment'){ //얘는 적용했을 때 새로고침 시킬거임
      this.setState({

      })
    }
  }

  cancelChange = () => {
    this.setState({
      curMode: '',
    })
  }

  changeHistory = (e) => {
    const _id = e.currentTarget.id
    if(_id === 'undo' && this.state.historyIdx > 0){
      this.setState({
        historyIdx: this.state.historyIdx - 1
      })
    }
    else if(_id === 'redo' && this.state.historyIdx < this.state.imgHistory.length - 1) {
      this.setState({
        historyIdx: this.state.historyIdx + 1
      })
    }
  }

  checkSeg = (e) => {
    const _id = e.currentTarget.id
    
    console.log(_id)
    this.setState({
      segCheckList: this.state.segCheckList.map((value, i) => {
        if(i === Number(_id)){
          return !value
        }        
        else {
          return value
        }
      })
    })
  }

  changeAdjust = (e, value) => {
    // await this.setStateAsync({
    //   adjustVal: value
    // })
    const stage = this.state.stageRef.getStage();
    const adjLayer = stage.find('#edit-layer');
    const adjRect = adjLayer.find('#adjust-rect')[0];
    adjRect.cache()
    adjRect.filters([Konva.Filters.Blur]);
    adjRect.blurRadius(value);
    adjLayer.draw()
    
  }

  render(){
    return(
      <div className="app">
        <Storage.Provider value={this.state}>
          <Route exact path="/" component={MainPage} />
          <Route path="/Editor" component={EditorPage} />
        </Storage.Provider>
      </div>
    )
  }
} export default withRouter(App);