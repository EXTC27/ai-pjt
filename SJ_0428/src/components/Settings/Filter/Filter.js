import React from "react";
import styled from "styled-components";
import { Button, Zoom } from "@material-ui/core";
import { filtersRef } from "./FilterRef";
import { Stage, Layer } from "react-konva";
import Portal from "./Portal";
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterRef: [],
      img: "",
    };
  }
  componentDidMount() {
    const layer = this.props.store.layerRef.getLayer();
    const img = layer.find(`#${this.state.historyIdx}`)[0];
    this.setState({
      filterRef: filtersRef,
      img: img,
    });
  }

  changeFilter = (e) => {
    const idx = e.currentTarget.id;
    const { filterRef } = this.state;
    this.props.changeFilter(
      filterRef[idx].hue,
      filterRef[idx].saturation,
      filterRef[idx].luminance,
      filterRef[idx].contrast,
      filterRef[idx].blur
    );
  };

  render() {
    const { filterRef } = this.state;
    const { store } = this.props;
    return (
      <Zoom in={true}>
        <StFilterCont>
          <StFilterList>
            <Stage
              ref={(ref) => {
                this.props.store.prevfilterStage = ref;
              }}
              style={{ display: "flex", backgroundColor: "black" }}
              width={store.stageHistory[store.historyIdx].width}
              height={store.stageHistory[store.historyIdx].height}
            >
              <Layer id="prevfilter0-layer"></Layer>
              <Layer id="prevfilter1-layer"></Layer>
              <Layer id="prevfilter2-layer"></Layer>
              <Layer id="prevfilter3-layer"></Layer>
              <Layer id="prevfilter4-layer"></Layer>
              <Layer id="prevfilter5-layer"></Layer>
              <Layer id="prevfilter6-layer"></Layer>
              <Layer id="prevfilter7-layer"></Layer>
              <Layer id="prevfilter8-layer"></Layer>
              <Layer id="prevfilter9-layer"></Layer>
              <Layer id="prevfilter10-layer"></Layer>
              <Layer id="prevfilter11-layer"></Layer>
              <Layer id="prevfilter12-layer"></Layer>
              <Layer id="prevfilter13-layer"></Layer>
              <Layer id="prevfilter14-layer"></Layer>
              <Layer id="prevfilter15-layer"></Layer>
              <Layer id="prevfilter16-layer"></Layer>
              <Layer id="prevfilter17-layer"></Layer>
              <Layer id="prevfilter18-layer"></Layer>
              <Layer id="prevfilter19-layer"></Layer>
              <Layer id="prevfilter20-layer"></Layer>
              <Layer id="prevfilter21-layer"></Layer>
              <Layer id="prevfilter22-layer"></Layer>
              <Layer id="prevfilter23-layer"></Layer>
              <Layer id="prevfilter24-layer"></Layer>
              <Layer id="prevfilter25-layer"></Layer>
              <Layer id="prevfilter26-layer"></Layer>
              <Layer id="prevfilter27-layer"></Layer>
              <Layer id="prevfilter28-layer"></Layer>
              <Layer id="prevfilter29-layer"></Layer>
            </Stage>
          </StFilterList>
        </StFilterCont>
      </Zoom>
    );
  }
}

const StFilterCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StFilterList = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 0.2rem 0 0.2rem;
  box-sizing: border-box;
`;

const StFilter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.2rem;
  border: 4px solid;
  overflow : auto;
  border-color: ${(props) => (props.check ? "white" : "gray")};
  /* border-color: ${(props) => (props.check ? "rgba(0,0,0,0)" : "gray")}; */
  border-radius: 5px;
  /* background-image: url("MainBackground.jpg"); */
  /* background: linear-gradient(to right, #66ffff 22%, #ff99cc 100%); */
  /* background-color: gray; */
  /* width: 70%; */
`;

const StFilterName = styled.label`
  font-family: "Baloo Bhaina 2", cursive;
  font-size: 90%;
`;

export default Filter;

{
  /* <StFilter key={idx} id={idx} onClick={this.changeFilter}>
  </StFilter>


 createPrevFilterImg(
            this.state.prevfilterRef,
            idx,
            this.state.img,
            filterRef[idx].hue,
            filterRef[idx].saturation,
            filterRef[idx].luminance,
            filterRef[idx].contrast
          ); */
}
