import React, { Component } from 'react';
import SegmentList from '../Settings/Segment/SegmentList';
import { Storage } from '../Storage';
import styled from 'styled-components';
import { IconButton, Slider } from '@material-ui/core';
import { Clear, Check, Refresh } from '@material-ui/icons';
import AdjustTypeMenu from './AdjustTypeMenu';
import HSV from '../Settings/Adjust/HSV';
import FilterTypeMenu from './FilterTypeMenu';

class DrawerMenu extends Component {
  render() {
    return (
      <Storage.Consumer>
        {(store) => (
          <StDrawerMenuCont>
            <StMenuCont>
              {store.curMode === 'segment' ? (
                <>
                  <IconButton id={store.curMode} onClick={store.applyChange}>
                    <Refresh fontSize="large" />
                  </IconButton>
                  <IconButton id={store.curMode} onClick={store.cancelChange}>
                    <Check fontSize="large" />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton id={store.curMode} onClick={store.applyChange}>
                    <Check fontSize="large" />
                  </IconButton>
                  <IconButton id={store.curMode} onClick={store.cancelChange}>
                    <Clear fontSize="large" />
                  </IconButton>
                </>
              )}
              {/* <IconButton id={store.curMode} onClick={store.applyChange}><Check fontSize="large" /></IconButton>
              <IconButton id={store.curMode} onClick={store.cancelChange}><Clear fontSize="large"/></IconButton> */}
            </StMenuCont>

            <StSettingCont>
              {store.curMode === 'segment' ? (
                <SegmentList store={store} />
              ) : null}
              {store.curMode === 'adjust' ? <AdjustTypeMenu /> : null}
              {store.curMode === 'filter' ? <FilterTypeMenu /> : null}
              {store.AdjustType === 'hsv' ? <HSV store={store} /> : null}
              {store.AdjustType === 'blur' ? (
                <div style={{ width: '70%' }}>
                  Blur
                  <Slider
                    min={0}
                    step={2}
                    max={40}
                    value={store.blurVal}
                    onChange={store.changeBlur}
                  />
                </div>
              ) : null}
              {store.AdjustType === 'brighten' ? (
                <div style={{ width: '70%' }}>
                  Brightness
                  <Slider
                    min={-1}
                    step={0.05}
                    max={1}
                    value={store.brightenVal}
                    onChange={store.changeBrighten}
                  />
                </div>
              ) : null}
              {store.AdjustType === 'contrast' ? (
                <div style={{ width: '70%' }}>
                  Contrast
                  <Slider
                    min={-100}
                    step={1}
                    max={100}
                    value={store.contrastVal}
                    onChange={store.changeContrast}
                  />
                </div>
              ) : null}

              {store.AdjustType === 'contrast' ? (
                <div style={{ width: '70%' }}>
                  Contrast
                  <Slider
                    min={-100}
                    step={1}
                    max={100}
                    onChange={store.changeContrast}
                  />
                </div>
              ) : null}
              {store.AdjustType === 'enhance' ? (
                <div style={{ width: '70%' }}>
                  Enhance
                  <Slider
                    min={-1}
                    step={0.01}
                    max={1}
                    value={store.enhanceVal}
                    onChange={store.changeEnhance}
                  />
                </div>
              ) : null}
              {store.AdjustType === 'pixelate' ? (
                <div style={{ width: '70%' }}>
                  Pixelate
                  <Slider
                    min={1}
                    step={1}
                    max={30}
                    value={store.pixelateVal}
                    onChange={store.changePixelate}
                  />
                </div>
              ) : null}
              {store.AdjustType === 'noise' ? (
                <div style={{ width: '70%' }}>
                  Noise
                  <Slider
                    min={0}
                    step={0.1}
                    max={4}
                    value={store.noiseVal}
                    onChange={store.changeNoise}
                  />
                </div>
              ) : null}
            </StSettingCont>
          </StDrawerMenuCont>
        )}
      </Storage.Consumer>
    );
  }
}
export default DrawerMenu;

const StDrawerMenuCont = styled.div`
  font-family: 'Single Day', cursive;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: black;
  /* background: linear-gradient(to top, #ccffff 0%, #ffccff 100%); */
  /* border-radius: 8px 8px 0 0; */
  width: 100%;
  height: 35%;
  z-index: 2;
  position: fixed;
  bottom: 0;
`;

const StMenuCont = styled.div`
  display: flex;
  align-self: flex-end;

  .MuiTouchRipple-root {
    color: white;
  }
  svg {
    color: white;
  }
`;

const StSettingCont = styled.div`
  box-sizing: border-box;
  /* border: 3px solid gray; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 100%;
`;
