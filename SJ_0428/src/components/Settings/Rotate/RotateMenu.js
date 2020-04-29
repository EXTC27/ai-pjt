import React, { Component } from 'react';
import styled from 'styled-components';
import {Storage} from '../../Storage';
import {IconButton, } from '@material-ui/core';
import {RotateLeft, RotateRight} from '@material-ui/icons';

class RotateMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rotation: 0,
            rotate_style: '',
        }

        this.rotate = this.rotate.bind(this);
        this.rotateleft = this.rotateleft.bind(this);
    }

    rotate() {
        let newRotation = this.state.rotation + 90;
        if(newRotation >= 360){
        newRotation =- 360;
        }
        this.setState({
        rotation: newRotation,
        })
    }

    rotateleft(){
        // console.log('ROTATE LEFT')
        // let newRotation = this.state.rotation - 90;
        // if(newRotation >= 360){
        //   newRotation =- 360;
        // }
        // this.setState({
        //   rotation: newRotation,
        //   rotate_style: StyleSheet.create({transform: `rotate(${this.state.rotation}deg)`})
        // })
      }

    // props.rotate_style = this.state.rotate_style;

    render() {
        return(
            <Storage.Consumer>
                {
                    store => (
                        <StRotateMenuCont>
                            <StRotateCont id="left" rotatemode = {store.rotatemode} onClick = {store.changeRotateMode}>
                            {/* <StRotateCont id="left" rotatemode = {store.rotatemode} onClick = {this.rotateleft}> */}
                            <RotateLeft/>
                            {/* <label>reverse</label> */}
                            </StRotateCont>
                            <StRotateCont id="right" rotatemode = {store.rotatemode} onClick = {store.changeRotateMode}>
                            <RotateRight/>
                            {/* <label>clock</label> */}
                            </StRotateCont>
                        </StRotateMenuCont>
                    )
                }
            </Storage.Consumer>
        )
    }
}

export default RotateMenu;

const StRotateMenuCont = styled.div`
    font-family: 'Single Day', cursive;
    ${'' /* display: flex; */}
    flex-direction: column;
    text-align: center;
    align-items: center;
    background: black;
    ${'' /* background: linear-gradient(to right, #66ffff 22%, #ff99cc 100%); */}
    border-radius: 8px 8px 0 0;
    width: 100%;
    ${'' /* height: 39%; */}
    z-index: 2;
`

const StRotateCont = styled(IconButton)`
    display: inline-block;
    background: white;
    ${'' /* color: ${props => props.rotatemode === props.id ? "white" : "gray"}; */}
    ${'' /* width:3em;
    height:3em;
    
    .MuiIconButton-label{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    label{
        padding-top: 2px;
        font-size: 60%;
    } */}
`