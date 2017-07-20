class Boot {
  preload() {
  console.log("Boot.preload")  }
    create() {
console.log("Boot.create")
game.state.start("Load")
    }
}

class Load {
  preload() {
console.log("Loading...")
this.load.spritesheet("noice", "assets/knoit.png", 56, 56, 1)
this.load.spritesheet("Background", "assets/Background.png",320,568,5)
this.load.spritesheet("blob", "assets/demonJello.png",50, 36, 1)

  }
  create() {
console.log("Loaded")
game.state.start("Play")
  }
}

class Play{
  preload() {
    this.bg = this.add.sprite(0,0,"Background")
    this.bg.animations.add("medivalbg")
    this.bg.animations.play("medivalbg",2,true)
    }

    create() {

      }

    update() {

    }


  create() {
    console.log("Playing")
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // noice
    this.noice = this.add.sprite(150,-20, "noice")
    game.physics.arcade.enable(this.noice)
    this.noice.body.collideWorldBounds = true
    this.noice.body.gravity.y = 1000
    this.noice.body.bounce.setTo(0.6)
    this.noice.body.velocity.y = -400

    //blob
    this.blob = this.add.sprite(-20,300, "blob")
    game.physics.arcade.enable(this.blob)
    this.blob.body.collideWorldBounds = false
    this.blob.body.gravity.y = 1000
    this.blob.body.bounce.setTo(0.6)
    this.blob.body.velocity.y = -400

    this.cursors = game.input.keyboard.createCursorKeys()

  }
  update(){

    game.physics.arcade.collide(this.noice,this.blob)

    if (this.cursors.left.isDown) {
      this.noice.body.velocity.x = -100
    }
    if (this.cursors.right.isDown) {
      this.noice.body.velocity.x = 100
    }
    if(this.cursors.up.isDown) {
      this.noice.body.velocity.y = -100
    }
    if (this.cursors.down.isDown){
        this.noice.body.velocity.y = 100
    }
    if (this.blob.y >= 500) {
      this.blob.body.velocity.y = 100
    }

    if (this.blob.y > 568 || this.blob.x < 0 || this.blob.x > 320) {
      this.blob.y = -30
      this.blob.x = game.rnd.integerInRange(0,320)
      this.blob.body.velocity.y = 10
      this.blob.body.velocity.x = 0
    }
  }

  handleCollision(ob1,ob2) {
    console.log("Ouch")
  }
}




var game = new Phaser.Game(320,568);
game.state.add("Boot", Boot)
game.state.add("Load", Load)
game.state.add("Play", Play)
game.state.start("Boot")
