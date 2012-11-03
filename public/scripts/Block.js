function Block(args)
{
	this.x = args.x;
	this.y = args.y;
	this.w = args.w;
	this.h = args.h;
	this.realX = this.x*this.w;
	this.realY = this.y*this.h;
	this.centeredX = this.realX + this.w/2;
	this.centeredY = this.realY + this.h/2;
	this.type = "";
	this.theme = {
		x: 0,
		y: 0,
		w: this.w,
		h: this.h
	}


	this.destructible = false;
	this.solid = false;
	this.body = null;
	this.updateWithLetter = function(letter)
	{
		switch (letter)
		{
			case "x":
				this.type = "bordure";
				this.solid = true;
				this.destructible = false;
				this.theme.x = 96;
				this.theme.y = 0;
			break;
			case "e":
				this.type = "cassable"
				this.solid = true;
				this.destructible = true;
				this.theme.x = 192;
				this.theme.y = 0;
			break;
			case "o":
				this.type = "vide"
				this.solid = false;
				this.destructible = false;
				this.theme.x = 0;
				this.theme.y = 0;
			break;
			case "w":
				this.type = "block solide"
				this.solid = true;
				this.destructible = false;
				this.theme.x = 96;
				this.theme.y = 0;
			break;
		}
	}
	this.createBody = function()
	{
		if (this.solid != false)
		{
			this.body = game.physics.createFixeBlock(this.centeredX, this.centeredY, this.w/2, this.w/2,this.x, this.y);
		}
	}
	this.getRigidBody = function()
	{
		return this.body;
	}
	this.destroy = function()
	{
		game.physics.addToStack(this, "lateDestroy");
	}
	this.lateDestroy = function()
	{
		console.log("lateDestroy")
		game.physics.world.DestroyBody(this.getRigidBody());
	}
}