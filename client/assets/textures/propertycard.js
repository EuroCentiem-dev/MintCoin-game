var PropertyCard = function(facing, id, color) {
  this.icon = icon;
  this.xSpawn = xSpawn;
  this.ySpawn = ySpawn;
	this.facing = facing;
	this.id = id;
	this.color = color;
  this.owner = "";
  this.type="Title Deed";
  this.type="Miami AVE";
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

  this.ownall=false;

	this.wins = 0;
	this.alive = true;
	this.bombStrength = 1;
	this.bombCapacity = 3;
	this.numBombsAlive = 0;
}

PropertyCard.prototype = {
	resetForNewRound: function() {
		this.facing = "down";

	}
}

module.exports = PropertyCard;
