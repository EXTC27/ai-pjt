import React, { Component } from 'react';
import styled from 'styled-components';
import {Zoom} from '@material-ui/core';

class SegmentList extends Component {

  render(){
    const store = this.props.store
    return(
      <Zoom in={true}>
        <StSegListCont>
        {store.allSegList.length === 0 ?
          <StMsg>죄송해요. 못 찾겠어요. ㅠㅅㅠ</StMsg>
          :
          <StMsg>원본을 유지할 객체를 선택해주세요!</StMsg>
        }
        
          <StSegList>
          {store.allSegList.map((_img, i) => { return(
              <StSeg key={i} check={store.segCheckList[i]}>
                {_img}
                <StSegLabel>
                  {store.segLabels[i]}
                </StSegLabel>
              </StSeg>
            )})
          }
          </StSegList>
        </StSegListCont>
      </Zoom>
    )
  }
} export default SegmentList;


const StSegListCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StMsg = styled.div`
  font-size: 110%;
  color: white;
`;

const StSegList = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 0.2rem 0 0.2rem;
  box-sizing: border-box;
`;

const StSeg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.2rem;
  border: 4px solid;
  border-color: ${props => props.check ? 'white' : 'gray'};
  /* border-color: ${props => props.check ? 'rgba(0,0,0,0)' : 'gray'}; */
  border-radius: 5px;
  /* background-image: url("MainBackground.jpg"); */
  /* background: linear-gradient(to right, #66ffff 22%, #ff99cc 100%); */
  /* background-color: gray; */
  /* width: 70%; */
`;

const StSegLabel = styled.label`
  font-family: 'Baloo Bhaina 2', cursive;
  font-size: 90%;
`;

// const StSegLabel = styled.div`
//   font-family: 'Baloo Bhaina 2', cursive;
//   font-size: 90%;
//   background-color: gray;
//   text-align: center;
//   width: 100%;
//   height: 100%;
// `;