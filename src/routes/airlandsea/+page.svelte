<script lang="ts">
	import { goto } from '$app/navigation';
	import { nanoid } from 'nanoid';

	function gotoRules() {
		goto('/rules');
	}

	function gotoLobby(matchID: string, host: boolean = false) {
		goto(`/airlandsea/game/${matchID}?host=${host}`);
	}

	let lobbyCode: string = '';
</script>

<main class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
	<img
		src="airlandsea/cover.webp"
		alt="Air, Land, and Sea Board Game Cover"
		class="w-[33vh] h-auto mb-8 rounded-lg shadow-lg"
	/>
	<div class="space-y-4">
		<button
			class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
			on:click={gotoRules}
		>
			Rules
		</button>
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
			on:click={() => gotoLobby(`als-${nanoid(6)}`, true)}
		>
			Create Lobby
		</button>
		<div style="display: flex; flex-direction: row;">
			<button
				class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
				style="margin-right:1rem;"
				on:click={() => {
					if (lobbyCode.trim() == '') alert('Please enter a lobby code');
					else gotoLobby(lobbyCode.trim(), false);
				}}
			>
				Join Lobby
			</button>
			<input
				type="text"
				bind:value={lobbyCode}
				placeholder="Enter lobby code"
				class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
				style="outline: 0.2rem solid #000000;"
			/>
		</div>
	</div>
</main>
