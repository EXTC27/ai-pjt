import Konva from 'konva'

export const InitDispAdjust = (_layer, _idx) => {
	const layer = _layer;
	const img = layer.find(`#${_idx}`)[0];
	img.cache();
	img.filters([Konva.Filters.Blur, Konva.Filters.HSL]);
	img.blurRadius(0);
	img.hue(0);
	img.saturation(0);
	img.luminance(0);
	layer.batchDraw()
}

export const UpdateRectAdjust = () => {

}