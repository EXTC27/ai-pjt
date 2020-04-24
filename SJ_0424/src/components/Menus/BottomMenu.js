import React, { Component } from 'react';
import styled from 'styled-components';
import {Storage} from '../Storage';
import {IconButton, } from '@material-ui/core';
import {Photo, Crop, Cached, FlipToFront, Tune, NaturePeople, Face, LocalOffer} from '@material-ui/icons';

class BottomMenu extends Component {

  render(){
    return(
      <Storage.Consumer>
      {
        store => (
          <StBottomMenuCont>
            <StButtonCont id="origin" mode={store.curMode} onClick={store.changeMode}>
              <Photo/>
              <label>원본</label>
            </StButtonCont>

            <StButtonCont id="crop" mode={store.curMode} onClick={store.changeMode}>
              <Crop/>
              <label>자르기</label>
            </StButtonCont>

            <StButtonCont id="rotate" mode={store.curMode} onClick={store.changeMode}>
              <Cached/>
              <label>회전</label>
            </StButtonCont>

            <StButtonCont id="filter" mode={store.curMode} onClick={store.changeMode}>
              <FlipToFront/>
              <label>필터</label>
            </StButtonCont>

            <StButtonCont id="adjust" mode={store.curMode} onClick={store.changeMode}>
              <Tune/>
              <label>조정</label>
            </StButtonCont>

            <StButtonCont id="object" mode={store.curMode} onClick={store.changeMode}>
              <NaturePeople/>
              <label>객체찾기</label>
            </StButtonCont>

            <StButtonCont id="face" mode={store.curMode} onClick={store.changeMode}>
              <Face/>
              <label>얼굴인식</label>
            </StButtonCont>

            <StButtonCont id="tag" mode={store.curMode} onClick={store.changeMode}>
              <LocalOffer/>
              <label>태그생성</label>
            </StButtonCont>
          </StBottomMenuCont>
        )
      }
      </Storage.Consumer>
    )
  }

} export default BottomMenu;

const StBottomMenuCont = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  background: linear-gradient(to top, #ccffff 0%, #ffffff 100%);
  box-sizing: border-box;  
  border-radius: 8px 8px 0 0;
  width: 100%;
  z-index: 1;
  position: fixed;
  bottom: 0;
`;

const StButtonCont = styled(IconButton)`
  width: 3em;
  /* color: ${props => props.mode === props.id ? "gray" : "black"}; */
  color: black;
  .MuiIconButton-label{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  label{
    padding-top: 2px;
    font-size: 60%;
  }
`