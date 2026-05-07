const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false // Esto te ayuda a ver los cuadros de colisión 
        }
    },
    // 
    scene: [Boot, Carga, Inicio, Juego, GameOver, Win] 
};

window.onload = function(){ 
    new Phaser.Game(config); 
}