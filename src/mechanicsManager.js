// src/mechanicsManager.js

import gameState from './gameData.js';

/**
 * Manages the game's automated mechanics, such as resource generation and combat.
 */
class MechanicsManager {
    constructor(scene) {
       
      this.resourceGenerationRate = {
            gold: 0.1, // Gold per second
            wood: 0.05, // Wood per second
            stone: 0.02, // Stone per second
            // Define rates for other resources here
        };
    }

    /**
     * Updates game mechanics based on the elapsed time.
     * @param {number} delta - The time elapsed since the last frame in milliseconds.
     */
    update(delta) {
        // Convert delta from milliseconds to seconds
        const deltaInSeconds = delta / 1000;

        this.updateResources(deltaInSeconds);
        this.runCombatTick(deltaInSeconds); // Implement combat later
    }

    /**
     * Updates resource amounts based on generation rates.
     * @param {number} deltaInSeconds - The time elapsed in seconds.
     */
    updateResources(deltaInSeconds) {
        for (const resource in this.resourceGenerationRate) {
            if (gameState.resources.hasOwnProperty(resource)) {
                gameState.resources[resource] += this.resourceGenerationRate[resource] * deltaInSeconds;
                // Optional: Add logic to update UI display for this resource
                // console.log(`${resource}: ${gameState.resources[resource].toFixed(2)}`); // For debugging
            }
        }
    }

    /**
     * Runs a combat tick to simulate automated combat.
     * @param {number} deltaInSeconds - The time elapsed in seconds.
     */
    runCombatTick(deltaInSeconds) {
        if (!gameState.isCombatActive) {
            return;
        }

        // Simple combat logic: player and enemy attack each other simultaneously
        const playerDamage = gameState.playerStats.attack * deltaInSeconds;
        const enemyDamage = gameState.currentEnemy.enemyAttack * deltaInSeconds;

        gameState.currentEnemy.enemyHealth -= playerDamage;
        gameState.playerStats.health -= enemyDamage;

        // Check for combat outcome
        if (gameState.currentEnemy.enemyHealth <= 0) {
            console.log("Player won the combat!");
            gameState.isCombatActive = false;
            // Implement rewards and transition to next state (e.g., next enemy, exploration)
            // For now, just reset enemy health for demonstration
            gameState.currentEnemy.enemyHealth = gameState.currentEnemy.maxEnemyHealth;
            gameState.isCombatActive = true; // Start next combat immediately for demonstration
        } else if (gameState.playerStats.health <= 0) {
            console.log("Player lost the combat!");
            gameState.isCombatActive = false;
            // Implement game over or retreat logic
            // For now, just reset player health for demonstration
            gameState.playerStats.health = gameState.playerStats.maxHealth;
            gameState.isCombatActive = true; // Restart combat immediately for demonstration
        }

        // Optional: Add logic to update UI display for health bars, combat log, etc.
        // console.log(`Player Health: ${gameState.playerStats.health.toFixed(2)}, Enemy Health: ${gameState.currentEnemy.enemyHealth.toFixed(2)}`); // For debugging
    }

    /**
     * Saves the current game state to localStorage.
     */
    saveGame() {
        try {
            const serializedGameState = JSON.stringify(gameState);
            localStorage.setItem('idleRpgSave', serializedGameState);
            console.log("Game saved successfully!");
        } catch (error) {
            console.error("Error saving game:", error);
        }
    }

    /**
     * Loads the game state from localStorage.
     * @returns {boolean} True if a game was loaded, false otherwise.
     */
    loadGame() {
        try {
            const serializedGameState = localStorage.getItem('idleRpgSave');
            if (serializedGameState === null) {
                console.log("No saved game found. Starting new game.");
                return false;
            }
            const loadedState = JSON.parse(serializedGameState);
            // Deep merge or replace gameState with loadedState
            Object.assign(gameState, loadedState);
            console.log("Game loaded successfully!");
            return true;
        } catch (error) {
            console.error("Error loading game:", error);
            return false;
        }
    }
}

export default MechanicsManager;