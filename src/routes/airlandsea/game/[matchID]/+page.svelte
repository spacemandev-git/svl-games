
<script lang="ts">
    import { Client } from 'boardgame.io/client';
    import { Local } from 'boardgame.io/multiplayer';
    import { airlandsea } from '$lib/games/airlandsea';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    // Get matchID from URL params and host status from query params
    const matchID = $page.params.matchID;
    const isHost = $page.url.searchParams.get('host') === 'true';
    
    // Create client with local multiplayer
    const AirLandSeaClient = Client({
        game: airlandsea,
        multiplayer: Local(),
        debug: true
    });

    let clientComponent: any;

    onMount(() => {
        // Create client instance for either host (player 0) or joining player (player 1)
        clientComponent = new AirLandSeaClient({
            matchID: matchID,
            playerID: isHost ? '0' : '1'
        });
    });
</script>

<div id="game-container">
    {#if clientComponent}
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
</style>
