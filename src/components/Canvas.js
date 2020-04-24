import React, { Component } from "react";
import styled from 'styled-components'
import {Stage, Layer,} from "react-konva";

class Canvas extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     img: null,
  //     imgWidth: 0,
  //     imgHeight: 0,
  //     stageWidth: 0,
  //     stageHeight: 0,
  //     scale: 0,

  //     selectedId: null,
  //   };
  // }
  constructor(props){
    super(props);
    this.props.store.stageInit()
  }

  // componentDidMount(){
  //   this.setOriginImage()
  //   this.props.store.stageInit()
  // }

  // setOriginImage = () => {
  //   const _img = new window.Image();
  //   _img.src = this.props.src;
  //   _img.onload = () => {
  //     this.setStateAsync({
  //       img: _img,
  //       imgWidth: _img.width,
  //       imgHeight: _img.height,
  //     })
  //     .then(()=>{
  //       const _cont = document.querySelector('#canvas-container')

  //       if(this.state.imgWidth > this.state.imgHeight){
  //         const _contW = _cont.offsetWidth
  //         const _scale = _contW / this.state.imgWidth

  //         this.setState({
  //           stageWidth: _contW,
  //           stageHeight: _scale * this.state.imgHeight,
  //           scale: _scale,
  //         })
  //       }
  //       else{
  //         const _contH = _cont.offsetHeight
  //         const _scale = _contH / this.state.imgHeight

  //         this.setState({
  //           stageWidth: _scale * this.state.imgWidth,
  //           stageHeight: _contH,
  //           scale: _scale,
  //         })
  //       }
  //     })
  //     .then(()=>{
  //       this.props.store.imgInit(this.state.img)
  //     })
  //   }
  // }

  // setStateAsync(state) {
  //   return new Promise(resolve => {
  //     this.setState(state, resolve);
  //   });
  // }

  render() {
    return (
      <StCanvasCont id="canvas-container">
        <Stage
          ref={ref => { this.props.store.stageRef = ref; }}
          style={{"display":"flex", "backgroundColor":"gray"}}
          width={this.props.store.stageWidth}
          height={this.props.store.stageHeight}
          // scaleX={this.props.store.stageScale}
          // scaleY={this.props.store.stageScale}
        >
          <Layer 
            id='origin-layer'
            
            // style={{"display":"flex", "backgroundColor":"gray"}}
            // width={this.props.store.stageWidth}
            // height={this.props.store.stageHeight}
            scaleX={this.props.store.stageScale}
            scaleY={this.props.store.stageScale}
          >
            {this.props.store.imgList}
          </Layer>

          {
            this.props.store.curMode === 'crop' ?
            <Layer
              id='crop-layer'
              ref={ref => { this.props.store.layerRef = ref; }}
              scaleX={this.props.store.stageScale}
              scaleY={this.props.store.stageScale}
            >
            </Layer>
            :
            null
          }
        </Stage>
      </StCanvasCont>
    );
  }
} export default Canvas;

const StCanvasCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  width: 100%;
  height: 50%;
  margin-bottom: 65%;
`
