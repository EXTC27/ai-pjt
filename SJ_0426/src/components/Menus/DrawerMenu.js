import React, { Component } from 'react';
import SegmentList from '../Settings/Segment/SegmentList'
import {Storage} from '../Storage';
import styled from 'styled-components';
import {IconButton,} from '@material-ui/core'
import {Clear, Check} from '@material-ui/icons';


class DrawerMenu extends Component{
  render(){
    return(
      <Storage.Consumer>
      {
        store => (
          <StDrawerMenuCont>
            <StMenuCont>
              <IconButton id={store.curMode} onClick={store.applyChange}><Check fontSize="large" /></IconButton>
              <IconButton id={store.curMode} onClick={store.cancelChange}><Clear fontSize="large"/></IconButton>
            </StMenuCont>

            <StSettingCont>
              { store.curMode === 'segment' ? <SegmentList store={store}/> : null }
            </StSettingCont>
          </StDrawerMenuCont>
        )
      }
      </Storage.Consumer>
    )
  }
} export default DrawerMenu;

const StDrawerMenuCont = styled.div`
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
  
  .MuiTouchRipple-root{
    color: white;
  }
  svg{
    color: white;
  }

`;

const StSettingCont = styled.div`
  box-sizing: border-box;
  /* border: 3px solid gray; */
  width: 100%;
  height: 100%;
`;