<script lang="ts">
    import { Client } from 'boardgame.io/client';
    import { SocketIO } from 'boardgame.io/multiplayer';
    import { airlandsea } from '$lib/games/airlandsea';
    import { page } from '$app/state';
    import { onMount, onDestroy } from 'svelte';

    // Get matchID from URL params and host status from query params
    const { matchID } = page.data;
    const isHost = page.url.searchParams.get('host') === 'true';
    
    // Set up player ID and game state
    const playerID = isHost ? '0' : '1';
    let gameState: any = null;
    let connectedPlayers: string[] = [playerID];  // Current player is always initially connected
    let gameStarted = false;
    let error = '';

    // Create client instance
    const clientConfig = Client<any>({
        game: airlandsea,
        multiplayer: SocketIO({ server: 'http://localhost:8000' }),
        debug: { impl: true },
        matchID: matchID,
        playerID: playerID
    });

    let clientComponent: any;

    function handleStateUpdate() {
        const state = clientComponent.getState();
        if (state) {
            gameState = state.G;
            // Update connected players list
            connectedPlayers = state.ctx.playOrder.filter(
                (id: string) => id === playerID || state.ctx.playersInfo[parseInt(id)]?.isConnected
            );

            // Initialize player state if needed
            if (!gameState.players[playerID]) {
                gameState.players[playerID] = {
                    hand: [],
                    score: 0,
                    ready: false
                };
            }

            // Check if lobby is full for new connections
            if (!connectedPlayers.includes(playerID) && connectedPlayers.length >= 2) {
                error = 'Lobby is full!';
            }
        }
    }

    async function toggleReady() {
        if (clientComponent?.moves) {
            try {
                await clientComponent.moves.toggleReady(playerID);
                // Force a state update
                handleStateUpdate();
            } catch (e) {
                console.error('Failed to toggle ready state:', e);
            }
        }
    }

    function startGame() {
        if (isHost && gameState && (Object.values(gameState.players) as Array<{ready: boolean}>).every(p => p.ready)) {
            gameStarted = true;
        }
    }

    onMount(() => {
        clientComponent = clientConfig;
        clientComponent.start();
        
        // Subscribe to state updates
        const unsubscribe = clientComponent.subscribe(handleStateUpdate);
        
        return () => {
            unsubscribe();
            clientComponent.stop();
        };
    });
</script>

<div id="game-container">
    {#if error}
        <div class="error">{error}</div>
    {:else if !gameStarted}
        <div class="lobby">
            <h2>Lobby: {matchID}</h2>
            
            <div class="players-list">
                <div class="player">
                    <div class="player-info">
                        <span class="player-name">Host (Player 1):</span>
                        <span class="player-status">
                            {#if !connectedPlayers.includes('0')}
                                Open
                            {:else if !gameState?.players['0'].ready}
                                Waiting
                            {:else}
                                Ready
                            {/if}
                        </span>
                    </div>
                </div>
                <div class="player">
                    <div class="player-info">
                        <span class="player-name">Player 2:</span>
                        <span class="player-status">
                            {#if !connectedPlayers.includes('1')}
                                Open
                            {:else if !gameState?.players['1'].ready}
                                Waiting
                            {:else}
                                Ready
                            {/if}
                        </span>
                    </div>
                </div>
            </div>

            {#if connectedPlayers.includes(playerID)}
                <button 
                    class={gameState?.players[playerID]?.ready ? 'unready-btn' : 'ready-btn'}
                    on:click={toggleReady}
                >
                    {gameState?.players[playerID]?.ready ? 'Not Ready' : 'Get Ready'}
                </button>
            {/if}

            {#if isHost && gameState && (Object.values(gameState.players) as Array<{ready: boolean}>).every(p => p.ready)}
                <button 
                    class="start-btn"
                    on:click={startGame}
                >
                    Start Game
                </button>
            {/if}
        </div>
    {:else}
        <svelte:component this={clientComponent} />
    {/if}
</div>

<style>
    #game-container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .lobby {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        text-align: center;
    }

    .players-list {
        margin: 2rem 0;
    }

    .player {
        margin: 1rem 0;
        padding: 0.5rem;
        background: #f5f5f5;
        border-radius: 4px;
    }

    .ready-btn, .start-btn, .unready-btn {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        margin: 0.5rem;
    }

    .ready-btn {
        background: #4CAF50;
        color: white;
    }

    .unready-btn {
        background: #f44336;
        color: white;
    }

    .start-btn {
        background: #2196F3;
        color: white;
    }

    .player-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
    }

    .player-status {
        font-weight: 500;
    }

    .player-status:empty::before {
        content: '\00a0';
    }

    .error {
        color: #f44336;
        padding: 1rem;
        background: #ffebee;
        border-radius: 4px;
    }
</style>
