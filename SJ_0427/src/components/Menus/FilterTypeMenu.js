import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { Storage } from '../Storage';
import FilterImage from '../Settings/Filter/FilterImage';
import { Stage, Layer } from 'react-konva';

class FilterTypeMenu extends Component {
  render() {
    return (
      <Storage.Consumer>
        {(store) => (
          <StFilterMenuCont>
            <FilterImage h={0} s={0} v={0} img={store.img} />
            <StFilterCont id="original" onClick={store.changeFilterType}>
              <label>Original</label>
            </StFilterCont>
            <StFilterCont id="daily" onClick={store.changeFilterType}>
              <FilterImage h={3.5} s={0.14} v={0.14} img={store.img} />
              <label>Daily</label>
            </StFilterCont>
            <StFilterCont id="light" onClick={store.changeFilterType}>
              <FilterImage h={0} s={0} v={0.14} img={store.img} />
              <label>Light</label>
            </StFilterCont>
            <StFilterCont id="plain" onClick={store.changeFilterType}>
              <FilterImage h={3.6} s={0.27} v={0.23} img={store.img} />
              <label>Plain</label>
            </StFilterCont>
            <StFilterCont id="vintage" onClick={store.changeFilterType}>
              <FilterImage h={-9.63} s={-1.44} v={0.27} img={store.img} />
              <label>Vintage</label>
            </StFilterCont>
            <StFilterCont id="sugar" onClick={store.changeFilterType}>
              <FilterImage h={10} s={-0.2} v={0.27} img={store.img} />
              <label>Sugar</label>
            </StFilterCont>
            <StFilterCont id="grayscale" onClick={store.changeFilterType}>
              <label>B&W</label>
            </StFilterCont>
            <StFilterCont id="pro" onClick={store.changeFilterType}>
              <FilterImage h={-5} s={0.13} v={0.16} img={store.img} />
              <label>Pro</label>
            </StFilterCont>
            <StFilterCont id="retro" onClick={store.changeFilterType}>
              <label>Retro</label>
            </StFilterCont>
            <StFilterCont id="momo" onClick={store.changeFilterType}>
              <label>Momo</label>
            </StFilterCont>
            <StFilterCont id="soft" onClick={store.changeFilterType}>
              <FilterImage h={5} s={0.07} v={0.08} img={store.img} />
              <label>Soft</label>
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
