// Default indexer, is colourblind but clean
const rgb = require("canvasforge/indexer_rgb");
// Proper indexer, respects colour hue but FIXME adds grey noise for some reason
const hsv = require("canvasforge/indexer_hsv");

const dither_bayer = require("canvasforge/indexer_dither_bayer");

const dither_error = require("canvasforge/indexer_dither_error");

module.exports = (core, pixmap) => {
	switch (core.type){
		case 0:
			return dither_bayer(core, pixmap);
		case 1:
			return dither_error(core, pixmap);
		case 2: 
			return hsv(core, pixmap);
		case 3:
		default:
			return rgb(core, pixmap);
	}
};
