class Win extends Phaser.Scene {

    constructor() {
        super("Win");
    }

    create() {
        let ancho = this.scale.width;
        let alto = this.scale.height;

        // 1. REPRODUCIR AUDIO DE VICTORIA
        // Usamos la llave que cargaste previamente
        let sonidoGanar = this.sound.add("musica_ganar", { loop: false, volume: 0.6 });
        
        // Verificamos el contexto por seguridad
        if (this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }
        
        sonidoGanar.play();

        // 2. Fondo
        let fondo = this.add.image(ancho / 2, alto / 2, "fondo_ganar");
        fondo.setDisplaySize(ancho, alto);
        
        fondo.setAlpha(0.9);
        fondo.setTint(0xffffff); 

        // 3. Título de Victoria (Rosa Pastel)
        let titulo = this.add.text(ancho / 2, alto / 2 - 120, "¡NIVEL COMPLETADO!", {
            fontSize: "55px",
            fill: "#FFC0CB", 
            fontStyle: "bold",
            stroke: "#ffffff",
            strokeThickness: 8
        }).setOrigin(0.5);

        this.tweens.add({
            targets: titulo,
            scale: 1.05,
            duration: 1200,
            yoyo: true,
            repeat: -1
        });

        // 4. Mensaje de logro
        this.add.text(ancho / 2, alto / 2 - 40, "¡Freddy consiguió todas sus rosas y salvó a su padre!", {
            fontSize: "28px",
            fill: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        // 5. Botón Volver a Jugar
        let botonMenu = this.add.text(ancho / 2, alto / 2 + 60, "Volver al Inicio", {
            fontSize: "32px",
            fill: "#ffffff",
            fontStyle: "bold",
            backgroundColor: "#cc9f4bd2",
            padding: { x: 20, y: 10 }           
        })
        .setOrigin(0.5)
        .setInteractive();

        botonMenu.on("pointerover", () => botonMenu.setScale(1.1));
        botonMenu.on("pointerout", () => botonMenu.setScale(1));

        botonMenu.on("pointerdown", () => {
            // DETENER AUDIO DE VICTORIA
            // Para que al volver al inicio empiece la música de menú limpia
            sonidoGanar.stop();
            this.scene.start("Inicio"); 
        });

        // 6. Decoración (La rosa giratoria)
        let decoracion = this.add.image(ancho / 2, alto / 2 + 180, "rosa");
        decoracion.setScale(2);
        this.tweens.add({
            targets: decoracion,
            angle: 360,
            duration: 4000,
            repeat: -1
        });
    }
}