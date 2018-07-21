var TextConfigurer = require('../util/text_configurer');

var PropertyCard = function() {
  this.icon = 'icon';
  this.xSpawn = 'xSpawn';
  this.ySpawn = 'ySpawn';
	this.facing = 'facing';
	this.id = 'id';
  this.currency = 'µMINT';
  this.width = 10;
  this.height = 10;
  this.angle=0;
	this.color = '#000000';
  this.alpha = 0;
  this.owner = "";
  this.type=1;
  this.name="Miami AVE";
  this.rent=11;
  this.t1_one_asset=55;
  this.t1_two_asset=160;
  this.t1_three_asset=475;
  this.t1_four_asset=650;

  this.t2_one_asset=800;
  this.t2_two_asset=1300;
  this.t2_three_asset=2500;
  this.t2_four_asset=800;

  this.mortage=75;
  this.t1_mortage=50;
  this.t2_mortage=50;
  //this.CoinLogo = game.cache.getBitmapData('Coin')
  //game.add.sprite(50,290,'mint_textures','mint/user_m_white.png');
  //game.add.image(0, 0, 'Coin');

  this.ownall=false;
  console.log('client/src/states/lobby.js create');

  this.CardActions = {
    empty: {
      outFrame: "lobby/slots/game_slot_01.png",
      overFrame: "lobby/slots/game_slot_02.png",
      text: "Host Game ", // For some reason, text gets slightly truncated if I don't append a space.
      callback: null
    },
    joinable: {
      outFrame: "lobby/slots/game_slot_03.png",
      overFrame: "lobby/slots/game_slot_04.png",
      text: "Join Game ",
      callback: null
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



}


PropertyCard.prototype = {
	resetForNewRound: function() {
	this.facing = "down";
	},

  ShowCard: function() {

    //    var BLACK_HEX_CODE = "#000000";
    console.log('client/src/game/entities/PropertyCard.js - ShowCard');
    console.log(this);

    //    this.dimGraphic = game.add.graphics(0, 0);
    //    this.dimGraphic.alpha = .7;
    //    this.dimGraphic.beginFill(BLACK_HEX_CODE, 1); // (color, alpha)
    //    this.dimGraphic.drawRect(0, 0, game.camera.width, game.camera.height);
    //    this.dimGraphic.endFill(); // Draw to canvas

    var centerX =  game.camera.width/2;
    var centerY =  game.camera.height/2;
    var LineY = 0;




    //this.card.endFill(); // Draw to canvas
    var drawnObject;
    var CoinLogo;

    var bmd = game.add.bitmapData(400, 600);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 400, 600);
    bmd.ctx.fillStyle = "#ffffff";
    //  bmd.ctx.alpha = 0.5;
    bmd.ctx.fill();
    bmd.ctx.lineWidth='6';
    bmd.ctx.strokeStyle='black';
    bmd.ctx.stroke();

    drawnObject = game.add.sprite(centerX, centerY, bmd);
    drawnObject.anchor.setTo(0.5, 0.5);
    bmd.ctx.beginPath();
    bmd.ctx.rect(20, 20, 360, 80);
    bmd.ctx.fillStyle = this.color;
    //  bmd.ctx.alpha = 0.5;
    bmd.ctx.fill();
    bmd.ctx.lineWidth='2';
    bmd.ctx.strokeStyle='black';
    bmd.ctx.stroke();

    //var img = game.load.image("Coin");

    bmd.draw('CoinAlpha',-50,135,400,400);
    LineY = 55;

    bmd.ctx.fillStyle = "#000000";
    bmd.ctx.font = '25px Arial';
    var textString = 'TITLE DEED';
    var textWidth = bmd.ctx.measureText(textString ).width;
    bmd.ctx.fillText(textString, 200 -(textWidth/2), LineY);


    LineY = LineY + 30;
    //    bmd.ctx.font = '25px san-serif';
    textString = this.name;
    textWidth = bmd.ctx.measureText(textString ).width;
    bmd.ctx.fillText(textString, 200 -(textWidth/2), LineY);



    LineY = LineY + 45;
    textString = "RENT: " + this.rent + " "+ this.currency;
    textWidth = bmd.ctx.measureText(textString ).width;
    bmd.ctx.fillText(textString, 200 -(textWidth/2), LineY);

    //  bmd.ctx.fillText("RENT: " + this.rent + " "+ this.currency, 30, LineY);

    bmd.ctx.font = '16px Arial';
    LineY = LineY + 100;
    bmd.ctx.fillText("with 1 Mint Plant", 20, LineY);
    bmd.ctx.fillText(this.t1_one_asset + " "+ this.currency, 200, LineY);

    LineY = LineY + 20;
    bmd.ctx.fillText("with 2 Mint Plants", 20, LineY);
    bmd.ctx.fillText(this.t1_two_asset + " "+ this.currency, 200, LineY);

    LineY = LineY + 20;
    bmd.ctx.fillText("with 3 Mint Plants", 20, LineY);
    bmd.ctx.fillText(this.t1_three_asset + " "+ this.currency, 200, LineY);

    LineY = LineY + 20;
    bmd.ctx.fillText("with 4 Mint Plants", 20, LineY);
    bmd.ctx.fillText(this.t1_four_asset + " "+ this.currency, 200, LineY);

    LineY = LineY + 20;
    bmd.ctx.fillText("with Big Fern", 20, LineY);
    bmd.ctx.fillText(this.t2_one_asset + " "+ this.currency, 200, LineY);

    LineY = LineY + 20;
    bmd.ctx.fillText("with Fork of August", 20, LineY);
    bmd.ctx.fillText(this.t2_two_asset + " "+ this.currency, 200, LineY);

    LineY = LineY + 40;
    bmd.ctx.fillText("Mortage Value", 20, LineY);
    bmd.ctx.fillText(this.mortage + " "+ this.currency, 200, LineY);

    LineY = LineY + 40;
    bmd.ctx.fillText("Mint Plant Cost", 20, LineY);
    bmd.ctx.fillText(this.mortage + " "+ this.currency, 200, LineY);

    LineY = LineY + 20;
    bmd.ctx.fillText("Big Fern Cost" , 20, LineY);
    bmd.ctx.fillText(this.mortage + " "+ this.currency, 200, LineY);

    LineY = LineY + 20;
    bmd.ctx.fillText("Fork of August Cost", 20, LineY);
    bmd.ctx.fillText(this.mortage + " "+ this.currency, 200, LineY);

    bmd.ctx.font = '14px Arial';
    bmd.ctx.fillText("The Rent will be doubled on all unimproved properties, ", 20, 560);
    bmd.ctx.fillText("If player owns all properties of that colorgroup ", 20, 580);


    drawnObject = game.add.sprite(centerX, centerY, bmd);
    drawnObject.anchor.setTo(0.5, 0.5);

        //  card.ctx.rect(0, (game.camera.height/3*1), game.camera.width, (game.camera.height/3*2));
        //  card.ctx.lineWidth='1';
        //  card.ctx.strokeStyle='black';
        //  card.ctx.stroke();
      //  }

    //    this.close_btn = game.add.button(game.camera.width/2,game.camera.height/3*2, TEXTURES, this.CardActions.callback, null, 'lobby/slots/game_slot_01.png', 'lobby/slots/game_slot_02.png');
    //    this.close_btn.anchor.setTo(0.5,0)
    //    this.close_btn.setDownSound(buttonClickSound);



  },

  drawProperty : function () {
    //type
    //1: Start
    //2: Title deed
    //3: community chest
    //4: Income Tax
    //5: Utility
    //6: Chance
    //7: Jail
    //8: Free parking
    //9: Go To Jail
    var xSpawnOffset=0;
    var ySpawnOffset=0;
    if (this.angle == 0){
      xSpawnOffset=0;
      ySpawnOffset=30;
    }
    if (this.angle == 90){
      xSpawnOffset=-30;
      ySpawnOffset=0;
    }

    if (this.angle == 180){
      xSpawnOffset=0;
      ySpawnOffset=0;
    }

    if (this.angle == 270){
      xSpawnOffset=30;
      ySpawnOffset=0;
    }

    var drawnObject;
    // If it is a title deed
    if (this.type == 2){
      var bmd = game.add.bitmapData(this.width, this.height);
      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, this.width, (this.height/3*1));
      bmd.ctx.fillStyle = this.color;
      bmd.ctx.alpha = 0.5;
      bmd.ctx.fill();
      bmd.ctx.lineWidth='1';
      bmd.ctx.strokeStyle='black';
      bmd.ctx.stroke();
      bmd.ctx.rect(0, (this.height/3*1), this.width, (this.height/3*2));
      bmd.ctx.lineWidth='1';
      bmd.ctx.strokeStyle='black';
      bmd.ctx.stroke();
    }



    if (this.type == 1 || this.type == 3 || this.type == 4 || this.type == 5 || this.type == 6 || this.type == 7 || this.type == 8 || this.type == 9){
      var bmd = game.add.bitmapData(this.width, this.height);
      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, this.width, this.height);
      bmd.ctx.lineWidth='1';
      bmd.ctx.strokeStyle='black';
      bmd.ctx.stroke();
    }
    if (this.type == 3 || this.type == 3 || this.type == 5 || this.type == 6 || this.type == 7 || this.type == 8 || this.type == 9){
      bmd.draw(this.icon,8,this.height/3,this.width/3*2,this.width/3*2);
    }


    if (this.type == 1 || this.type == 2 || this.type == 3 || this.type == 4 || this.type == 5 || this.type == 6  || this.type == 7 || this.type == 8 || this.type == 9){
      drawnObject = game.add.sprite(this.xSpawn, this.ySpawn, bmd);
      drawnObject.angle=this.angle;
      drawnObject.anchor.setTo(0.5, 0.5);
    }

      this.label_name = game.add.text(this.xSpawn - xSpawnOffset ,this.ySpawn - ySpawnOffset ,this.name,{ font: "9px Arial", fill: '#000000', align: 'center' });
      this.label_name.lineSpacing=-8 ;
      this.label_name.angle=this.angle ;
      this.label_name.anchor.setTo(0.5, 0.5);
    //TextConfigurer.configureText(this.label_name, "black", 12);
    if (this.type == 2 || this.type == 4 || this.type == 5 ){
      this.label_rent = game.add.text(this.xSpawn + xSpawnOffset,this.ySpawn + ySpawnOffset ,this.rent + '\n' + this.currency,{ font: "10px Arial", fill: '#000000', align: 'center' });
      this.label_rent.lineSpacing=-8;
      this.label_rent.angle = this.angle;
      this.label_rent.anchor.setTo(0.5, 0.25);
    //TextConfigurer.configureText(this.label_rent, "black", 12);
    }
  }
}

module.exports = PropertyCard;
