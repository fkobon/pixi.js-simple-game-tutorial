
S.Enemy = function() {
    
    var textures = S.SpriteSheetTextures.getArray('e', '.png', 4);
    
    PIXI.MovieClip.call( this, textures );
    
    this.anchor.x = this.anchor.y = 0.5;
    
    this.visible = false;
    this.hitArea = new S.Rectangle(this.position.x, this.position.y, this.width, this.height);
    this.SPEED = 1;
};

S.Enemy.constructor = S.Enemy;
// Enemy object extend PIXI Movieclip object
S.Enemy.prototype = Object.create( PIXI.MovieClip.prototype );

/**
 * override updateTransform method, called each frame
 */
S.Enemy.prototype.alloc = function() {
    this.visible = true;
    this.play();
};
S.Enemy.prototype.canRealloc = function() {
    this.stop();
    this.visible = false;
    this.parent.pool.add(this);
};
S.Enemy.prototype.updateTransform = function() {
    if(this.playing)  {
        this.position.x = this.position.x - this.SPEED;  
        
        if(this.position.x + this.width < 0) {
            //this.dispatchEvent('LOOSE_A_LIFE');
            this.canRealloc();
        }
        
        //@todo : handle colision with ship/bullet
        //we update the hitArea
        this.hitArea.x = this.position.x;
        this.hitArea.y = this.position.y;
    }
    PIXI.MovieClip.prototype.updateTransform.call( this );
};