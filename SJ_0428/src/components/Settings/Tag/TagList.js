import React, { Component } from 'react';
import styled from 'styled-components';

class TagList extends Component {
  constructor(props){
    super(props)
    this.state = {
      tagList: this.props.store.imgTag,      
      tagCheckList: this.props.store.imgTag.map(() => true),
    }
  }

  clickTag = (key, original, custom, event) => {
    key = key.i;

    // 태그가 custom에 있는지 확인  
    if(custom.indexOf(key) === -1){ //없으면 추가
      custom.push(key)
      event.currentTarget.className = "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"
    }else{  //있으면 삭제
      custom.splice(custom.indexOf(key), 1)
      event.currentTarget.className = "MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-outlinedSizeSmall MuiButton-sizeSmall"
    }
  }

  clickCopy = (custom, original) => {
    // index 오름차순 정렬
    var tmpList = custom.sort(function(a, b){
      return a - b ;
    }) ;
    
    // 텍스트 추출
    var tags = '';
    for(var i = 0; i < tmpList.length; i++){
      tags += "#" + original[tmpList[i]] + " ";
    }
    console.log('복사할 텍스트 ', tags)

    // 복사
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = tags;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  render(){
    console.log(this.state.tagList)
    return(
      <StTagListCont>
      {
        this.state.tagList.length === 0 ?
          <StMsg>죄송해요. 못 찾겠어요. ㅠㅅㅠ</StMsg>
        :
        <>
          <StMsg>클립보드에 복사할 태그를 선택해주세요!</StMsg>
          <StTagList>
          {
            this.state.tagList.map((_tag, i) => {
              return(
                <StTag key={i} check={this.state.tagCheckList[i]}>
                  
                </StTag>
              )
            })
          }
          </StTagList>
        </>
      }
      </StTagListCont>
    )
  }
} export default TagList;

const StTagListCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StMsg = styled.div`
  display: flex;
  font-size: 110%;
  color: white;
`;

const StTagList = styled.div`

`;

const StTag = styled.div`

`;
