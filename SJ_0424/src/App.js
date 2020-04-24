import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Storage} from './components/Storage'
import MainPage from './components/MainPage'
import EditorPage from './components/EditorPage'
import * as CropRect from './components/Settings/Crop/CropRect'
import Konva from 'konva'
import {Layer, Image, Rect} from "react-konva";
import { Crop } from '@material-ui/icons';

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
      imgOrg: null,
      imgList: [], 
      imgHistory: [],
      historyIdx: 0,
      imgUpload: this.imgUpload,
      imgInit: this.imgInit,

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
      stageInit: this.stageInit,

      confirm: this.confirm,
      backToMain: this.backToMain,

      applyChange: this.applyChange,
      cancelChange: this.cancelChange,

      curMode: '',
      changeMode: this.changeMode,
    }
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  imgUpload = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let _imgFile = e.target.files[0];
    reader.onloadend = () => {      
      this.setState({
        imgFile: _imgFile,
        imgURL: reader.result,
      });
      this.props.history.push('Editor')
    }
    reader.readAsDataURL(_imgFile)
  }

  stageInit = () => {
    const _img = new window.Image();
    _img.src = this.state.imgURL;
    _img.onload = () => {
      this.setStateAsync({
        img: _img,
        imgWidth: _img.width,
        imgHeight: _img.height,
      })
      .then(()=>{
        const _cont = document.querySelector('#canvas-container')
        console.log(_cont.offsetHeight)
        if(this.state.imgWidth > this.state.imgHeight){
          const _contW = _cont.offsetWidth
          const _scale = _contW / this.state.imgWidth
          const _ratio = this.state.imgWidth / _contW
          this.setState({
            stageHistory: [
              {
                width: _contW,
                height: _scale * this.state.imgHeight,
                scale: _scale,
                ratio: _ratio,
              }
            ]
          })
        }
        else{
          const _contH = _cont.offsetHeight
          const _scale = _contH / this.state.imgHeight
          const _ratio = this.state.imgHeight / _contH
          this.setState({
            stageHistory: [
              {
                width: _scale * this.state.imgWidth,
                height: _contH,
                scale: _scale,
                ratio: _ratio,
              }
            ]
          })
        }
      })
      .then(()=>{
        this.imgInit(this.state.img)
      })
    }
  }

  stageUdate = (rectWidth, rectHeight) => {
    const _cont = document.querySelector('#canvas-container')
    console.log(_cont.offsetHeight)
    if(rectWidth > rectHeight){
      const _contW = _cont.offsetWidth
      const _scale = _contW /rectWidth
      const _ratio = rectWidth / _contW
      this.setState({
        stageHistory: this.state.stageHistory.concat(
          {
            width: _contW,
            height: _scale * rectHeight,
            scale: _scale,
            ratio: _ratio,
          }
        )
      })
    }
    else{
      const _contH = _cont.offsetHeight
      const _scale = _contH / rectHeight
      const _ratio = rectHeight / _contH
      this.setState({
        stageHistory: this.state.stageHistory.concat(
          {
            width: _scale * rectWidth,
            height: _contH,
            scale: _scale,
            ratio: _ratio,
          }
        )
      })
    }
  }

  imgInit = (_img) => {
    this.setState({
      imgHistory: [
        <Image key={0} image={_img}/>
      ]
    })
  }

  backToMain = () => {
    this.setState({
      imgFile: '',
      imgURL: '',
      img: null,
      imgWidth: 0,
      imgHeight: 0,
      imgOrg: null,
      imgList: [], 
      imgHistory: [],
      historyIdx: 0,
      stageWidth: 0,
      stageHeight: 0,
      scale: 0,
      ratio: 0,
      curMode: '',
    })    
    this.props.history.push('/')
  }

  confirm = (e) => {
    const _confirm = e.currentTarget.id

    if(this.state.curMode === 'origin'){
      if(_confirm === 'yes'){
        this.setState({
          curMode: '',
          imgHistory: [this.state.imgHistory[0]],
          historyIdx: 0,
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

  changeMode = (e) => {
    const _curMode = e.currentTarget.id

    if(_curMode !== ''){
      this.setStateAsync({
        curMode: _curMode
      })
      .then(() => {
        if(_curMode === 'crop'){
          const _width = this.state.imgWidth
          const _height = this.state.imgHeight
          // const _scale = this.state.scale
          const _initVal = {
            x: (_width) / 4,
            y: (_height) / 4,
            width: _width / 2,
            height: _height / 2,
            // scale: this.state.scale,
          }
          CropRect.createCropRect(this.state.stageRef, _initVal)
        }
      })
      
    }
    else{
      this.setStateAsync({
        curMode: ''
      })
    }
  }

  applyChange = () => {
    if(this.state.curMode === 'crop'){
      const stage = this.state.stageRef.getStage()
      const cropRect = stage.find('#crop-rect')[0].attrs
      const cropInfo = {
        x: cropRect.x,
        y: cropRect.y,
        width: cropRect.width * cropRect.scaleX,
        height: cropRect.height * cropRect.scaleY,
      }
      
      // console.log(cropRect)
      console.log(cropInfo)

      this.stageUdate(cropInfo.width, cropInfo.height)
      this.setStateAsync({
      })
      .then(
        this.setState({
          imgHistory: this.state.imgHistory.concat(
            <Image 
              key={this.state.historyIdx + 1} 
              image={this.state.img} 
              crop={cropInfo}
            />
          )
        })
      )
      .then(
        this.setState({
          historyIdx: this.state.historyIdx + 1
        })
      )

    }
    this.setState({
      curMode:''
    })


  }
  cancelChange = () => {
    if(this.state.curMode === 'crop'){
      this.setState({

      })
    }

    this.setState({
      curMode: '',
    })
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