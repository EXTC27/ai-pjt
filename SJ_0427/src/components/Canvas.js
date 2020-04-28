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
                {store.AdjustType === 'hsv' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.HSV]}
                    hue={store.hue}
                    saturation={store.saturation}
                    value={store.value}
                    ref={(ref) => {
                      store.hsvRef = ref;
                    }}
                  />
                ) : null}
                {store.AdjustType === 'blur' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Blur]}
                    blurRadius={store.blurVal}
                    ref={(ref) => {
                      store.blurRef = ref;
                    }}
                  />
                ) : null}
                {store.AdjustType === 'brighten' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Brighten]}
                    brightness={store.brightenVal}
                    ref={(ref) => {
                      store.brightenRef = ref;
                    }}
                  />
                ) : null}

                {store.AdjustType === 'contrast' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Contrast]}
                    contrast={store.contrastVal}
                    ref={(ref) => {
                      store.contrastRef = ref;
                    }}
                  />
                ) : null}

                {store.AdjustType === 'grayscale' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Grayscale]}
                    ref={(ref) => {
                      store.grayscaleRef = ref;
                    }}
                  />
                ) : null}

                {store.AdjustType === 'mask' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Mask]}
                    threshold={store.maskVal}
                    ref={(ref) => {
                      store.maskRef = ref;
                    }}
                  />
                ) : null}
                {store.AdjustType === 'pixelate' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Pixelate]}
                    pixelSize={store.pixelateVal}
                    ref={(ref) => {
                      store.pixelateRef = ref;
                    }}
                  />
                ) : null}
                {store.AdjustType === 'noise' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.Noise]}
                    noise={store.noiseVal}
                    ref={(ref) => {
                      store.noiseRef = ref;
                    }}
                  />
                ) : null}

                {store.curMode === 'filter' ? (
                  <Image
                    image={store.img}
                    filters={[Konva.Filters.HSV]}
                    hue={store.filterH}
                    saturation={store.filterS}
                    value={store.filterV}
                    ref={(ref) => {
                      store.filterRef = ref;
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
