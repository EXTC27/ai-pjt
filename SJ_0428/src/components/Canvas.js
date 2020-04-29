import React, { Component } from "react";
import { Storage } from "./Storage";
import styled from "styled-components";
import { Stage, Layer } from "react-konva";

class Canvas extends Component {
  render() {
    return (
      <Storage.Consumer>
        {(store) => (
          <StCanvasCont id="canvas-container">
            <Stage
              ref={(ref) => {
                store.stageRef = ref;
              }}
              style={{ display: "flex", backgroundColor: "black" }}
              width={store.stageHistory[store.historyIdx].width}
              height={store.stageHistory[store.historyIdx].height}
              scaleX={store.stageHistory[store.historyIdx].scale}
              scaleY={store.stageHistory[store.historyIdx].scale}
            >
              <Layer
                id="display-layer"
                ref={(ref) => {
                  store.layerRef = ref;
                }}
              >
                {store.imgHistory[store.historyIdx]}
                {store.segCheckList.map((value, i) =>
                  value ? store.segList[i] : null
                )}
                {store.faceCheckList.map((value, i) =>
                  value ? store.faceList[i] : null
                )}
              </Layer>

              {store.curMode !== "" && <Layer id="edit-layer"></Layer>}

              {store.curMode === "crop" && <Layer id="crop-layer"></Layer>}
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
  background-color: gray;
  width: 100%;
  height: 50%;
  /* margin-bottom: 65%; */
`;
