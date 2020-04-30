import React from "react";
import * as Methods from "../../Methods";
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
    const list = filterRef.map((filter, idx) => {
      const _img = new window.Image();
      _img.src = filter.src;
      const _viewW = _img.width;
      const _viewH = _img.height;
      const _style = Methods.calcSegView(_viewW, _viewH).style;
      const _width = Methods.calcSegView(_viewW, _viewH).width;
      const _height = Methods.calcSegView(_viewW, _viewH).height;

      return (
        <StImageCont key={idx} style={_style}>
          <img
            key={idx}
            id={idx}
            src={filter.src}
            alt={filter.name}
            width={`${_width}px`}
            height={`${_height}px`}
            onClick={this.changeFilter}
            loading="lazy"
          />
        </StImageCont>
      );
    });

    return <StFilterCont>{list}</StFilterCont>;
  }
}

const StFilterCont = styled.div`
  overflow: scroll;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 0.2em solid rgba(0, 0, 0, 0);
`;

const StImageCont = styled.div`
  margin: 0.2rem;
`;

export default Filter;
