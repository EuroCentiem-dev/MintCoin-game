var TextConfigurer = require("../util/text_configurer");
console.log('client/src/preloader.js loaded');

var Preloader = function () {};

module.exports = Preloader;

Preloader.prototype = {

  displayLoader: function() {

    this.text = game.add.text(game.camera.width / 2, game.camera.height / 2, "Loading... ");
    this.text.anchor.setTo(.5, .5);
    TextConfigurer.configureText(this.text, "white", 32);

    this.load.onFileComplete.add(function(progress) {
        this.text.setText("Loading... " + progress + "%");
    }, this);

    this.load.onLoadComplete.add(function() {
        game.state.start("TitleScreen");
    });
  },

  preload: function () {
    this.displayLoader();
    console.log('preloader started');

    this.load.atlasJSONHash("bbo_textures", "assets/textures/bbo_textures.png", "assets/textures/bbo_textures.json");
    this.load.atlasJSONHash("mint_textures", "assets/textures/mint.png", "assets/textures/mint.json");
    //this.load.atlasJSONHash("ssves_textures", "assets/textures/ssves_textures.png", "assets/textures/ssves_textures.json");

    //this.load.tilemap("levelOne", "assets/levels/level_one.json", null, Phaser.Tilemap.TILED_JSON);
    //this.load.tilemap("levelTwo", "assets/levels/level_two.json", null, Phaser.Tilemap.TILED_JSON);
    //this.load.image("tiles", "assets/tiles/tileset.png");
    //this.load.image("repeating_bombs", "/assets/repeating_bombs.png");
    this.load.image("empty_background", "/assets/images/empty_background.png");
    this.load.image("debuggrid", "/assets/images/debuggrid720.png");
    this.load.image("boardOne", "/assets/images/myboard2.png");
    this.load.image("CoinAlpha", "/assets/images/CoinAlpha.png");
    this.load.image("IconChance", "/assets/images/lightbulb.png");
    this.load.image("IconChest", "/assets/images/box_open.png");
    this.load.image("IconExchange", "/assets/images/stock.png");
    this.load.image("IconMasterNode", "/assets/images/usb.png");
    this.load.image("IconGoBack", "/assets/images/contact2.png");
    this.load.image("IconJail", "/assets/images/terminal.png");
    this.load.image("IconParking", "/assets/images/balance.png");
    this.load.image("IconButton", "/assets/images/button.png");
    this.load.atlasJSONHash("atlas","assets/textures/boardOne.png","assets/textures/boardOne.json");


    //this.load.audio("explosion", "assets/sounds/bomb.ogg");
    //this.load.audio("powerup", "assets/sounds/powerup.ogg");
    this.load.audio("click", "assets/sounds/click.ogg");

    window.buttonClickSound = new Phaser.Sound(game, "click", .25);
  }
};
