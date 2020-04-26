import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

// example of functional component
const FilterImage = ({ hue, saturation, value, image }) => {
  const imageRef = React.useRef();

  console.log('image:' + image);
  console.log('imageRef:' + imageRef);
  // when image is loaded we need to cache the shape
  React.useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current.cache();
      // since this update is not handled by "react-konva" and we are using Konva methods directly
      // we have to redraw layer manually
      imageRef.current.getLayer().batchDraw();
    }
  }, [image]);

  return (
    <Image
      ref={imageRef}
      image={image}
      filters={[Konva.Filters.HSV]}
      hue={hue}
      saturation={saturation}
      value={value}
    />
  );
};

export default FilterImage;
