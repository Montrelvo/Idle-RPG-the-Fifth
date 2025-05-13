// src/gameData.js

/**
 * Global game state object.
 * This object holds all the data related to the player's progress, resources,
 * enemy status, and other game-wide information.
 */
export const gameState = {
    // Resources
    resources: {
        gold: 0,
        wood: 0,
        stone: 0,
        // Add more resources here as needed
    },

    // Player stats
    playerStats: {
        attack: 1,
        defense: 0,
        health: 10,
        maxHealth: 10,
        // Add more player stats here as needed
    },

    // Current enemy information
    currentEnemy: {
        name: "Goblin",
        health: 5,
        maxHealth: 5,
        attack: 1,
        // Add more enemy properties here as needed
    },

    // Combat state
    combat: {
        isCombatActive: false,
        combatProgress: 0, // Could represent time or turns in combat
        // Add more combat state properties here
    },

    // Add other game state properties here (e.g., upgrades, inventory, etc.)
};