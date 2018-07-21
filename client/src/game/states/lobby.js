var Lobby = function() {};

var TextConfigurer = require("../util/text_configurer");

var initialSlotYOffset = 130;
var slotXOffset = 40;
var lobbySlotDistance = 60;

var textXOffset = 260;
var textYOffset = 25;
var repeatingBombTilesprite;

var headerYOffset = 70;

module.exports = Lobby;

Lobby.prototype = {
	init: function() {
		// Fill in later.
	},

	create: function() {
		console.log('client/src/states/lobby.js create');
		this.stateSettings = {
			empty: {
				outFrame: "lobby/slots/game_slot_01.png",
				overFrame: "lobby/slots/game_slot_02.png",
				text: "Host Game ", // For some reason, text gets slightly truncated if I don't append a space.
				callback: this.hostGameAction
			},
			joinable: {
				outFrame: "lobby/slots/game_slot_03.png",
				overFrame: "lobby/slots/game_slot_04.png",
				text: "Join Game ",
				callback: this.joinGameAction
			},
			settingup: {
				outFrame: "lobby/slots/game_slot_05.png",
				overFrame: "lobby/slots/game_slot_05.png",
				text: "Game is being set up... ",
				callback: null
			},
			inprogress: {
				outFrame: "lobby/slots/game_slot_05.png",
				overFrame: "lobby/slots/game_slot_05.png",
				text: "Game in Progress ",
				callback: null
			},
			full: {
				outFrame: "lobby/slots/game_slot_05.png",
				overFrame: "lobby/slots/game_slot_05.png",
				text: "Game Full ",
				callback: null
			}
		};


		//Setup the General Stage

		var empty_background = game.add.image(game.world.centerX,game.world.centerY,'empty_background');
		empty_background.anchor.setTo(0.5,0.5);

		var debuggrid = game.add.image(game.world.centerX,game.world.centerY,'debuggrid');
		debuggrid.anchor.setTo(0.5,0.5);

		//Setup Lobby specific items
		this.backdrop = game.add.image(game.world.centerX, game.world.centerY, TEXTURES, "lobby/lobby_backdrop.png");
		this.backdrop.anchor.setTo(0.5,0.5);

		this.header = game.add.text(game.camera.width / 2, headerYOffset, "Lobby");
		this.header.anchor.setTo(0.5, 0.5);
		TextConfigurer.configureText(this.header, "white", 32);

		// Make 2 Lists
		this.slots = [];
		this.labels = [];

		var gameData = [{state: "empty"}, {state: "empty"}, {state: "joinable"}, {state: "insession"}];

		//Tell the server that we are in the lobbySlot
		socket.emit("enter lobby");

		//listen if server wants us to update and add gameslots
		if(!socket.hasListeners("add slots")) {
			socket.on("add slots", this.addSlots.bind(this));
			socket.on("update slot", this.updateSlot.bind(this));
			socket.on("addDummyPlayers", this.addDummyPlayers.bind(this));
		}

	},

	update: function() {
	//fill in later
	// check if funds are recieved and then enable startButton
	},

	//server requests to add some slots
	addSlots: function(gameData) {
		console.log("addslots");
		console.log(gameData);
		if(this.slots.length > 0)  // TODO: get rid of this
			return;
		for(var i = 0; i < gameData.length; i++) {
			var callback = null;
			var state = gameData[i].state;
			var settings = this.stateSettings[state];

			(function(n, fn) {
				if(fn != null) {
					callback = function() {
						fn(n);
					}
				}
			})(i, settings.callback);

			var slotYOffset = initialSlotYOffset + i * lobbySlotDistance;

			this.slots[i] = game.add.button(game.world.centerX, slotYOffset, TEXTURES, callback, null, settings.overFrame, settings.outFrame);
			this.slots[i].anchor.setTo(0.5,0)
			this.slots[i].setDownSound(buttonClickSound);

			var text = game.add.text(game.world.centerX, slotYOffset + textYOffset, settings.text);
			TextConfigurer.configureText(text, "white", 18);
			text.anchor.setTo(0.5, 0.5);

			this.labels[i] = text;
		}

		//Tell the server that we games are setup
		socket.emit("lobby setup finished");


	},
	hostGameAction: function(gameId) {
		console.log('client/src/games/states/lobby.js hostgameaction');
		console.log(gameId);
		socket.emit("host game", {gameId: gameId});
		socket.removeAllListeners();
		game.state.start("StageSelect", true, false, gameId);
	},
	joinGameAction: function(gameId) {
		socket.removeAllListeners();
		game.state.start("PendingGame", true, false, null, gameId, repeatingBombTilesprite);
	},

	//server requests to update slots
	updateSlot: function(updateInfo) {
		console.log("UpdateSlot");
		var settings = this.stateSettings[updateInfo.newState];
		var id = updateInfo.gameId;
		var button = this.slots[id];

		this.labels[id].setText(settings.text);
		button.setFrames(settings.overFrame, settings.outFrame);

		// Change callback of button
		button.onInputUp.removeAll();
		button.onInputUp.add(function() { return settings.callback(id)}, this);

	},

	addDummyPlayers: function(gameData){
			console.log("addDummyPlayers");

	}


};
