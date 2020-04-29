import React, { Component } from "react";
import { Storage } from "../../Storage";
import styled from "styled-components";
import { Zoom, Slider } from "@material-ui/core";

class AdjustSliders extends Component {
  render() {
    return (
      <Storage.Consumer>
        {(store) => {
          const histIdx = store.historyIdx;
          const filterHist = store.filterHistory;
          const changeAdjust = store.changeAdjust;
          return (
            <>
              <Zoom in={true}>
                <StSliderCont>
                  {this.props.channel === "hue" && (
                    <StSlider
                      id="hue"
                      min={0}
                      max={300}
                      step={0.1}
                      value={filterHist[histIdx].hue}
                      onChange={changeAdjust}
                    />
                  )}
                  {this.props.channel === "saturation" && (
                    <StSlider
                      id="saturation"
                      min={-5}
                      max={5}
                      step={0.01}
                      value={filterHist[histIdx].saturation}
                      onChange={changeAdjust}
                    />
                  )}
                  {this.props.channel === "luminance" && (
                    <StSlider
                      id="luminance"
                      min={-1}
                      max={1}
                      step={0.01}
                      value={filterHist[histIdx].luminance}
                      onChange={changeAdjust}
                    />
                  )}
                  {this.props.channel === "contrast" && (
                    <StSlider
                      id="contrast"
                      min={-100}
                      max={100}
                      step={1}
                      value={filterHist[histIdx].contrast}
                      onChange={changeAdjust}
                    />
                  )}
                  {this.props.channel === "blur" && (
                    <StSlider
                      id="blur"
                      min={0}
                      max={50}
                      step={10}
                      value={filterHist[histIdx].blur}
                      onChange={changeAdjust}
                    />
                  )}
                </StSliderCont>
              </Zoom>
            </>
          );
        }}
      </Storage.Consumer>
    );
  }
}
export default AdjustSliders;

const StSliderCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 80%;
`;

const StSlider = styled(Slider)`
  color: white;
`;
