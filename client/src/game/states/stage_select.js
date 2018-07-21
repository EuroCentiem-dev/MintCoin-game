var StageSelect = function() {};

module.exports = StageSelect;

var xOffset = 40;
var yOffset = 50;

var thumbnailXOffset = 255;
var thumbnailYOffset = 150;

var stageNameYOffset = 328;

var repeatingBombTilesprite;

var stages = [
	{name: "MintCoin to the moon", thumbnailKey: "thumbnails/limitless_brook_thumbnail.png", tilemapName: "boardOne", maxPlayers: 4, size: "small", roboPlayers:1},
	{name: "Catch MintyAllDay", thumbnailKey: "thumbnails/danger_desert_thumbnail.png", tilemapName: "boardTwo", maxPlayers: 4, size: "medium",roboPlayers:1},
	{name: "Burn the coins with ", thumbnailKey: "thumbnails/limitless_brook_thumbnail.png", tilemapName: "boardThree", maxPlayers: 4, size: "small",roboPlayers:1},
	{name: "Beat the bank ", thumbnailKey: "thumbnails/limitless_brook_thumbnail.png", tilemapName: "boardFour", maxPlayers: 4, size: "small"},
	{name: "Run the exchange ", thumbnailKey: "thumbnails/limitless_brook_thumbnail.png", tilemapName: "boardFive", maxPlayers: 4, size: "small",roboPlayers:1,roboPlayers:1},
];

StageSelect.prototype = {
	init: function(gameId) {
		this.gameId = gameId;
	},

	create: function() {


		//Setup the General Stage

		var empty_background = game.add.image(game.world.centerX,game.world.centerY,'empty_background');
		empty_background.anchor.setTo(0.5,0.5);

		var debuggrid = game.add.image(game.world.centerX,game.world.centerY,'debuggrid');
		debuggrid.anchor.setTo(0.5,0.5);

		// set specifif stage select  items
		var selectionWindow = game.add.image(game.world.centerX,game.world.centerY, TEXTURES, "lobby/select_stage.png");
		selectionWindow.anchor.setTo(0.5,0.5);

		this.selectedStageIndex = 0;
		var initialStage = stages[this.selectedStageIndex];

		this.leftButton = game.add.button(game.world.centerX - 250, 250, TEXTURES, this.leftSelect, this, "lobby/buttons/left_select_button_02.png", "lobby/buttons/left_select_button_01.png");
		this.leftButton.anchor.setTo(0.5,0.5);
		this.rightButton = game.add.button(game.world.centerX + 250, 250, TEXTURES, this.rightSelect, this, "lobby/buttons/right_select_button_02.png", "lobby/buttons/right_select_button_01.png");
		this.rightButton.anchor.setTo(0.5,0.5);
		this.okButton = game.add.button(game.world.centerX + 250, 550, TEXTURES, this.confirmStageSelection, this, "lobby/buttons/ok_button_02.png", "lobby/buttons/ok_button_01.png");
		this.okButton.anchor.setTo(0.5,0.5);

		this.leftButton.setDownSound(buttonClickSound);
		this.rightButton.setDownSound(buttonClickSound);
		this.okButton.setDownSound(buttonClickSound);

		this.thumbnail = game.add.image(game.world.centerX + 5 , game.world.centerY -100, TEXTURES, initialStage.thumbnailKey);
		this.thumbnail.anchor.setTo(0.5,0.5);
		// Display title
		var nameLabel5=this.add.text(50,25,'stage select loaded....',{font: '15px Arial', fill:'#ffffff'});

		this.text = game.add.text(game.camera.width / 2 , game.world.centerY + 30 , initialStage.name);
		this.configureText(this.text, "white", 28);
		this.text.anchor.setTo(.5, .5);

		// Display number of players
		this.numPlayersText = game.add.text(game.world.centerX, 470, "Max # of players:   " + initialStage.maxPlayers);
		this.configureText(this.numPlayersText, "white", 18);
		this.numPlayersText.anchor.setTo(.5, .5);

		// Display stage size
		this.stageSizeText = game.add.text(game.world.centerX, 490, "Difficulty:   " + initialStage.size);
		this.configureText(this.stageSizeText, "white", 18);
		this.stageSizeText.anchor.setTo(.5, .5);
	},

	leftSelect: function() {
		if(this.selectedStageIndex === 0) {
			this.selectedStageIndex = stages.length - 1;
		} else {
			this.selectedStageIndex--;
		}

		this.updateStageInfo();
	},

	rightSelect: function() {
		if(this.selectedStageIndex === stages.length - 1) {
			this.selectedStageIndex = 0;
		} else {
			this.selectedStageIndex++;
		}

		this.updateStageInfo();
	},

	update: function() {

	},

	updateStageInfo: function() {
		var newStage = stages[this.selectedStageIndex];
		this.text.setText(newStage.name);
		this.numPlayersText.setText("Max # of players:   " + newStage.maxPlayers);
		this.stageSizeText.setText("Map size:   " + newStage.size);
		this.thumbnail.loadTexture(TEXTURES, newStage.thumbnailKey);
	},

	configureText: function(text, color, size) {
		text.font = "Carter One";
		text.fill = color;
		text.fontSize = size;
	},

	confirmStageSelection: function() {
		var selectedStage = stages[this.selectedStageIndex];

		socket.emit("select stage", {mapName: selectedStage.tilemapName});
		game.state.start("PendingGame", true, false, selectedStage.tilemapName, this.gameId);
	}
};
