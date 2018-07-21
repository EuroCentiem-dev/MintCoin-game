var BLACK_HEX_CODE = "#000000";
var TILE_SIZE = 40;
var TextConfigurer = require('../util/text_configurer');

var MapInfo = require("../../../../common/map_info");
var AudioPlayer = require("../util/audio_player");
var Player = require("../entities/player");
var RemotePlayer = require("../entities/remoteplayer");
var PropertyCard = require("../entities/propertycard");
var PropertyCardsData = require("../entities/propertycardsdata");
var ChanceCardsData = require("../entities/chancecardsdata");
var CommunityCardsData = require("../entities/communitycardsdata");


var boardOne = function () {};

module.exports = boardOne;

boardOne.prototype = {
  remotePlayers: {},
  PropertyCards:{},
  gameFrozen: true,

  preload:  function(){
    console.log('client/src/game/states/boardone.js - preload');
    //    this.load.atlasJSONHash("atlas","assets/textures/boardOne.png","assets/textures/boardOne.json");
  },

  init: function(tilemapName, players, id, ActivePlayer) {
    console.log('client/src/game/states/boardone.js - init');

    this.tilemapName = tilemapName;
    this.players = players;
    this.playerId = id;
    this.ActivePlayer = ActivePlayer;
    this.grids = MapInfo[this.tilemapName]['grids'];
    this.RoundBonus = MapInfo[this.tilemapName].RoundBonus;
    this.special_grids = MapInfo[this.tilemapName]['special_grids'];
    this.MapInfo = MapInfo[this.tilemapName];
    this.PropertyCardsData = PropertyCardsData[this.tilemapName];
    this.ChanceCardsData = ChanceCardsData[this.tilemapName];
    this.CommunityCardsData = CommunityCardsData[this.tilemapName];
    //console.log('client/src/game/states/boardone.js - init players');
    //console.log(this.players);
    //  this.PropertyCards[40]=[];


    this.player; //player token sprite
    this.player1; //player token sprite
    this.player2; //player token sprite
    this.player3; //player token sprite
    this.player4; //player token sprite
    this.player_grid = 0; //player token's current grid

    this.turnOk = true; //manage when players can start rolling die
    this.player_turn = true; //manage whose turn it is
    this.player_skip = false; //manage whether player should skip next turn
    this.player_tween; //tween object to handle moving player token's sprite


    //console.log('client/src/game/states/boardone.js - init - ActivePlayer ' + this.ActivePlayer);
    //console.log('client/src/game/states/boardone.js - init - playerId ' + this.playerId);
    //console.log('gridlenght: ' + this.grids.length);

    //console.log(MapInfo[this.tilemapName]['special_grids']);
    //console.log(MapInfo[this.tilemapName]['grids']);
    //console.log(this.PropertyCardsData);
    console.log(this.ChanceCardsData);
    console.log(this.CommunityCardsData);


  },

  setEventHandlers: function() {
    console.log('client/src/game/states/boardone.js - setEventHandlers');
    // Remember - these will actually be executed from the context of the Socket, not from the context of the level.
    socket.on("disconnect", this.onSocketDisconnect);
    socket.on("m", this.onMovePlayer.bind(this));
    socket.on("remove player", this.onRemovePlayer.bind(this));
    socket.on("roll dice", this.onRollDice.bind(this));
    socket.on("onNextPlayerActivateDice", this.onNextPlayerActivateDice.bind(this));


    //    socket.on("kill player", this.onKillPlayer.bind(this));
    //    socket.on("place bomb", this.onPlaceBomb.bind(this));
    //    socket.on("detonate", this.onDetonate.bind(this));
    socket.on("new round", this.onNewRound.bind(this));
    socket.on("end game", this.onEndGame.bind(this));
    socket.on("no opponents left", this.onNoOpponentsLeft.bind(this));
    //    socket.on("powerup acquired", this.onPowerupAcquired.bind(this));
  },

  create: function () {
    console.log('client/src/game/states/boardone.js - create');
    level = this;
    this.lastFrameTime;
    //    this.deadGroup = [];
    this.initializeMap();
    this.initializePlayers();
    this.setEventHandlers();
    this.createDimGraphic();
    this.beginRoundAnimation("round_text/round_1.png");

  },

  onCheckProperties: function(data) {
    console.log('client/src/game/states/boardone.js - onCheckProperties');
    this.id = data.id;
    console.log(this.id);
    console.log(data);
    console.log(this.players);
    //check if the no buy rounds are passed
    //check the property is owned by someone
    var player = this.players[data.id];
//    console.log(this.PropertyCards);
    //Calculate on which grid you are
    var PlayerPosition=[900,455];
    //PlayerPosition =[ player.x,player.y];
//    console.log(PlayerPosition);

//    console.log(this.grids);
    var PropertyInt = 0;

    for(var i=0; i<this.grids.length; i++){
//      console.log(this.grids[i]);
//      console.log(i + ': ' +this.grids[i][0] + ' ' + this.grids[i][1]);
      if(this.grids[i][0]==player.x && this.grids[i][1]==player.y){PropertyInt=i};
    }
    console.log(PropertyInt);
    console.log(this.PropertyCards[PropertyInt]);
    console.log('You landed on ' + this.PropertyCards[PropertyInt].name);
    //this.PropertyCards[PropertyInt].ShowCard();
  },

  onRollDice:function(data){
    console.log('client/src/game/states/boardOne.js - onRollDice');
    //var game = data.game;
    //console.log(data);
    //console.log(this.playerId);
    // kill the roll dice button
    this.roll_btn.kill();
    //this.dice_icon1.frameName = "dice_one.png";

    this.GetDice1Output(data.dice1);
    this.GetDice2Output(data.dice2);

    var totaldice=data.dice1 + data.dice2;

    //this.PrepareMoveGrids(this.playerId,totaldice);

  },

  createDimGraphic: function() {
    console.log('client/src/game/states/boardone.js - createDimGraphic');
    this.dimGraphic = game.add.graphics(0, 0);
    this.dimGraphic.alpha = .7;
    this.dimGraphic.beginFill(BLACK_HEX_CODE, 1); // (color, alpha)
    this.dimGraphic.drawRect(0, 0, game.camera.width, game.camera.height);
    this.dimGraphic.endFill(); // Draw to canvas
  },

  PrepareMoveGrids: function(PlayerId,stps){
  },

  //function that will be called when the Tween object completes moving the token
  MoveComplete : function(){
    this.tweens.removeAll();//remove all tween objects created in the above function
    //check if token has landed on final grid
    //once moving a token is done, we should check if
    //the grid it landed on is a special grid.
    //we call the CheckTokenSpecialGrid function
    //   if(!this.CheckTokenSpecialGrid()){
    //     this.ResetTurn();
    //   }
   },

  restartGame: function() {
    console.log('client/src/game/states/boardone.js - restartGame');

  },

  destroyItems: function() {
    console.log('client/src/game/states/boardone.js - destroyItems');

  },

  onNewRound: function(data) {
    console.log('client/src/game/states/boardone.js - onNewRound');

  },

  onEndGame: function(data) {
    console.log('client/src/game/states/boardone.js - onEndGame');

  },

  onNoOpponentsLeft: function(data) {
    console.log('client/src/game/states/boardone.js - onNoOpponentsLeft');

  },

  beginRoundAnimation: function(image, callback) {
    console.log('client/src/game/states/boardone.js - update');
    var beginRoundText = game.add.image(-600, game.camera.height / 2, TEXTURES, image);
    beginRoundText.anchor.setTo(.5, .5);

    var tween = game.add.tween(beginRoundText);
    tween.to({x: game.camera.width / 2}, 300).to({x: 1000}, 300, Phaser.Easing.Default, false, 800).onComplete.add(function() {
      this.dimGraphic.destroy();
      beginRoundText.destroy();
      this.gameFrozen = false;

      if(callback) {
        callback();
      }
    }, this);

    tween.start();
  },

  update: function() {
    //console.log('client/src/game/states/boardone.js - update');

  },

  destroyDeadSprites: function() {
    console.log('client/src/game/states/boardone.js - destroyDeadSprites');

  },

  render: function() {
    //console.log('client/src/game/states/boardone.js - render');
    //Print debug body information
    //game.debug.bodyInfo(player, 10, 20);

    //Sh ow the sprite's hitbox as a green rectangle
    //game.debug.body(player);
    //game.debug.bodyInfo(this.Currentplayer, 10, 20);

    if(window.debugging == true) {
      game.debug.body(player);
    }
  },

  storePreviousPositions: function() {
    console.log('client/src/game/states/boardone.js - storePreviousPositions');

  },

  stopAnimationForMotionlessPlayers: function() {
    console.log('client/src/game/states/boardone.js - stopAnimationForMotionlessPlayers');

  },

  onSocketDisconnect: function() {
    console.log('client/src/game/states/boardone.js - onSocketDisconnect');
    console.log("Disconnected from socket server.");

    this.broadcast.emit("remove player", {id: this.id});
  },

  initializePropertyCards: function() {
    //console.log('client/src/game/states/boardone.js - initializePropertyCard');
    for(var i=0; i<=this.grids.length; i++){
      this.PropertyCards[i]=new PropertyCard();
      if (this.PropertyCardsData[i]){ //if propertycardsdata exists use the data
        //console.log('client/src/game/states/boardone.js - initializePropertyCard The data exists');
        //console.log(this.PropertyCardsData[i]);
        this.PropertyCards[i]['xSpawn']=this.grids[i][0];
        this.PropertyCards[i]['ySpawn']=this.grids[i][1];
        this.PropertyCards[i]['width']=this.PropertyCardsData[i].width;
        this.PropertyCards[i]['height']=this.PropertyCardsData[i].height;
        this.PropertyCards[i]['angle']=this.PropertyCardsData[i].angle;
        this.PropertyCards[i]['color']=this.PropertyCardsData[i].color;
        this.PropertyCards[i]['alpha']=this.PropertyCardsData[i].alpha;
        this.PropertyCards[i]['name']=this.PropertyCardsData[i].name;
        this.PropertyCards[i]['rent']=this.PropertyCardsData[i].rent;
        this.PropertyCards[i]['type']=this.PropertyCardsData[i].type;
        this.PropertyCards[i]['icon']=this.PropertyCardsData[i].icon;
        this.PropertyCards[i].drawProperty();
      }
    }
    //console.log(this.PropertyCards);



  },

  initializePlayers: function() {
    console.log('client/src/game/states/boardone.js - initializePlayers');
    for(var i in this.players) {
      var data = this.players[i];
      //console.log(data);
      if(data.id == this.playerId) {
        this.Currentplayer = new Player(data.x, data.y, data.id, data.color, data);
        this.Currentplayer['cash'] = data.cash;

        //console.log(this.Currentplayer);
      } else {
        this.remotePlayers[data.id] = new RemotePlayer(data.x, data.y, data.id, data.color, data);
      }
    }
  },

  tearDownMap: function() {
    console.log('client/src/game/states/boardone.js - tearDownMap');

  },

  initializeMap: function() {
    console.log('client/src/game/states/boardone.js - initializeMap');
    // This call to add.tilemap doesn't actually add anything to the game, it just creates a tilemap.
    //  this.map = game.add.tilemap(this.tilemapName);
    var mapInfo = MapInfo[this.tilemapName];

    //Setup the General Stage

    this.map = game.add.image(game.world.centerX,game.world.centerY,'empty_background');
    this.map.anchor.setTo(0.5,0.5);

    //this.map_debuggrid =  game.add.image(game.world.centerX,game.world.centerY,'debuggrid');
    //debuggrid.anchor.setTo(0.5,0.5);

    this.initializePropertyCards();


      //create turn status icon
    //  this.turn_icon = game.add.sprite(400,0,'atlas','turn_hero.png');
    //  this.turn_icon.anchor.setTo(0.5,0);

    //create turn status icon
    this.turn_icon = this.add.sprite(50,0,'IconButton');
    this.turn_icon.anchor.setTo(0.5,0);

    //create dice status icon
    this.dice_icon1 = this.add.sprite(50,100,'atlas','dice_one.png');
    this.dice_icon1.anchor.setTo(0.5,0);

    //create dice status icon
    this.dice_icon2 = this.add.sprite(150,100,'atlas','dice_one.png');
    this.dice_icon2.anchor.setTo(0.5,0);


    //create roll dice button
    this.roll_btn = this.add.button(this.world.centerX,this.world.centerY,'atlas',this.PlayerRollDice,this,'dice_over_btn.png','dice_btn.png','dice_over_btn.png','dice_btn.png');
    this.roll_btn.anchor.setTo(0.5,0.5);
    if (this.playerId != this.ActivePlayer){
        this.roll_btn.kill();
    };

    //create exit button
    this.exit_btn = this.add.button(1050,20,'atlas',this.GameExit,this,'exit_over_btn.png','exit_btn.png','exit_over_btn.png','exit_btn.png');
    this.exit_btn.anchor.setTo(0.5,0);

    //create player token

    //  this.playerbank = this.add.sprite(900,630,'mint_textures','mint/bank.png');
    //    this.playerbank.scale.setTo(0.78125,0.78125);
    //this.player.scale.setTo(0.3,0.3);
    //    this.playerbank.anchor.setTo(0.5,0.5);

    //create bank icon
    this.bank = this.add.sprite(50,240,'mint_textures','mint/bank.png');
    this.bank.anchor.setTo(0.5,0.5);

    this.label_bankcash = game.add.text(150 ,240 ,mapInfo.bankCash, { font: "24px Arial", fill: '#000000', align: 'left' });
    this.label_bankcash.anchor.setTo(0.5, 0.5);

    this.label_MapCurrency = game.add.text(100,210, " µMINT", { font: "24px Arial", fill: '#000000', align: 'center' });
    this.label_MapCurrency.anchor.setTo(0.5, 0.5);
    //TextConfigurer.configureText(this.label_MapCurrency, "white", 16);


    //create turn status icon
    this.WOF_icon = this.add.sprite(this.world.centerX,this.world.centerY - 200,'IconButton');
    this.WOF_icon.anchor.setTo(0.5,0);

    this.label_WOF_winner = game.add.text(this.world.centerX,this.world.centerY -200 , "Wheel of Fortune Winner", { font: "24px Arial", fill: '#000000', align: 'left' });
    this.label_WOF_winner.anchor.setTo(0.5, 0.5);


    this.label_WOF_cash = game.add.text(this.world.centerX,this.world.centerY -100 , "0 µMint", { font: "24px Arial", fill: '#000000', align: 'left' });
    this.label_WOF_cash.anchor.setTo(0.5, 0.5);

    //TextConfigurer.configureText(this.label_MapCurrency, "white", 16);





    // Send map data to server so it can do collisions.
    // TODO: do not allow the game to start until this operation is complete.

    //, {tiles: blockLayerData.data, height: blockLayerData.height, width: blockLayerData.width, destructibleTileId: mapInfo.destructibleTileId}
    socket.emit("register map");
  },

  onMovePlayer: function(data) {

    console.log('client/src/game/states/boardone.js - onMovePlayer');
    //console.log(data);

    var player = this.players[data.id];
    this.players[data.id].player_gridX=data.gridX;
    this.players[data.id].player_gridY=data.gridY;
    this.players[data.id].x=data.x;
    this.players[data.id].y=data.y;
    this.players[data.id].Nr_rounds=data.playerdata.Nr_rounds;
    this.Currentplayer.MovePlayer(this.players[data.id]);
    //  console.log('player');
    //  console.log(player);
    //console.log(this.players);

    if(data.id == this.playerId ) {
      //console.log('client/src/game/states/boardone.js - onMovePlaye Ids are');
      var player = this.players[data.id];
      this.Currentplayer.player_gridX=data.gridX;
      this.Currentplayer.player_gridY=data.gridY;
      this.Currentplayer.x=data.x;
      this.Currentplayer.y=data.y;
      //console.log(this.players[data.id].cash);
      this.Currentplayer.label_playercash.setText(this.players[data.id].cash);
      this.Currentplayer.label_Round.setText('Round ' + this.players[data.id].Nr_rounds);
    }

    if(data.id != this.playerId ) {
      //console.log('client/src/game/states/boardone.js - onMovePlaye Ids are not identical');
      var player = this.players[data.id];
    //  this.remotePlayers[data.id].player_gridX=data.gridX;
    //  this.remotePlayers[data.id].player_gridY=data.gridY;
      this.remotePlayers[data.id].x=data.x;
      this.remotePlayers[data.id].y=data.y;

    }
    var data = { id:this.playerId };
    this.onCheckProperties(data);

    socket.emit("onEndMovement",{ id:this.playerId });




  },

  onRemovePlayer: function(data) {
    console.log('client/src/game/states/boardone.js - onRemovePlayer');
  },

  onNextPlayerActivateDice: function(data) {
    console.log('client/src/game/states/boardone.js - onNextPlayerActivateDice');
    //create roll dice button
    this.ActivePlayer = data.ActivePlayer;
    //console.log(game);
    this.roll_btn = this.add.button(this.world.centerX,this.world.centerY,'atlas',this.PlayerRollDice,this,'dice_over_btn.png','dice_btn.png','dice_over_btn.png','dice_btn.png');
    this.roll_btn.anchor.setTo(0.5,0.5);
    if (this.playerId != this.ActivePlayer){
        this.roll_btn.kill();
    };
  },

  onKillPlayer: function(data) {
    console.log('client/src/game/states/boardone.js - onKillPlayer');
  },

  PlayerRollDice: function(data){
    console.log('client/src/game/states/boardone.js - PlayerRollDice');
      //this.roll_btn.kill();
      socket.emit("onRollDice", {id: this.playerId});
      //      console.log(this.ActivePlayer);
      //      console.log(this.playerId);

  },

  GetDice1Output: function(dice_out){
    //create random dice output
    //  var dice_out = Math.round((Math.random()*5))+1;
    //reflect the output on the dice_icon ui on the top bar
    switch(dice_out){
      case 1:
        this.dice_icon1.frameName = "dice_one.png";
        break;
      case 2:
        this.dice_icon1.frameName = "dice_two.png";
        break;
      case 3:
        this.dice_icon1.frameName = "dice_three.png";
        break;
      case 4:
        this.dice_icon1.frameName = "dice_four.png";
        break;
      case 5:
        this.dice_icon1.frameName = "dice_five.png";
        break;
      case 6:
        this.dice_icon1.frameName = "dice_six.png";
        break;
    }
    //return dice_out;
  },

  GetDice2Output: function(dice_out){
    //create random dice output
    //var dice_out = Math.round((Math.random()*5))+1;
    //reflect the output on the dice_icon ui on the top bar
    switch(dice_out){
      case 1:
        this.dice_icon2.frameName = "dice_one.png";
        break;
      case 2:
        this.dice_icon2.frameName = "dice_two.png";
        break;
      case 3:
        this.dice_icon2.frameName = "dice_three.png";
        break;
      case 4:
        this.dice_icon2.frameName = "dice_four.png";
        break;
      case 5:
        this.dice_icon2.frameName = "dice_five.png";
        break;
      case 6:
        this.dice_icon2.frameName = "dice_six.png";
        break;
    }
    //return dice_out;
  },

  generateItemEntity: function(itemId, row, col) {
     var imageKey = PowerupImageKeys[itemId];
     var item = new Phaser.Sprite(game, col * TILE_SIZE, row * TILE_SIZE, TEXTURES, imageKey);
     game.physics.enable(item, Phaser.Physics.ARCADE);
     this.items[row + "." + col] = item;

     game.world.addAt(item, 2);
  }

};
