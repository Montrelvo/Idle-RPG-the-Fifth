// src/mechanicsManager.js

import { gameState } from './gameData.js';

/**
 * Manages the game's automated mechanics, such as resource generation and combat.
 */
export class MechanicsManager {

    constructor() {
        this.resourceGenerationTimer = 0;
        this.combatTimer = 0;
        this.generationInterval = 1000; // Generate resources every 1000ms (1 second)
        this.combatInterval = 2000; // Combat tick every 2000ms (2 seconds)
    }

    /**
     * Updates the game mechanics based on the elapsed time.
     * @param {number} delta - The time elapsed since the last frame in milliseconds.
     */
    update(delta) {
        this.updateResources(delta);
        this.runCombatTick(delta);
    }

    /**
     * Handles resource generation over time.
     * @param {number} delta - The time elapsed since the last frame in milliseconds.
     */
    updateResources(delta) {
        this.resourceGenerationTimer += delta;

        if (this.resourceGenerationTimer >= this.generationInterval) {
            gameState.resources.gold += 1;
            console.log('Gold:', gameState.resources.gold); // Log for now
            this.resourceGenerationTimer -= this.generationInterval;
        }
    }

    /**
     * Runs a combat tick if combat is active.
     * @param {number} delta - The time elapsed since the last frame in milliseconds.
     */
    runCombatTick(delta) {
        if (gameState.combat.isCombatActive) {
            this.combatTimer += delta;

            if (this.combatTimer >= this.combatInterval) {
                // Player attacks enemy
                gameState.currentEnemy.health -= gameState.playerStats.attack;
                console.log('Enemy Health:', gameState.currentEnemy.health);

                // Check if enemy is defeated
                if (gameState.currentEnemy.health <= 0) {
                    console.log('Enemy Defeated!');
                    gameState.combat.isCombatActive = false;
                    // Implement rewards and potentially spawn a new enemy here
                } else {
                    // Enemy attacks player (if enemy is not defeated)
                    gameState.playerStats.health -= gameState.currentEnemy.attack;
                    console.log('Player Health:', gameState.playerStats.health);

                    // Check if player is defeated
                    if (gameState.playerStats.health <= 0) {
                        console.log('Player Defeated!');
                        gameState.combat.isCombatActive = false;
                        // Implement game over or respawn logic here
                    }
                }

                this.combatTimer -= this.combatInterval;
            }
        }
    }

    // Add more methods here for other mechanics
}