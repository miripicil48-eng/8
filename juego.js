class Juego extends Phaser.Scene {

    constructor() {
        super("Juego");
    }

    create() {
        let ancho = this.scale.width;
        let alto = this.scale.height;

        //  MÚSICA DE FONDO
        this.musicaFondo = this.sound.add("musica_juego", { loop: true, volume: 0.4 });
        this.musicaFondo.play();

        // Variables de estado
        this.rosasRecogidas = 0;
        this.metaRosas = 4;
        this.esInmune = false;
        this.nivelTerminado = false;

        // Fondo y Suelo
        this.fondo = this.add.tileSprite(0, 0, ancho, alto, "fondo").setOrigin(0, 0).setDepth(0);
        this.suelo = this.physics.add.staticGroup();
        this.suelo.create(ancho / 2, alto - 20, "suelo").setDisplaySize(ancho, 40).refreshBody();
        this.suelo.setDepth(1);

        // Jugador 
        this.jugador = this.physics.add.sprite(150, alto - 100, "oso");
        this.jugador.setScale(2).setDepth(2); 
        this.jugador.body.setSize(30, 41);
        this.jugador.body.setOffset(17, 19);
        this.jugador.setCollideWorldBounds(true);
        
        // Gravedad 
        this.jugador.setGravityY(1500); 
        
        this.jugador.body.setMass(0.1); 
        this.jugador.setBounce(0, 0);   

        this.jugador.play('caminar_oso');
        this.physics.add.collider(this.jugador, this.suelo);

        //Grupos
        this.obstaculos = this.physics.add.group();
        this.plataformas = this.physics.add.group();
        this.rosas = this.physics.add.group();
        this.powers = this.physics.add.group(); 

       
        this.textoPuntaje = this.add.text(ancho - 20, 20, 'Rosas: 0/4', {
            fontSize: '24px', fill: '#FFC0CB', fontFamily: 'Arial', fontWeight: 'bold'
        }).setOrigin(1, 0).setDepth(3);

        
        this.physics.add.collider(this.jugador, this.plataformas);
        this.physics.add.overlap(this.jugador, this.rosas, this.recogerRosa, null, this);
        this.physics.add.overlap(this.jugador, this.powers, this.activarInmunidad, null, this); 
        
        this.physics.add.overlap(this.jugador, this.obstaculos, () => {
            if (!this.esInmune && !this.nivelTerminado) {
                this.nivelTerminado = true;
                this.musicaFondo.stop();
                this.scene.start("GameOver");
            }
        });

       
        this.mapaNivel = [
            { tiempo: 500, tipo: 0, creado: false },
            { tiempo: 1500, tipo: 1, creado: false },
            { tiempo: 2500, tipo: 2, creado: false },
            { tiempo: 3500, tipo: 2, creado: false },
            { tiempo: 4500, tipo: 0, creado: false },
            { tiempo: 6000, tipo: 1, creado: false },
            { tiempo: 7500, tipo: 0, creado: false },
            { tiempo: 9000, tipo: 2, creado: false },
            { tiempo: 10000, tipo: 2, creado: false },
            { tiempo: 12000, tipo: 1, creado: false },
            { tiempo: 14000, tipo: 0, creado: false },
            { tiempo: 16000, tipo: 4, creado: false },
            { tiempo: 18000, tipo: 1, creado: false },
            { tiempo: 19500, tipo: 0, creado: false },
            { tiempo: 21000, tipo: 2, creado: false },
            { tiempo: 22500, tipo: 2, creado: false },
            { tiempo: 25000, tipo: 0, creado: false },
            { tiempo: 26500, tipo: 1, creado: false },
            { tiempo: 28000, tipo: 0, creado: false },
            { tiempo: 30000, tipo: 2, creado: false },
            { tiempo: 31500, tipo: 2, creado: false },
            { tiempo: 33000, tipo: 1, creado: false },
            { tiempo: 35000, tipo: 0, creado: false },
            { tiempo: 37000, tipo: 1, creado: false },
            { tiempo: 39000, tipo: 2, creado: false },
            { tiempo: 41000, tipo: 0, creado: false },
            { tiempo: 43000, tipo: 1, creado: false },
            { tiempo: 46000, tipo: 2, creado: false },
            { tiempo: 48000, tipo: 2, creado: false },
            { tiempo: 52000, tipo: 1, creado: false },
            { tiempo: 58000, tipo: 3, creado: false },
            { tiempo: 61000, tipo: 0, creado: false },
            { tiempo: 62500, tipo: 1, creado: false },
            { tiempo: 64000, tipo: 0, creado: false },
            { tiempo: 65500, tipo: 2, creado: false },
            { tiempo: 67000, tipo: 2, creado: false },
            { tiempo: 69000, tipo: 4, creado: false },
            { tiempo: 72000, tipo: 1, creado: false },
            { tiempo: 73500, tipo: 0, creado: false },
            { tiempo: 75000, tipo: 1, creado: false },
            { tiempo: 77000, tipo: 2, creado: false },
            { tiempo: 78500, tipo: 2, creado: false },
            { tiempo: 81000, tipo: 0, creado: false },
            { tiempo: 83000, tipo: 1, creado: false },
            { tiempo: 85000, tipo: 0, creado: false },
            { tiempo: 88000, tipo: 2, creado: false },
            { tiempo: 90000, tipo: 2, creado: false },
            { tiempo: 95000, tipo: 1, creado: false },
            { tiempo: 100000, tipo: 0, creado: false },
            { tiempo: 105000, tipo: 1, creado: false },
            { tiempo: 110000, tipo: 2, creado: false },
            { tiempo: 118000, tipo: 3, creado: false },
            { tiempo: 121000, tipo: 0, creado: false },
            { tiempo: 122500, tipo: 1, creado: false },
            { tiempo: 124000, tipo: 2, creado: false },
            { tiempo: 125500, tipo: 2, creado: false },
            { tiempo: 130000, tipo: 4, creado: false },
            { tiempo: 135000, tipo: 0, creado: false },
            { tiempo: 140000, tipo: 1, creado: false },
            { tiempo: 145000, tipo: 2, creado: false },
            { tiempo: 155000, tipo: 0, creado: false },
            { tiempo: 165000, tipo: 1, creado: false },
            { tiempo: 178000, tipo: 3, creado: false },
            { tiempo: 185000, tipo: 2, creado: false },
            { tiempo: 190000, tipo: 3, creado: false }
        ];

        this.relojNivel = 0;
        this.input.keyboard.on("keydown-SPACE", this.saltar, this);
        this.input.on("pointerdown", this.saltar, this);
    }

    crearObjeto(tipo) {
        let ancho = this.scale.width;
        let alto = this.scale.height;
        let sueloY = this.suelo.children.entries[0].y;

        if (tipo === 4) {
            let pwr = this.powers.create(ancho + 100, alto - 250, "power");
            pwr.setScale(1.2).setDepth(2);
            pwr.body.allowGravity = false;
            pwr.setVelocityX(-250);
        } else if (tipo === 3) {
            let rosa = this.rosas.create(ancho + 100, Phaser.Math.Between(alto - 150, alto - 300), "rosa");
            rosa.setScale(1.2).setDepth(2);
            rosa.body.allowGravity = false;
            rosa.setVelocityX(-250);
        } else if (tipo === 2) {
            let plat = this.plataformas.create(ancho + 100, alto - 180, "plataforma");
            plat.setDepth(2);
            plat.body.allowGravity = false;
            plat.body.setImmovable(true); 
            plat.body.setFriction(0, 0);
            
            plat.body.checkCollision.down = false;
            plat.body.checkCollision.left = false;
            plat.body.checkCollision.right = false;
            
            plat.setVelocityX(-250);
        } else {
            let asset = (tipo === 0) ? "spike_anim" : "sillon_anim";
            let anim = (tipo === 0) ? "movimiento_vela" : "movimiento_sillon";
            let obj = this.obstaculos.create(ancho + 50, sueloY - 70, asset);
            obj.setDepth(2).play(anim).setScale(1.5);
            obj.body.setSize(tipo === 1 ? 50 : 25, tipo === 1 ? 30 : 40);
            obj.body.setOffset(tipo === 1 ? 7 : 20, tipo === 1 ? 30 : 24);
            obj.body.allowGravity = false; 
            obj.setVelocityX(-250);
        }
    }

    activarInmunidad(jugador, power) {
        power.destroy();
        this.esInmune = true;
        this.jugador.setAlpha(0.8);
        this.jugador.setTint(0x00ffff);

        this.time.delayedCall(5000, () => {
            this.esInmune = false;
            this.jugador.setAlpha(1);
            this.jugador.clearTint();
        });
    }

    recogerRosa(jugador, rosa) {
        rosa.destroy();
        this.rosasRecogidas++;
        this.textoPuntaje.setText('Rosas: ' + this.rosasRecogidas + '/' + this.metaRosas);
        
        if (this.rosasRecogidas >= this.metaRosas) {
            this.nivelTerminado = true;
            this.musicaFondo.stop();
            this.scene.start("Win");
        }
    }

    saltar() {
        if (this.jugador.body.blocked.down || this.jugador.body.touching.down) {
            // --- AJUSTE: Salto más alto (-850 es más fuerte que -750) ---
            this.jugador.setVelocityY(-850); 
        }
    }

    update(time, delta) {
        if (this.nivelTerminado) return;

        this.jugador.setVelocityX(0); 
        this.fondo.tilePositionX += 3;

        if (delta) this.relojNivel += delta;

        this.mapaNivel.forEach(item => {
            if (!item.creado && this.relojNivel >= item.tiempo) {
                this.crearObjeto(item.tipo);
                item.creado = true;
            }
        });

        [this.obstaculos, this.plataformas, this.rosas, this.powers].forEach(grupo => {
            grupo.children.each(obj => { if (obj && obj.x < -100) obj.destroy(); });
        });
    }
}