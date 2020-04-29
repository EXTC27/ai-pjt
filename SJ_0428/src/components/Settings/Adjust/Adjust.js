import React, { Component } from 'react';
import AdjustSliders from './AdjustSliders';
import styled, {css} from 'styled-components';
import {Button} from '@material-ui/core';

class Adjust extends Component {
  constructor(props){
    super(props)
    this.state = {
      channel: 'hue',
    }
  }

  tabChannel = (e) => {
    // const _channel = e.currentTarget.id
    this.setState({
      channel: e.currentTarget.id,
    })
  }

  render() {
    const check=this.state.channel
    return(
      <StAdjustCont>
        <StTabCont>
          <StBtn id='hue' 
          style={{background: `${this.state.channel === 'hue' ? 'rgb(63,63,63)' : 'rgb(30,30,30)'}`}} 
          onClick={this.tabChannel}>색상</StBtn>

          <StBtn id='saturation' 
          style={{background: `${this.state.channel === 'saturation' ? 'rgb(63,63,63)' : 'rgb(30,30,30)'}`}}
          onClick={this.tabChannel}>채도</StBtn>

          <StBtn id='luminance' 
          style={{background: `${this.state.channel === 'luminance' ? 'rgb(63,63,63)' : 'rgb(30,30,30)'}`}}
          onClick={this.tabChannel}>명도</StBtn>

          <StBtn id='blur' 
          style={{background: `${this.state.channel === 'blur' ? 'rgb(63,63,63)' : 'rgb(30,30,30)'}`}}
          onClick={this.tabChannel}>블러</StBtn>
          
        </StTabCont>

        <StSliderCont>
          <AdjustSliders channel={this.state.channel}/>
        </StSliderCont>
      </StAdjustCont>
    )
  }
} export default Adjust;

const StAdjustCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StTabCont = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 4px;
  background-color: rgb(30,30,30);
`;

const StBtn = styled(Button)`
  color: white;
  border-radius: 10px 10px 0 0;
`;


const StSliderCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%
`;