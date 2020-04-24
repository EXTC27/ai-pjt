import Konva from "konva";

export const createCropRect = (_stageRef, _initVal) => {
  var stage = _stageRef.getStage();
  var cropLayer = stage.find('#crop-layer')

  var cropRect = new Konva.Rect({
    id: 'crop-rect',
    name: "crop-rect",
    draggable: true,
    x: _initVal.x,
    y: _initVal.y,
    width: _initVal.width,
    height: _initVal.height,
    scaleX: 1,
    scaleY: 1,
  });
  cropLayer.add(cropRect);

  // var text = new Konva.Text({
  //   x: 5,
  //   y: 5,
  //   width:1000,
  //   height:1000,
  // });
  // layer.add(text);
  // updateText();

  // create new transformer
  var tr = new Konva.Transformer({
    anchorSize: 5,
    borderStrokeWidth: 1,
    keepRatio: false,
    rotateEnabled: false
  });
  cropLayer.add(tr);
  tr.attachTo(cropRect);
  cropLayer.draw();

  // rect.on("transformstart", function () {
  //   console.log("transform start");
  // });

  // rect.on("dragmove", function () {
  // });

  // rect.on("transform", function () {
  //   console.log("transform");
  // });

  // rect.on("transformend", function () {
  //   console.log("transform end");
  // });

  // function updateText() {
  //   var lines = [
  //     "x: " + rect.x(),
  //     "y: " + rect.y(),
  //     "rotation: " + rect.rotation(),
  //     "width: " + rect.width(),
  //     "height: " + rect.height(),
  //     "scaleX: " + rect.scaleX(),
  //     "scaleY: " + rect.scaleY(),
  //   ];
  //   text.text(lines.join("\n"));
  //   layer.batchDraw();
  // }

};
