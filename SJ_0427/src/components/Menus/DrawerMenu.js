import React, { Component } from 'react';
import SegmentList from '../Settings/Segment/SegmentList'
import {Storage} from '../Storage';
import styled from 'styled-components';
import {IconButton, Slider, Input} from '@material-ui/core'
import {Clear, Check, Refresh} from '@material-ui/icons';


class DrawerMenu extends Component{
  render(){
    return(
      <Storage.Consumer>
      {
        store => (
          <StDrawerMenuCont>
            <StMenuCont>
              {
                store.curMode === 'segment' ? 
                <>
                  <IconButton id={store.curMode} onClick={store.applyChange}><Refresh fontSize="large" /></IconButton>
                  <IconButton id={store.curMode} onClick={store.cancelChange}><Check fontSize="large"/></IconButton>
                </>
                :
                <>
                  <IconButton id={store.curMode} onClick={store.applyChange}><Check fontSize="large" /></IconButton>
                  <IconButton id={store.curMode} onClick={store.cancelChange}><Clear fontSize="large"/></IconButton>
                </>
              }
              {/* <IconButton id={store.curMode} onClick={store.applyChange}><Check fontSize="large" /></IconButton>
              <IconButton id={store.curMode} onClick={store.cancelChange}><Clear fontSize="large"/></IconButton> */}
            </StMenuCont>

            <StSettingCont>
              { store.curMode === 'segment' ? <SegmentList store={store}/> : null }
              { store.curMode === 'adjust' ?
              <div style={{'width':'70%'}} >
                <Slider 
                  min={0}
                  step={2}
                  max={40}
                  onChange={store.changeFilter}
                />
              </div>
              :null}
            </StSettingCont>
          </StDrawerMenuCont>
        )
      }
      </Storage.Consumer>
    )
  }
} export default DrawerMenu;

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
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 100%;
`;