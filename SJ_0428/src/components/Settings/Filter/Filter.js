import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { filtersRef } from "./FilterRef";
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
    console.log("적용된 필터 :" + filterRef[idx].name);
    this.props.changeFilter(
      filterRef[idx].hue,
      filterRef[idx].saturation,
      filterRef[idx].luminance,
      filterRef[idx].contrast,
      filterRef[idx].blur
    );
  };

  render() {
    const { filterRef } = this.state;
    const list = filterRef.map((filter, idx) => (
      <>
        <img
          key={idx}
          id={idx}
          src={filter.src}
          alt={filter.name}
          onClick={this.changeFilter}
        />
      </>
    ));

    return (
      <StFilterCont>
        <StSliderCont>{list}</StSliderCont>
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
  overflow: auto;
  display: flex;
`;

export default Filter;
