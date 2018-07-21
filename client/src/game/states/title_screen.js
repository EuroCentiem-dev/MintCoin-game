var Fader = require("../util/fader");
var TextConfigurer = require("../util/text_configurer");
function TitleScreen() {};

var titleOffsetX = 55;
var titleOffsetY = 20;

var buttonOffsetX = 800;
var startButtonOffsetY = 400;
var howToButtonOffsetY = 360;

TitleScreen.prototype = {

	preload: function () {
		// Fill in later.
	},
	create: function() {
		this.showingInstructions = false;
		this.justClickedHowTo = false;
		this.justClickedOutOfHowTo = false;

		var empty_background = game.add.image(game.world.centerX,game.world.centerY,'empty_background');
		empty_background.anchor.setTo(0.5,0.5);

		var debuggrid = game.add.image(game.world.centerX,game.world.centerY,'debuggrid');
		debuggrid.anchor.setTo(0.5,0.5);

		var line1 = 'Please send MintCoinFunds to start the game';

		this.text = game.add.text(game.camera.width / 2, 40, line1);
		this.text.anchor.setTo(0.5, 0.5);
		TextConfigurer.configureText(this.text, "white", 32);


		var nameLabel5=this.add.text(50,25,'Titlescreen loaded....',{font: '15px Arial', fill:'#ffffff'});

		this.startGameButton = game.add.button(buttonOffsetX, startButtonOffsetY, TEXTURES, this.gotoLobby, this,
		"lobby/buttons/start_game_button_01.png", "lobby/buttons/start_game_button_03.png");

	},

		update: function() {
		//fill in later
		// check if funds are recieved and then enable startButton
		},

		gotoLobby: function(){
			game.state.start("Lobby");
		}



}

module.exports = TitleScreen;
