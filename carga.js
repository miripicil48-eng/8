class Carga extends Phaser.Scene {
    constructor() {
        super("Carga");
    }

    preload() {
        let ancho = this.scale.width;
        let alto = this.scale.height;

        // 1. Mostrar el Logo (Cargado previamente en Boot)
        let logo = this.add.image(ancho / 2, alto / 2 - 150, "logo");
        logo.setScale(0.5);

        // 2. Texto de carga
        let texto = this.add.text(ancho / 2, alto / 2 - 60, "Cargando...", {
            fontSize: "30px",
            fill: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        // 3. Estructura de la Barra de Carga
        let barraFondo = this.add.rectangle(ancho / 2, alto / 2, 300, 30, 0xffffff, 0.3);
        let barra = this.add.rectangle(ancho / 2 - 150, alto / 2, 0, 30, 0xffffff).setOrigin(0, 0.5);

        // 4. Lógica del Progreso y Degradado Pastel
        this.load.on("progress", (value) => {
            barra.width = 300 * value;

            // Tu interpolación de colores rosa y azul
            let color = Phaser.Display.Color.Interpolate.ColorWithColor(
                new Phaser.Display.Color(255, 150, 200), // rosa
                new Phaser.Display.Color(150, 200, 255), // azul
                100,
                value * 100
            );
            barra.fillColor = Phaser.Display.Color.GetColor(color.r, color.g, color.b);
        });

        // ================= CARGA DE ASSETS REALES =================
        this.load.image("fondo", "fondoj.png");
        this.load.image("suelo", "piso.png");
        this.load.image("fondo_inicio", "fondoi.png");
        this.load.image("fondo_perder", "fondogo.png");
        this.load.image("fondo_ganar", "fondowin.png");
        this.load.image("plataforma", "plataforma.png");
        this.load.image("rosa", "rosa.png");
        this.load.image("power", "recogible.png");

       
          this.load.audio("musica_menu", "menu.mp3");
          this.load.audio("musica_ganar", "ganar.mp3");
          this.load.audio("musica_perder", "perder.mp3");
          this.load.audio("musica_juego", "salta.mp3");



       
        // Spritesheets animados
        this.load.spritesheet("oso", "freddy.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet("spike_anim", "vela.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet("sillon_anim", "sillon.png", {
          frameWidth: 64, // Ajusta si tu dibujo del sillón es más ancho
         frameHeight: 64
        });

        // Simulación de carga para que no desaparezca tan rápido
        for (let i = 0; i < 50; i++) {
            this.load.image("fake" + i, "piso.png");
        }
    }

    create() {
        // 5. Crear animaciones globales
        this.anims.create({
            key: 'caminar_oso',
            frames: this.anims.generateFrameNumbers('oso', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'movimiento_vela',
            frames: this.anims.generateFrameNumbers('spike_anim', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
       key: 'movimiento_sillon',
       frames: this.anims.generateFrameNumbers('sillon_anim', { start: 0, end: 2 }), 
       frameRate: 5, // Un poco más lento para que sea "relajante"
       repeat: -1
       });

        // 6. Pequeña pausa antes de ir al menú
        this.time.delayedCall(1500, () => {
            this.scene.start("Inicio");
        });
    }
}