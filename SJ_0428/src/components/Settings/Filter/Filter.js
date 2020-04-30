import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { filtersRef } from "./FilterRef";
import FilterPreview from "./FilterPreview";
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterRef: [],
    };
  }

  componentDidMount() {
    this.setState({
      filterRef: filtersRef,
    });
    console.log("필터 개수 : " + filtersRef.length);
  }

  changeFilter = (e) => {
    const idx = e.currentTarget.id;
    const { filterRef } = this.state;
    this.props.changeFilter(
      filterRef[idx].hue,
      filterRef[idx].saturation,
      filterRef[idx].luminance,
      filterRef[idx].blur,
      filterRef[idx].contrast
    );
  };

  render() {
    const { filterRef } = this.state;
    return (
      <StFilterCont>
        <StSliderCont>
          <img
            src="C:\Users\adamd\Desktop\ai-pjt\SJ_0428\src\components\Settings\Filter\imgs\original.jpg"
            name="original"
            alt="original"
            onClick={this.props.store.applyfilter}
          />
          ;
          <img src="./imgs/original.jpg" name="original" alt="original" />;
          <img src="./imgs/original.jpg" name="original" alt="original" />;
          <img src="./imgs/original.jpg" name="original" alt="original" />;
          <img src="./imgs/original.jpg" name="original" alt="original" />;
          <img src="./imgs/original.jpg" name="original" alt="original" />;
          <img src="./imgs/original.jpg" name="original" alt="original" />;
          <img src="./imgs/original.jpg" name="original" alt="original" />;
          <img src="./imgs/original.jpg" name="original" alt="original" />;
          <img src="./imgs/original.jpg" name="original" alt="original" />;
        </StSliderCont>
      </StFilterCont>
    );
  }
}

const StFilterCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  height: 100%;
`;

const StBtnCont = styled.div`
  display: flex;
  overflow: auto;
  .MuiButton-root {
  }
  .MuiButton-outlined {
    border-bottom-color: rgba(0, 0, 0, 0);
  }
`;

const StSliderCont = styled.div`
  /* border: 1px solid rgba(0, 0, 0, 0); */
  border: 1px solid rgba(0, 0, 0, 0.23);
  width: 100%;
  height: 100%;
`;

export default Filter;
