import React, { Component } from "react";
import { Storage } from "../Storage";
import Loading from "../Loading";
import Adjust from "../Settings/Adjust/Adjust";
import SegmentList from "../Settings/Segment/SegmentList";
import FaceList from "../Settings/Face/FaceList";
import TagList from "../Settings/Tag/TagList";

import styled from "styled-components";
import { IconButton, Button } from "@material-ui/core";
import { Clear, Check, Refresh } from "@material-ui/icons";
import RotateMenu from "../Settings/Rotate/RotateMenu";
import Filter from "../Settings/Filter/Filter";

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.clickTag = this.clickTag.bind(this);
    this.clickCopy = this.clickCopy.bind(this);
  }

  clickTag(key, original, custom, event) {
    key = key.i;

    // 태그가 custom에 있는지 확인
    if (custom.indexOf(key) === -1) {
      //없으면 추가
      custom.push(key);
      event.currentTarget.className =
        "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall";
    } else {
      //있으면 삭제
      custom.splice(custom.indexOf(key), 1);
      event.currentTarget.className =
        "MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-outlinedSizeSmall MuiButton-sizeSmall";
    }
  }

  clickCopy(custom, original) {
    // index 오름차순 정렬
    var tmpList = custom.sort(function (a, b) {
      return a - b;
    });

    // 텍스트 추출
    var tags = "";
    for (var i = 0; i < tmpList.length; i++) {
      tags += "#" + original[tmpList[i]] + " ";
    }
    console.log("복사할 텍스트 ", tags);

    // 복사
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = tags;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  render() {
    var originalTagList = [];
    var customTagList = [];

    return (
      <Storage.Consumer>
        {(store) => (
          <StDrawerMenuCont id="drawer-container">
            <StMenuCont>
              {store.curMode === "tag" ? (
                <IconButton id={store.curMode} onClick={store.applyChange}>
                  <Refresh fontSize="large" />
                </IconButton>
              ) : (
                <IconButton id={store.curMode} onClick={store.applyChange}>
                  <Check fontSize="large" />
                </IconButton>
              )}
              <IconButton id={store.curMode} onClick={store.cancelChange}>
                <Clear fontSize="large" />
              </IconButton>
            </StMenuCont>

            <StSettingCont>
              {
                store.curMode === "rotate" && <RotateMenu />
                //<div>
                //  회전 부분입니다.
                //</div>
              }
              {store.curMode === "filter" && (
                <Filter store={store} changeFilter={store.changeFilter} />
              )}
              {store.curMode === "adjust" && <Adjust store={store} />}
              {store.curMode === "segment" && ( //객체찾기 부분입니다.
                <>
                  {store.loading ? <Loading /> : null}
                  {store.loading ? null : <SegmentList store={store} />}
                </>
              )}

              {store.curMode === "face" && ( //얼굴찾기 부분입니다.
                <>
                  {store.loading ? <Loading /> : null}
                  {store.loading ? null : <FaceList store={store} />}
                </>
              )}

              {store.curMode === "tag" && (
                // <TagList store={store}/>
                <div>
                  [ 추천 해시태그 ] <br />
                  {store.tagList.map((tag, i) => {
                    originalTagList = store.tagList;
                    customTagList.push({ i }.i);
                    return (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{
                          borderRadius: "12px",
                          marginLeft: "4px",
                          marginBottom: "3px",
                        }}
                        onClick={(e) =>
                          this.clickTag(
                            { i },
                            originalTagList,
                            customTagList,
                            e
                          )
                        }
                        key={i}
                      >
                        {tag}
                      </Button>
                    );
                  })}
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                    style={{ position: "fixed", bottom: "10px", right: "10px" }}
                    onClick={() =>
                      this.clickCopy(customTagList, originalTagList)
                    }
                  >
                    Copy
                  </Button>
                </div>
              )}
            </StSettingCont>
          </StDrawerMenuCont>
        )}
      </Storage.Consumer>
    );
  }
}
export default DrawerMenu;

const StDrawerMenuCont = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* background-image: url("MainBackground.jpg");
  background-size: cover; */
  /* background: linear-gradient(to right, #66ffff 22%, #ff99cc 100%); */
  background-color: rgb(64, 64, 64);
  border-top: 1px solid gray;
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 39%;
  z-index: 2;
  position: fixed;
  bottom: 0;
`;

const StMenuCont = styled.div`
  display: flex;
  align-self: flex-end;

  .MuiTouchRipple-root {
    color: white;
  }
  svg {
    color: white;
  }
`;

const StSettingCont = styled.div`
  box-sizing: border-box;
  color: white;
  /* border: 3px solid gray; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: black; */
  /* background: linear-gradient(to right, #66ffff 22%, #ff99cc 100%); */
  /* opacity: 0.1; */
`;
