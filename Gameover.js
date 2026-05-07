class GameOver extends Phaser.Scene {

    constructor(){
        super("GameOver");
    }

    create(){
        let ancho = this.scale.width;
        let alto = this.scale.height;

        // 1. REPRODUCIR AUDIO DE DERROTA
        // Lo añadimos sin loop (o con loop: false) porque suele ser un efecto corto
        let sonidoPerder = this.sound.add("musica_perder", { loop: false, volume: 0.6 });
        
        // Despertamos el audio por si el navegador lo bloqueó
        if (this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }
        
        sonidoPerder.play();

        // 2. Fondo
        let fondo = this.add.image(ancho/2, alto/2, "fondo_perder");
        fondo.setDisplaySize(ancho, alto);
        
        fondo.setAlpha(0.6);
        fondo.setTint(0xff0000); 

        // 3. Título de "¡PERDISTE!"
        let titulo = this.add.text(ancho/2, alto/2 - 100, "¡PERDISTE!", {
            fontSize: "60px",
            fill: "#ff0000",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        this.tweens.add({
            targets: titulo,
            scale: 1.05,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        // 4. Botón Reiniciar
        let botonReiniciar = this.add.text(ancho/2, alto/2 + 20, "Reiniciar", {
            fontSize: "32px",
            fill: "#ffffff",
            fontStyle: "bold",
            backgroundColor: "#cc9f4bd2",
            padding: { x: 20, y: 10 }           
        })
        .setOrigin(0.5)
        .setInteractive();

        botonReiniciar.on("pointerover", () => botonReiniciar.setScale(1.1));
        botonReiniciar.on("pointerout", () => botonReiniciar.setScale(1));

        botonReiniciar.on("pointerdown", () => {
            // DETENER EL SONIDO DE DERROTA
            // Así evitamos que se siga escuchando mientras el juego ya reinició
            sonidoPerder.stop();
            this.scene.start("Juego"); 
        });

        // 5. Texto secundario
        this.add.text(ancho/2, alto/2 + 100,
            "Inténtalo de nuevo",
            { fontSize: "20px", fill: "#ffffff", fontStyle: "italic"}
        ).setOrigin(0.5);
    }
}