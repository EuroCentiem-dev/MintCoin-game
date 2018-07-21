//var Bomb = require("./bomb");
var TextureUtil = require("../util/texture_util");

var DEFAULT_PLAYER_SPEED = 180;
var PLAYER_SPEED_POWERUP_INCREMENT = 60;

var Player = function(x, y, id, color) {
  this.firstFrame = this.getFrame(color, "01");
	Phaser.Sprite.call(this, game, x, y, TEXTURES, this.firstFrame);

  this.spawnPoint = {x: x, y: y};
  this.cash = 10;
  this.id = id;
  this.facing = "down";
  this.anchor.setTo(.5, .5);
  this.bombButtonJustPressed = false;
  this.speed = DEFAULT_PLAYER_SPEED;
  this.firstFrame = this.getFrame(color, "01");

  this.playerAvatar  = this.getAvatar(color);
  Phaser.Sprite.call(this, game, x, y, 'mint_textures', this.playerAvatar);

  //create player1 icon
  this.PlayerIcon = game.add.sprite(50,290,'mint_textures',this.playerAvatar);
  this.PlayerIcon.anchor.setTo(0.5,0.5);

  this.label_playercash = game.add.text(150 ,290 ,this.cash, { font: "24px Arial", fill: '#000000', align: 'left' });
  this.label_playercash.anchor.setTo(0.5, 0.5);

  this.label_Round = game.add.text(game.world.centerX,700, " Round 0 ", { font: "24px Arial", fill: '#000000', align: 'center' });
  this.label_Round.anchor.setTo(0.5, 0.5);


  //image, sprite, audio and others are all methods of the factory
  ///game.add.image(x, y, this.playerAvatar);


//  this.avatar = game.add.sprite(x,y, 'mint_textures',this.playerAvatar);
  //this.avatar.scale.setTo(0.78125,0.78125);
  //this.avatar.anchor.setTo(0.5,0.5)
  //this.avatar_tween = game.add.tween(this.avatar);



  this.spawnPoint = {x: x, y: y};
  this.id = id;
  this.anchor.setTo(.5, .5);
  this.firstFrame = this.getFrame(color, "01");

	game.physics.enable(this, Phaser.Physics.ARCADE);

  this.body.setSize(15, 16, 1, 15);

	game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.handleInput = function() {
  console.log('client/src/game/entities/player.js - handleInput ');
//  this.handleMotionInput();
  //this.handleBombInput();
};

Player.prototype.MovePlayer = function(data) {
  console.log('client/src/game/entities/player.js - MovePlayer ' + this.id);
  console.log(data);
  if(this.id == data.id){
    console.log('client/src/game/entities/player.js - MovePlayer Verified  ' + this.id);
  //  this.avatar_tween = game.add.tween(this.playerAvatar);
  //  this.avatar_tween.to({x:data.gridX,y:data.gridY},1000,'Linear');
  //  this.avatar_tween.start();
    console.log('client/src/game/entities/player.js - MovePlayer tween done  ' + this.id);

  }
  console.log('client/src/game/entities/player.js - MovePlayer Verified  ' + this.id);
  this.avatar_tween = game.add.tween(this.playerAvatar);
  this.avatar_tween.to({x:data.gridX,y:data.gridY},1000,'Linear');
  this.avatar_tween.start();
//  console.log(this);
//  this.avatar_tween = game.add.tween(this.playerAvatar);

//    console.log('client/src/game/entities/player.js - MovePlayer ' + this.id);
//    this.avatar_tween.to({x:data.gridX,y:data.gridY},1000,'Linear');
//    this.avatar_tween.start();

//  this.handleMotionInput();
  //this.handleBombInput();
};

Player.prototype.handleMotionInput = function() {

  };

  Player.prototype.handleBombInput = function() {

  };

  Player.prototype.freeze = function() {

  };

  Player.prototype.applySpeedPowerup = function() {

  };

  Player.prototype.getFrame = function (prefix, number) {
    return "gamesprites/bomberman_" + prefix + "/bomberman_" + prefix + "_" + number + ".png";
  };

  Player.prototype.getAvatar = function (color) {
      return 'mint/user_m_' + color + '.png';
  };

  Player.prototype.reset = function() {
    this.x = this.spawnPoint.x;
    this.y = this.spawnPoint.y;
    this.frame = this.firstFrame;
    this.facing = "down";

    if(!this.alive) {
      this.revive();
    }
  };

module.exports = Player;
