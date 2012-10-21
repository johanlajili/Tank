game.Physics = function(){

     
     this.init = function() {
         this.blocks = [];
         this.players = {};

         this.b2Vec2 = Box2D.Common.Math.b2Vec2;
         this.b2BodyDef = Box2D.Dynamics.b2BodyDef;
         this.b2Body = Box2D.Dynamics.b2Body;
         this.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
         this.b2Fixture = Box2D.Dynamics.b2Fixture;
         this.b2World = Box2D.Dynamics.b2World;
         this.b2MassData = Box2D.Collision.Shapes.b2MassData;
         this.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
         this.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
         this.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
         this.world = new this.b2World(
               new this.b2Vec2(0, 0)    //gravity
            ,  false                 //allow sleep
         );

         this.contactListener = new Box2D.Dynamics.b2ContactListener;
         this.contactListener.BeginContact = function(contact, manifold) {
            console.log("H");
            if (contact.m_fixtureA.m_body.m_userData != undefined && contact.m_fixtureA.m_body.m_userData.onCollision != undefined) {
               console.log("fucking col");
               contact.m_fixtureA.m_body.m_userData.onCollision(contact.m_fixtureB.m_body);
            }
            if (contact.m_fixtureB.m_body.m_userData != undefined && contact.m_fixtureB.m_body.m_userData.onCollision != undefined) {
               contact.m_fixtureB.m_body.m_userData.onCollision(contact.m_fixtureA.m_body);
            }
         };
         this.world.SetContactListener(this.contactListener);
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
         bodyDef.userData = {"type" : "wall"};
         fixDef.shape = new this.b2PolygonShape;
         fixDef.shape.SetAsBox(metre(w), metre(h));
         fixDef.filter.categoryBits   = CONFIG.wallBit;
         fixDef.filter.maskBits = CONFIG.bombBit | CONFIG.tankBit;
         this.world.CreateBody(bodyDef).CreateFixture(fixDef);
      }

      this.createTank = function(posX,posY,w,h, player)
      {
         var fixDef = new this.b2FixtureDef;
         fixDef.density = 0.1;
         fixDef.friction = 0;
         fixDef.restitution = 0.1;
         
         var bodyDef = new this.b2BodyDef;
         bodyDef.type = this.b2Body.b2_dynamicBody;
         bodyDef.position.x = metre(posX);
         bodyDef.position.y = metre(posY); 
         bodyDef.userData = player;
         fixDef.shape = new this.b2PolygonShape;
         fixDef.shape.SetAsBox(metre(w), metre(h));
         fixDef.filter.categoryBits   = CONFIG.tankBit;
         fixDef.filter.maskBits       = CONFIG.wallBit | CONFIG.bombBit; 
         this.players[player.id] = this.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
         this.players[player.id].bombs = {};
      }
      this.createBomb = function(posX,posY,rayon,bomb)
      {
         var fixDef = new this.b2FixtureDef;
         fixDef.density = 0.1;
         fixDef.friction = 0;
         fixDef.restitution = 1;

         var bodyDef = new this.b2BodyDef;
         bodyDef.type = this.b2Body.b2_dynamicBody;
         bodyDef.position.x = metre(posX);
         bodyDef.position.y = metre(posY); 
         bodyDef.userData = bomb;
         bodyDef.userData.onCollision = function(other){
            var bomb = CONTEXT.players[this.pId].bombs[this.bid];
            bomb.onCollision(other);       
         }
         fixDef.shape = new this.b2CircleShape(metre(rayon));
         fixDef.filter.categoryBits   = 0; 
         fixDef.filter.maskBits       = CONFIG.tankBit | CONFIG.wallBit;
         this.players[bomb.pId].bombs[bomb.bid] = this.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
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