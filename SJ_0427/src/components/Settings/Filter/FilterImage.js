import React, { Component } from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';

// 미리보기용으로 제공하는 컴포넌트
class FilterImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: props.img,
      h: props.h,
      s: props.s,
      v: props.v,
    };
  }
  render() {
    const { img, h, s, v } = this.state;
    return (
      <Image
        image={img}
        filters={[Konva.Filters.HSV]}
        hue={h}
        saturation={s}
        value={v}
      />
    );
  }
}

export default FilterImage;
