
class Inicio extends Phaser.Scene {

    constructor(){
        super("Inicio");
    }

    create(){
        let ancho = this.scale.width;
        let alto = this.scale.height;

        // 1. CONFIGURACIÓN DEL AUDIO
        // Creamos el objeto de sonido pero no le damos .play() directo todavía
        let musica = this.sound.add("musica_menu", { loop: true, volume: 0.5 });

        // FUNCIÓN PARA REPRODUCIR (El "Desbloqueador")
        const reproducirMusica = () => {
            if (!musica.isPlaying) {
                // Si el contexto de audio está suspendido (típico de Chrome), lo reanudamos
                if (this.sound.context.state === 'suspended') {
                    this.sound.context.resume();
                }
                musica.play();
            }
        };

        // Escuchamos UN SOLO CLIC en cualquier parte de la pantalla para activar el audio
        this.input.once('pointerdown', reproducirMusica);
        // También por si acaso presionan una tecla (como Espacio)
        this.input.keyboard.once('keydown', reproducirMusica);

        // 2. ELEMENTOS VISUALES
        let fondo = this.add.image(ancho/2, alto/2, "fondo_inicio");
        fondo.setDisplaySize(ancho, alto);
        fondo.setAlpha(0.8);

        let titulo = this.add.text(ancho/2, alto/2 - 100, "Teddy Run", {
            fontSize: "40px",
            fill: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.tweens.add({
            targets: titulo,
            scale: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        let boton = this.add.text(ancho/2, alto/2, "Play", {
    fontSize: "32px",
    fill: "#ffffff",
    fontStyle: "bold",
    backgroundColor: "#cc9f4bd2",
    padding: { x: 20, y: 10 }           
})
.setOrigin(0.5)
.setInteractive();

// Hover
boton.on("pointerover", () => boton.setScale(1.1));
boton.on("pointerout", () => boton.setScale(1));

// ESTA ES LA PARTE IMPORTANTE:
boton.on("pointerdown", () => {
    // 1. Detenemos TODA la música que se esté reproduciendo actualmente
    this.sound.stopAll(); 
    
    // O si prefieres detener solo esa canción específica:
    // musica.stop(); 

    // 2. Iniciamos el juego
    this.scene.start("Juego");
});

        // Instrucciones
        this.add.text(ancho/2, alto/2 + 80,
            "Toca la pantalla o presiona espacio para saltar",
            { fontSize: "25px", fill: "#ffffff", fontStyle: "bold"}
        ).setOrigin(0.5);
    }
}