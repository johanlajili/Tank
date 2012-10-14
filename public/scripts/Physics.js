game.Physics = function(){
   
     this.init = function() {
         this.b2Vec2 = Box2D.Common.Math.b2Vec2
         this.b2BodyDef = Box2D.Dynamics.b2BodyDef
         this.b2Body = Box2D.Dynamics.b2Body
         this.b2FixtureDef = Box2D.Dynamics.b2FixtureDef
         this.b2Fixture = Box2D.Dynamics.b2Fixture
         this.b2World = Box2D.Dynamics.b2World
         this.b2MassData = Box2D.Collision.Shapes.b2MassData
         this.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
         this.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
         this.b2DebugDraw = Box2D.Dynamics.b2DebugDraw
         
         this.world = new this.b2World(
               new this.b2Vec2(0, 0)    //gravity
            ,  false                 //allow sleep
         );
      }

      this.createFixeBlock = function(x,y,w,h)
      {
         var fixDef = new this.b2FixtureDef;
         fixDef.density = 0;
         fixDef.friction = 0;
         fixDef.restitution = 0;
         
         var bodyDef = new this.b2BodyDef;
         
         //create ground
         bodyDef.type = this.b2Body.b2_staticBody;
         bodyDef.position.x = metre(x);
         bodyDef.position.y = metre(y);
         fixDef.shape = new this.b2PolygonShape;
         fixDef.shape.SetAsBox(metre(w), metre(h));
         this.world.CreateBody(bodyDef).CreateFixture(fixDef);
      }

      this.createTank = function(posX,posY,w,h)
      {
         var fixDef = new this.b2FixtureDef;
         fixDef.density = 0.1;
         fixDef.friction = 0;
         fixDef.restitution = 0.1;
         
         var bodyDef = new this.b2BodyDef;
         bodyDef.type = this.b2Body.b2_dynamicBody;
         bodyDef.position.x = metre(posX);
         bodyDef.position.y = metre(posY); 
         fixDef.shape = new this.b2PolygonShape;
         fixDef.shape.SetAsBox(metre(w), metre(h));
       return(this.world.CreateBody(bodyDef).CreateFixture(fixDef));
      
      }

      this.update = function()
      { 
         this.world.Step(
               1 / 60   //frame-rate
            ,  10       //velocity iterations
            ,  10       //position iterations
         );
         this.world.ClearForces();
      }

      this.init();
}