import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Storage} from './components/Storage'
import MainPage from './components/MainPage'
import EditorPage from './components/EditorPage'
import * as CropRect from './components/Settings/Crop/CropRect'
import Konva from 'konva'
import {Image, Rect} from "react-konva";
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
      imgUpload: this.imgUpload,
      imgInit: this.imgInit,

      layerRef: React.createRef(),

      stageRef: React.createRef(),
      stageWidth: 0,
      stageHeight: 0,
      stageScale: 0,
      ratio: 0,
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

        if(this.state.imgWidth > this.state.imgHeight){
          const _contW = _cont.offsetWidth
          const _scale = _contW / this.state.imgWidth
          const _ratio = this.state.imgWidth / _contW
          this.setState({
            stageWidth: _contW,
            stageHeight: _scale * this.state.imgHeight,
            stageScale: _scale,
            ratio: _ratio,
          })
        }
        else{
          const _contH = _cont.offsetHeight
          const _scale = _contH / this.state.imgHeight
          const _ratio = this.state.imgHeight / _contH
          this.setState({
            stageWidth: _scale * this.state.imgWidth,
            stageHeight: _contH,
            stageScale: _scale,
            ratio: _ratio,
          })
        }
      })
      .then(()=>{
        this.imgInit(this.state.img)
      })
    }
  }

  imgInit = (_img) => {
    this.setState({
      imgOrg: <Image key={0} id="origin-img" image={_img}/>,
      imgList: [<Image key={0} id="origin-img" image={_img}/>]
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
      stageWidth: 0,
      stageHeight: 0,
      stageScale: 0,
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
          imgList: [this.state.imgOrg],
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
          const _width = this.state.imgWidth * this.state.stageScale
          const _height = this.state.imgHeight * this.state.stageScale
          const _initVal = {
            x: (this.state.imgWidth - _width) / 2,
            y: (this.state.imgHeight - _height) / 2,
            width: _width,
            height: _height,
            scale: this.state.stageScale,
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
      const layer = this.state.layerRef.getLayer()
      const croprect = stage.find('#crop-rect')[0].attrs
      console.log(croprect)
      const croped = {
        x: croprect.x,
        y: croprect.y,
        width: croprect.width * croprect.scaleX,
        height: croprect.height * croprect.scaleY,
      }
      console.log(croped)

      const img = stage.find('#origin-img')[0]
      console.log(img)



      layer.add(img.crop(croped))
      layer.draw()
      
    }
  }
  cancelChange = () => {
    if(this.state.curMode === 'crop'){
      
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