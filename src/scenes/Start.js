import gameState from '../gameData.js';
import MechanicsManager from '../mechanicsManager.js';

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
        this.mechanicsManager = null; // Will be initialized in create
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/phaser.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        const logo = this.add.image(640, 200, 'logo');

        const ship = this.add.sprite(640, 360, 'ship');

        ship.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });

        ship.play('fly');

        this.tweens.add({
            targets: logo,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });

        // Initialize Mechanics Manager
        this.mechanicsManager = new MechanicsManager(this); // Pass the scene instance
        gameState.isCombatActive = true; // Start combat when the scene is created

        // Add UI elements
        const uiTextStyle = { fontSize: '20px', fill: '#ffffff' };

        this.goldText = this.add.text(10, 10, 'Gold: 0', uiTextStyle);
        this.woodText = this.add.text(10, 40, 'Wood: 0', uiTextStyle);
        this.stoneText = this.add.text(10, 70, 'Stone: 0', uiTextStyle);

        this.playerHealthText = this.add.text(10, 100, 'Player Health: 100', uiTextStyle);
        this.enemyHealthText = this.add.text(10, 130, 'Enemy Health: 50', uiTextStyle);
        this.combatStatusText = this.add.text(10, 160, 'Combat: Active', uiTextStyle);
    }

    update(time, delta) {
        this.background.tilePositionX += 2;

        // Update game mechanics using the Mechanics Manager
        if (this.mechanicsManager) {
            this.mechanicsManager.update(delta);
        }

        // Update UI elements
        this.goldText.setText('Gold: ' + gameState.resources.gold.toFixed(2));
        this.woodText.setText('Wood: ' + gameState.resources.wood.toFixed(2));
        this.stoneText.setText('Stone: ' + gameState.resources.stone.toFixed(2));

        this.playerHealthText.setText('Player Health: ' + gameState.playerStats.health.toFixed(2));
        this.enemyHealthText.setText('Enemy Health: ' + gameState.currentEnemy.enemyHealth.toFixed(2));
        this.combatStatusText.setText('Combat: ' + (gameState.isCombatActive ? 'Active' : 'Inactive'));
    }

}
