import React, { Component } from 'react';
import { Storage } from './Storage';
import styled from 'styled-components';
import { Stage, Layer, Image } from 'react-konva';
import Konva from 'konva';

class Canvas extends Component {
  constructor(props) {
    super(props);
    // this.props.store.stageInit()
    this.state = {};
  }
  render() {
    // const store = this.props.store
    return (
      <Storage.Consumer>
        {(store) => (
          <StCanvasCont id="canvas-container">
            <Stage
              ref={(ref) => {
                store.stageRef = ref;
              }}
              // ref={ref => { this.props.store.stageRef = ref; }}
              style={{ display: 'flex', backgroundColor: 'gray' }}
              width={store.stageHistory[store.historyIdx].width}
              height={store.stageHistory[store.historyIdx].height}
              scaleX={store.stageHistory[store.historyIdx].scale}
              scaleY={store.stageHistory[store.historyIdx].scale}
              // width={this.props.store.stageWidth}
              // height={this.props.store.stageHeight}
              // scaleX={this.props.store.scale}
              // scaleY={this.props.store.scale}
            >
              <Layer
                id="display-layer"
                // ref={ref => { this.props.store.layerRef = ref; }}
                ref={(ref) => {
                  store.layerRef = ref;
                }}
              >
                {store.imgHistory[store.historyIdx]}
              </Layer>

              <Layer id="edit-layer">
                {store.curMode === 'adjust' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.HSV]}
                    hue={store.hue}
                    saturation={store.saturation}
                    value={store.value}
                    ref={(ref) => {
                      store.adjustRef = ref;
                    }}
                  />
                ) : null}
                {store.filterType === 'blur' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Blur]}
                    blurRadius={store.blurVal}
                    ref={(ref) => {
                      store.blurRef = ref;
                    }}
                  />
                ) : null}
                {store.filterType === 'brighten' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Brighten]}
                    brightness={store.brightenVal}
                    ref={(ref) => {
                      store.brightenRef = ref;
                    }}
                  />
                ) : null}

                {store.filterType === 'contrast' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Contrast]}
                    contrast={store.contrastVal}
                    ref={(ref) => {
                      store.contrastRef = ref;
                    }}
                  />
                ) : null}

                {store.filterType === 'grayscale' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Grayscale]}
                    ref={(ref) => {
                      store.grayscaleRef = ref;
                    }}
                  />
                ) : null}
              </Layer>

              <Layer id="ai-layer">
                {store.segCheckList.map((value, i) =>
                  value ? store.segList[i] : null
                )}
              </Layer>
            </Stage>
          </StCanvasCont>
        )}
      </Storage.Consumer>
    );
  }
}
export default Canvas;

const StCanvasCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  width: 100%;
  height: 50%;
  margin-bottom: 65%;
`;
