window.game = new Phaser.Game(1280, 720, Phaser.AUTO, '');
window.player = null;
window.socket = null;
window.level = null;
window.TEXTURES = "bbo_textures";

startGame();

//preoload all the states here
function startGame() {
	socket = io("http://192.168.0.130:5000");

  require("./game/mods/phaser_enhancements");
  //for setting up the stage
  game.state.add("Boot", require("./game/states/boot"));
  //loading all the files
  game.state.add("Preloader", require("./game/states/preloader"));
  //Showing the main screen
  game.state.add("TitleScreen", require("./game/states/title_screen"));
  //Show a game selectionscreen
  game.state.add("Lobby", require("./game/states/lobby"));
  // state for Creating own games
  game.state.add("StageSelect", require("./game/states/stage_select"));
  // screen for joining running game
  game.state.add("PendingGame", require("./game/states/pending_game"));

  // screen for joining running game
  game.state.add("boardOne", require("./game/states/boardOne"));
	// screen for joining running game
	game.state.add("boardTwo", require("./game/states/boardOne"));
	// screen for joining running game
  game.state.add("boardThree", require("./game/states/boardOne"));
	// screen for joining running game
	game.state.add("boardFour", require("./game/states/boardOne"));
	game.state.start('Boot');
};
