import React, { Component } from "react";

class FilterPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      src: "",
      hue: 0,
      saturation: 0,
      luminance: 0,
      contrast: 0,
      blur: 0,
    };
  }
  componentDidMount() {
    const {
      name,
      src,
      hue,
      saturation,
      luminance,
      contrast,
      blur,
    } = this.props;
    this.setState({
      name,
      src,
      hue,
      saturation,
      luminance,
      contrast,
      blur,
    });
  }

  onclick = () => {
    const { hue, saturation, luminance, contrast, blur } = this.state;
    this.props.store.applyFilter(hue, saturation, luminance, contrast, blur);
  };
  render() {
    const { src, name } = this.state;
    return (
      <div>
        <img src={src} alt={name}></img>
      </div>
    );
  }
}

export default FilterPreview;
