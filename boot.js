class Boot extends Phaser.Scene {

    constructor(){
        super("Boot");
    }

    preload(){
        // Logo
        this.load.image("logo", "logo.png");

       
    }

    create(){
        this.scene.start("Carga");
    }
}
