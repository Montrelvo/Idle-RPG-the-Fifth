// src/scenes/GalaxyMap.js
import Phaser from 'phaser';
import gameState from '../gameData.js';

export class GalaxyMap extends Phaser.Scene {
    constructor() {
        super('GalaxyMap');
        this.map = [];
        this.tileSize = 32; // Assuming tiles are 32x32 pixels
        this.mapWidth = 10; // Number of tiles wide
        this.mapHeight = 10; // Number of tiles high
    }

    preload() {
        // Load your tile assets here. Assuming you have a tileset PNG.
        // For example: this.load.image('tiles', 'assets/tileset.png');
        // For now, we'll assume a simple 'space_tile' and 'planet_tile'
        this.load.image('space_tile', 'assets/space.png'); // Placeholder, replace with actual tile
        this.load.image('planet_tile', 'assets/phaser.png'); // Placeholder, replace with actual tile
    }

    create() {
        this.generateMap();
        this.renderMap();

        // Add a button to go back to the Start scene
        const backButton = this.add.text(10, 10, 'Back to Home Base', { fontSize: '24px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Start');
            });
    }

    generateMap() {
        // Simple random map generation
        for (let y = 0; y < this.mapHeight; y++) {
            let row = [];
            for (let x = 0; x < this.mapWidth; x++) {
                // 80% space, 20% planet
                row.push(Math.random() < 0.8 ? 'space_tile' : 'planet_tile');
            }
            this.map.push(row);
        }
        console.log("Generated Map:", this.map);
    }

    renderMap() {
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const tileType = this.map[y][x];
                this.add.image(x * this.tileSize + this.tileSize / 2, y * this.tileSize + this.tileSize / 2, tileType);
            }
        }
    }

    update(time, delta) {
        // Map specific update logic here
    }
}