// src/gameData.js

/**
 * Global game state object.
 * This object holds all the data related to the game's current state,
 * including resources, player stats, enemy information, and other states.
 */
const gameState = {
    resources: {
        gold: 0,
        wood: 0,
        stone: 0,
        // Add other resources here
    },
    playerStats: {
        attack: 1,
        defense: 0,
        health: 100,
        maxHealth: 100,
        // Add other player stats here
    },
    currentEnemy: {
        name: "Goblin",
        enemyHealth: 50,
        maxEnemyHealth: 50,
        enemyAttack: 5,
        // Add other enemy stats here
    },
    isCombatActive: false,
    combatProgress: 0, // Could represent time in combat tick or similar
    // Add other game states here
};

// Export the gameState object so it can be accessed from other files
export default gameState;