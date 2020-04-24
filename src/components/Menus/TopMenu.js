import React, { Component } from 'react';
import {Storage} from '../Storage';
import styled from 'styled-components';
import {IconButton, } from '@material-ui/core';
import {SaveAlt, KeyboardBackspace, Undo, Redo, } from '@material-ui/icons';


class TopMenu extends Component {
  componentDidMount(){
    document.getElementById('save').addEventListener(
      'click',
      () => {
        // var stage = document.getElementsByTagName('canvas')[0]
        // var dataURL = stage.toDataURL("image/png");
        var stage = this.props.stageRef.getStage()
        var dataURL = stage.toDataURL({ pixelRatio: Math.round(this.props.ratio) });
        this.downloadURI(dataURL, 'stage.png');
      },
      false
    );
  }
  downloadURI = (uri, name) => {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render(){
    return(
      <Storage.Consumer>
      {
        store => (
          <StTopMenuCont>

            <IconButton id="backToMain" onClick={store.changeMode}><KeyboardBackspace/></IconButton>
            <div className="mid">
              <IconButton><Undo/></IconButton>
              <IconButton><Redo/></IconButton>  
            </div>
            <IconButton id="save" disabled={store.curMode !== ''}><SaveAlt/></IconButton>
            
          </StTopMenuCont>
        )
      }
      </Storage.Consumer>
    )
  }

} export default TopMenu;

const StTopMenuCont = styled.div`
  /* position: fixed;
  top: 0; */
  z-index: 100;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: inherit;
  width: 100%;

  .MuiTouchRipple-root{
    color: white;
  }

  .mid{
    display: flex;
  justify-content: center;
  align-items: center;
  }

  svg{
    color: #d9d9d9;
  }
`