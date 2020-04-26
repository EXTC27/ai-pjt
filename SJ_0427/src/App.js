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

      filterVal: 0,
      filter: null,
      filterRef: React.createRef(),
      changeFilter: this.changeFilter,
      touchFlag: false,
      touchStart: this.touchStart,
      touchEnd: this.touchEnd,
    }
  }
  changeFilter = async (e, value) => {
    console.log(e.target.value)
    if(!this.state.touchFlag){
      await this.setStateAsync({
        filterVal: value
      })
      console.log(value)
      const stage = this.state.stageRef.getStage();
      const filterLayer = stage.find('#edit-layer');
      const filterimg = stage.find('#filter-img')[0];
      filterimg.cache()
      filterimg.filters([Konva.Filters.Blur]);
      filterimg.blurRadius(value);
      filterLayer.draw()
    }
  }

  //setState 비동기 때문에 열받아서 만든 함수
  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
  ////////////////////////////////

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

  stageInit = () => {
    // const _img = new window.Image();
    // _img.src = this.state.imgURL;
    const _img = this.imgUrlToTag(this.state.imgURL)
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
        // this.imgInit(this.state.img)
        this.setState({
          imgHistory: [
            <Image key={0} image={_img}/>
          ]
        })
      })
    }
  }

  stageUpdate = (imgWidth, imgHeight) => {
    const _cont = document.querySelector('#canvas-container')
    if(imgWidth > imgHeight){
      const _contW = _cont.offsetWidth
      const _scale = _contW / imgWidth
      const _ratio = imgWidth / _contW
      this.setState({
        stageHistory: this.state.stageHistory.concat(
          {
            width: _contW,
            height: _scale * imgHeight,
            scale: _scale,
            ratio: _ratio,
          }
        )
      })
    }
    else{
      const _contH = _cont.offsetHeight
      const _scale = _contH / imgHeight
      const _ratio = imgHeight / _contH
      this.setState({
        stageHistory: this.state.stageHistory.concat(
          {
            width: _scale * imgWidth,
            height: _contH,
            scale: _scale,
            ratio: _ratio,
          }
        )
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

      else if(_curMode === 'adjust'){
        // this.state.filterRef.cache()
        const stage = this.state.stageRef.getStage();
        const filterLayer = stage.find('#edit-layer');

        const img = new Konva.Image({
          id: 'filter-img',
          image: this.state.img,
          blurRadius: this.state.filterVal,
        })
        console.log(img)
        // img.cache();
        // img.filters([Konva.Filters.Blur]);
        filterLayer.add(img);
        // filterLayer.draw();
        
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
      console.log(this.state.stageHistory.slice(0, _curHistIdx + 1))
      await this.setStateAsync({
        stageHistory: this.state.stageHistory.slice(0, _curHistIdx + 1),
        imgHistory: this.state.imgHistory.slice(0, _curHistIdx + 1)
      })
    }

    const _stage = this.state.stageRef.getStage()
    const _layer = this.state.layerRef.getLayer()
    const _ratio = this.state.stageHistory[_curHistIdx].ratio
    const _dataURL = _layer.toDataURL({ pixelRatio: Math.round(_ratio) });
    // const _img = new window.Image()
    // _img.src = _dataURL

    const _img = this.imgUrlToTag(_dataURL)

    if(this.state.curMode === 'crop'){
      const cropRect = _stage.find('#crop-rect')[0].attrs
      const cropInfo = {
        x: cropRect.x,
        y: cropRect.y,
        width: cropRect.width * cropRect.scaleX,
        height: cropRect.height * cropRect.scaleY,
      }
      // console.log(cropInfo)
      this.stageUpdate(cropInfo.width, cropInfo.height)
      this.setStateAsync({
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