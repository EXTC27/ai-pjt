import React from "react";
import { filtersRef } from "./FilterRef";
import styled from "styled-components";
import { Button, Slide } from "@material-ui/core";

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
    // console.log("필터 개수 : " + filtersRef.length);
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

        <Slide in={true} direction="left" timeout={500}>
          <StBtnCont>
            {filterRef.map((filter, idx) => {
              return (
                <Button key={idx} id={idx} onClick={this.changeFilter}>
                  {filter.name}
                </Button>
              );
            })}
          </StBtnCont>
        </Slide>

        </StSliderCont>
      </StFilterCont>
    );
  }
} export default Filter;

const StFilterCont = styled.div`
  overflow: scroll;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const StSliderCont = styled.div`
  /* border: 1px solid rgba(0, 0, 0, 0.23); */
  /* width: 100%;
  height: 100%; */
`;

const StBtnCont = styled.div`
  display: flex;
  /* overflow: auto; */
  border: 0.2em solid rgba(0, 0, 0, 0);
  .MuiButton-root {
    background-color: gray;
    margin: 0.2rem;
  }
  /* .MuiButton-outlined {
    border-bottom-color: rgba(0, 0, 0, 0);
  } */
`;

