import React, { Component } from 'react';
import TopMenu from './Menus/TopMenu';
import BottomMenu from './Menus/BottomMenu';
import DrawerMenu from './Menus/DrawerMenu';
import {Storage} from './Storage';
import Canvas from './Canvas';
import Modal from './Modal';

import styled from 'styled-components';
import {Slide,} from '@material-ui/core';

class EditorPage extends Component {

  render(){
    sessionStorage.setItem('curPage', 'editor')
    return(
      <Storage.Consumer>
      {store => {
        let _msg = "설정한 값들을\n전부 초기화하시겠습니까?"
        if(store.curMode === "backToMain"){
          _msg = "설정한 값들을 무시하고\n뒤로 가시겠습니까?"
        }

        return(
        <Slide in={true} direction="left">
          <StEditorCont className="editor" width={store.innerW} height={store.innerH}>
            <TopMenu stageRef={store.stageRef} ratio={store.ratio}/>
            
            <Canvas src={store.imgURL} store={store}/>

            <Slide in={true} direction="up" mountOnEnter unmountOnExit>
              <BottomMenu/>
            </Slide>

            <Slide in={store.curMode !== "" && store.curMode !== "origin" && store.curMode !== "backToMain"} 
                  direction="up" mountOnEnter unmountOnExit>
              <DrawerMenu/>
            </Slide>

            <Modal pop={store.curMode === "origin" || store.curMode === "backToMain"} msg={_msg}/>

          </StEditorCont>
        </Slide>
        )
      }}
      </Storage.Consumer>
    )
  }
} export default EditorPage;

const StEditorCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
