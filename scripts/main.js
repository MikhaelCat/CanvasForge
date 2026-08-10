// breakingfunny.com
Blocks.canvas.buildVisibility = BuildVisibility.shown;

const ui = require("ui_lib/library");

const core = require("canvasforge/core");

var ptl;

ui.addMenuButton("CanvasForge", "paste", () => {
	ptl.show();
});

ui.onLoad(() => {
	// Add button in Schematics dialog
	Vars.ui.schematics.buttons.button("CanvasForge", Icon.paste, () => {
		ptl.show();
	});

	ptl = new BaseDialog("CanvasForge");

	ptl.cont.add("[coral]Step 1:[] Select a PNG/JPG image.");
	ptl.cont.row();
	ptl.cont.button("Select Image", () => {
		// Use Mindustry's FileChooser facade. Calling Platform's Java-interface
		// default methods directly is not reliable from Rhino on desktop.
		try {
			Packages.mindustry.ui.FileChooser.open("png", "jpg", "jpeg").submit(file => {
			try {
				if (file == null) return;
				const bytes = file.readBytes();
				if (bytes == null || bytes.length === 0) throw new Error("Selected file is empty");
				let image = new Pixmap(bytes);
				if (core.image != null) core.image.dispose();
				core.image = image;
			} catch (e) {
				ui.showError("Failed to load source image: " + e);
			}
			});
		} catch (e) {
			ui.showError("Failed to open image chooser: " + e);
		}
	}).size(240, 50);
	ptl.cont.row();


	ptl.cont.add("[coral]Step 2:[] Optionally, enter a new width to resize the image.");
	ptl.cont.row();

	// Create a table for the label + field in one row
	let widthTable = new Table();
	widthTable.defaults().pad(4);

	widthTable.add("[accent]Image width[] (in canvases, 0 to disable)").left();

	widthTable.field("0", (text) => {
		try {
			core.resizeWidth = parseInt(text);
		} catch (e) {
			core.resizeWidth = 0;
		}
	});

	ptl.cont.add(widthTable).row();
	
	ptl.cont.row();

	ptl.cont.add("[coral]Step 3:[] Choose Enhancement Options (Dither, processing time may increase).");
	ptl.cont.row();

	ptl.cont.add("Choose based on image detail amount, try different types and see which one you like best. ");
	ptl.cont.row();

	let detailTable = new Table();

	detailTable.defaults().size(180, 50);

	detailTable.button("No Detail", () => {
		core.type = 3;
	}).size(240, 50).disabled(() => core.type === 3);

	detailTable.button("+Detail Simple (Bayer)", () => {
		core.type = 0;
	}).size(240, 50).disabled(() => core.type === 0);

	detailTable.button("+Detail Complex (Error)", () => {
		core.type = 1;
	}).size(240, 50).disabled(() => core.type === 1);

	ptl.cont.add(detailTable).row();

	ptl.cont.add("[coral]Step 4:[] Click [stat]Export[] to create a schematic.");
	ptl.cont.row();
	ptl.cont.add("[accent]Please dont use this for furry/weeb shit thank you");
	ptl.cont.row();

	ptl.cont.row();

	ptl.cont.label(() => core.stage).center();

	ptl.addCloseButton();
	ptl.buttons.button("Export", Icon.export, () => {
		new java.lang.Thread(() => {
			try {
				core.export();
				ptl.hide();
			} catch (e) {
				Core.app.post(() => {
					ui.showError("Failed to export schematic", e);
					core.stage = "";
				});
			}
		}, "CanvasForge worker").start();
	}).disabled(() => !core.image || core.stage !== "");
});
