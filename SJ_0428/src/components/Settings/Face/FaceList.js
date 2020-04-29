import React, { Component } from 'react';
import styled from 'styled-components'
import {Zoom} from '@material-ui/core';

class FaceList extends Component {

  render(){
    const store = this.props.store
    return(
      <Zoom in={true}>
        <StFaceListCont>
        {store.allFaceList.length === 0 ?
          <StMsg>죄송해요. 못 찾겠어요. ㅠㅅㅠ</StMsg>
          :
          <StMsg>블러 처리할 얼굴을 선택해주세요!</StMsg>
        }

          <StFaceList>
          <StFaceCont>
          {store.allFaceList.map((_img, i) => {return(
              <StFace key={i} check={store.faceCheckList[i]}>
                {_img}
              </StFace>
            )})
          }
          </StFaceCont>
          </StFaceList>
        </StFaceListCont>
      </Zoom>
    )
  }
} export default FaceList;

const StFaceListCont = styled.div`
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

const StFaceList = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StFaceCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.2em solid rgba(0,0,0,0);
`

const StFace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2rem;
  border: 4px solid;
  border-color: ${props => props.check ? 'white' : 'gray'};
  border-radius: 5px;
  background-color: gray;
`;