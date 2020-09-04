import React, { Component } from 'react';
import styled from 'styled-components';
import {Storage} from '../Storage';
import {IconButton, } from '@material-ui/core';
import {SaveAlt, KeyboardBackspace, Undo, Redo} from '@material-ui/icons';

class BottomMenu extends Component {

  render(){
    return(
      <StBottomMenuCont>

      </StBottomMenuCont>
    )
  }

} export default BottomMenu;

const StBottomMenuCont = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: arond;
  align-items: center;
  box-sizing: border-box;  
  border: 3px solid gray;
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 10%;
`