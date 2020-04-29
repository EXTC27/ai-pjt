import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

class Adjust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "rgb",
      hue: 0,
      saturation: 0,
      luminance: 0,
      blur: 0,
    };
  }
  componentDidMount() {
    const { store } = this.props;
    this.setState({
      hue: store.filterHistory[store.historyIdx].hue,
      saturation: store.filterHistory[store.historyIdx].saturation,
      luminance: store.filterHistory[store.historyIdx].luminance,
      blur: store.filterHistory[store.historyIdx].blur,
    });
  }
  tabMode = (e) => {
    const _mode = e.currentTarget.id;
    // console.log(_mode)
    this.setState({
      mode: _mode,
    });
  };

  onChangeHue = (e) => {
    this.setState({ hue: e.target.value });
    this.props.store.changeAdjust(e);
  };
  onChangeBlur = (e) => {
    this.setState({ blur: e.target.value });
    this.props.store.changeAdjust(e);
  };
  onChangeLuminance = (e) => {
    this.setState({ luminance: e.target.value });
    this.props.store.changeAdjust(e);
  };
  onChangeSaturation = (e) => {
    this.setState({ saturation: e.target.value });
    this.props.store.changeAdjust(e);
  };

  render() {
    const { mode, hue, saturation, luminance, blur } = this.state;
    return (
      <StAdjustCont>
        <StBtnCont>
          <Button
            id="hue"
            variant={mode === "hue" && "outlined"}
            onClick={this.tabMode}
          >
            색상
          </Button>
          <Button
            id="saturation"
            variant={mode === "saturation" && "outlined"}
            onClick={this.tabMode}
          >
            채도
          </Button>
          <Button
            id="luminance"
            variant={mode === "luminance" && "outlined"}
            onClick={this.tabMode}
          >
            명도
          </Button>
          <Button
            id="blur"
            variant={mode === "blur" && "outlined"}
            onClick={this.tabMode}
          >
            블러
          </Button>
        </StBtnCont>

        <StSliderCont>
          {mode === "hue" && (
            <input
              id="hue"
              type="range"
              min="0"
              max="300"
              step="0.1"
              value={hue}
              onChange={this.onChangeHue}
            />
          )}
          {mode === "saturation" && (
            <input
              id="saturation"
              type="range"
              min="-5"
              max="5"
              step="0.01"
              value={saturation}
              onChange={this.onChangeSaturation}
            />
          )}
          {mode === "luminance" && (
            <input
              id="lum"
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={luminance}
              onChange={this.onChangeLuminance}
            />
          )}

          {mode === "blur" && (
            <input
              id="blur"
              type="range"
              min="0"
              max="50"
              step="10"
              value={blur}
              onChange={this.onChangeBlur}
            />
          )}
        </StSliderCont>
      </StAdjustCont>
    );
  }
}
export default Adjust;

const StAdjustCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  height: 100%;
`;

const StBtnCont = styled.div`
  display: flex;

  .MuiButton-root {
  }
  .MuiButton-outlined {
    border-bottom-color: rgba(0, 0, 0, 0);
  }
`;

const StSliderCont = styled.div`
  /* border: 1px solid rgba(0, 0, 0, 0); */
  border: 1px solid rgba(0, 0, 0, 0.23);
  width: 100%;
  height: 100%;
`;
