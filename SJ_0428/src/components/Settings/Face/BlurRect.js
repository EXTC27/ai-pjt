import Konva from "konva";

export const updateBlur = (stageRef, layerRef) => {
  const stage = stageRef.getStage()
  const rect = stage.find('#face-blur')
  const layer = layerRef.getLayer()
  rect.map((_rect, i) => {
    _rect.cache()
    _rect.filters([Konva.Filters.Blur])
    layer.batchDraw()
  })
}