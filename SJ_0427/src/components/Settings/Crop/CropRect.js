import Konva from "konva";

export const createCropRect = (_stageRef, _initVal) => {
  const stage = _stageRef.getStage();
  const cropLayer = stage.find('#edit-layer')

  const cropRect = new Konva.Rect({
    id: 'crop-rect',
    draggable: true,
    x: _initVal.x,
    y: _initVal.y,
    width: _initVal.width,
    height: _initVal.height,
    scaleX: 1,
    scaleY: 1,
  });
  cropLayer.add(cropRect);

  const tr = new Konva.Transformer({
    anchorSize: 5,
    borderStrokeWidth: 1,
    keepRatio: false,
    rotateEnabled: false
  });
  cropLayer.add(tr);
  tr.attachTo(cropRect);
  cropLayer.draw();

};
