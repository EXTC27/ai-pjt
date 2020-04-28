import React, { Component } from 'react';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import BuildIcon from '@material-ui/icons/Build';
import CloudIcon from '@material-ui/icons/Cloud';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { Storage } from '../Storage';
import GrainIcon from '@material-ui/icons/Grain';
import PortraitIcon from '@material-ui/icons/Portrait';
import GradientIcon from '@material-ui/icons/Gradient';
class AdjustTypeMenu extends Component {
  render() {
    return (
      <Storage.Consumer>
        {(store) => (
          <StFilterMenuCont>
            <StFilterCont id="hsv" onClick={store.changeAdjustType}>
              <BuildIcon fontSize="large" />
              <label>HSV</label>
            </StFilterCont>
            <StFilterCont id="blur" onClick={store.changeAdjustType}>
              <BlurOnIcon fontSize="large" />
              <label>Blur</label>
            </StFilterCont>

            <StFilterCont id="brighten" onClick={store.changeAdjustType}>
              <Brightness6Icon fontSize="large" />
              <label>Brighten</label>
            </StFilterCont>

            <StFilterCont id="contrast" onClick={store.changeAdjustType}>
              <Brightness3Icon fontSize="large" />
              <label>Contrast</label>
            </StFilterCont>

            <StFilterCont id="enhance" onClick={store.changeAdjustType}>
              <CameraEnhanceIcon fontSize="large" />
              <label>Enhance</label>
            </StFilterCont>

            <StFilterCont id="pixelate" onClick={store.changeAdjustType}>
              <GradientIcon fontSize="large" />
              <label>Pixelate</label>
            </StFilterCont>

            <StFilterCont id="noise" onClick={store.changeAdjustType}>
              <GrainIcon fontSize="large" />
              <label>Noise</label>
            </StFilterCont>
          </StFilterMenuCont>
        )}
      </Storage.Consumer>
    );
  }
}

const StFilterMenuCont = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  /* background: linear-gradient(to top left, #66ffff 0%, #ff9999 100%); */
  background: linear-gradient(to top left, #66ccff 0%, #ff99cc 100%);
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  width: 100%;
  z-index: 1;
  position: fixed;
  bottom: 0;
`;

const StFilterCont = styled(IconButton)`
  width: 3em;
  /* color: #e6e6e6; */
  color: white;
  text-shadow: 0 0 10px black;
  .MuiIconButton-label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  label {
    font-family: 'Single Day', cursive;
    padding-top: 2px;
    font-size: 60%;
  }
`;

export default AdjustTypeMenu;
