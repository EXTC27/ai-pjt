import React, { Component } from 'react';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import HighlightIcon from '@material-ui/icons/Highlight';
import { Slide } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { Storage } from '../Storage';
class FilterTypeMenu extends Component {
  render() {
    return (
      <Storage.Consumer>
        {(store) => (
          <StFilterMenuCont>
            <StFilterCont id="blur" onClick={store.changefilterType}>
              <BlurOnIcon fontSize="large" />
              <label>Blur</label>
            </StFilterCont>

            <StFilterCont id="brighten" onClick={store.changefilterType}>
              <Brightness6Icon fontSize="large" />
              <label>Brighten</label>
            </StFilterCont>

            <StFilterCont id="contrast" onClick={store.changefilterType}>
              <Brightness3Icon fontSize="large" />
              <label>Contrast</label>
            </StFilterCont>

            <StFilterCont id="emboss" onClick={store.changefilterType}>
              <HighlightIcon fontSize="large" />
              <label>Emboss</label>
            </StFilterCont>

            <StFilterCont id="enhance" onClick={store.changefilterType}>
              <CameraEnhanceIcon fontSize="large" />
              <label>Enhance</label>
            </StFilterCont>

            <StFilterCont id="grayscale" onClick={store.changefilterType}>
              <CloudIcon fontSize="large" />
              <label>Grayscale</label>
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

export default FilterTypeMenu;
