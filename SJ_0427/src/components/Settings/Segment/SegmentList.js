import React, { Component } from 'react';
import styled from 'styled-components'

class SegmentList extends Component {
  constructor(props){
    super(props)
    
  }


  render(){
    return(
      <StSegListCont>
        <div style={{'color':'white'}}>원본을 유지할 객체를 선택해주세요!</div>
        {/* {
          this.props.segList
        } */}
        <StSegList>
        {
          this.props.store.allSegList
        }
        </StSegList>
      </StSegListCont>
    )
  }
} export default SegmentList;


const StSegListCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 3px solid red;
`

const StSegList = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 3px solid skyblue;
`