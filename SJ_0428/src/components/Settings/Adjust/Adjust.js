import React, { Component } from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core'

class Adjust extends Component {
  constructor(props){
    super(props)
    this.state = {
      mode: 'rgb',

    }
  }

  tabMode = (e) => {
    const _mode = e.currentTarget.id
    // console.log(_mode)
    this.setState({
      mode: _mode,
    })
  }

  render() {
    return(
      <StAdjustCont>
        <StBtnCont>
          <Button id='hue' variant={this.state.mode === 'hue' && 'outlined'} onClick={this.tabMode}>색상</Button>
          <Button id='saturation' variant={this.state.mode === 'saturation' && 'outlined'} onClick={this.tabMode}>채도</Button>
          <Button id='luminance' variant={this.state.mode === 'luminance' && 'outlined'} onClick={this.tabMode}>명도</Button>
          <Button id='blur' variant={this.state.mode === 'blur' && 'outlined'} onClick={this.tabMode}>블러</Button>
        </StBtnCont>

        <StSliderCont>

        </StSliderCont>
      </StAdjustCont>
    )
  }
} export default Adjust;

const StAdjustCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  height: 100%;
`;

const StBtnCont = styled.div`
  display: flex;

  .MuiButton-root{
  }
  .MuiButton-outlined{
    border-bottom-color: rgba(0, 0, 0, 0);
  }

`;

const StSliderCont = styled.div`
  /* border: 1px solid rgba(0, 0, 0, 0); */
  border: 1px solid rgba(0, 0, 0, 0.23);
  width: 100%;
  height: 100%
`;