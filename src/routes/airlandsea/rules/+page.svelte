<!-- src/routes/rules/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8" in:fade={{ duration: 300 }}>
	<h1 class="text-3xl font-bold mb-6">Rules of Air, Land, and Sea</h1>

	<div class="space-y-6">
		<section>
			<h2 class="text-2xl font-semibold mb-3">Game Overview</h2>
			<p>
				Air, Land, and Sea is a two-player strategy card game where players compete to win two out
				of three theaters of war. The first player to get to 12 VP wins the game.
			</p>
		</section>

		<section>
			<h2 class="text-2xl font-semibold mb-3">Setup</h2>
			<ul class="list-disc list-inside space-y-2">
				<li>Shuffle the Player Order cards and deal to each player.</li>
				<li>
					Shuffle and place the three theater cards (Air, Land, Sea) between the players in random
					order.
				</li>
				<li>Every round, shuffle the deck and deal six cards to each player</li>
				<li>Rounds alway go in the same Player Order that's dealt for the game.</li>
			</ul>
		</section>

		<section>
			<h2 class="text-2xl font-semibold mb-3">Gameplay</h2>
			<p>On your turn you make take one of three actions:</p>
			<ol class="list-decimal list-inside space-y-2">
				<li>Attack: Play a card from your hand in it's matching theater</li>
				<li>
					Improvise: Play a card facedown from your hand in any theater. Facedown cards count for
					strength of 2.
				</li>
				<li>
					Withdraw: Withdraw from the round, your opponent getting VP listed on your Player Order
					card for how many cards you have left in your hand.
				</li>
			</ol>
		</section>

		<section>
			<h2 class="text-2xl font-semibold mb-3">Winning the Game</h2>
			<p>Win two out of three theaters to win the game. Player 1 wins tied theaters.</p>
		</section>
	</div>

	<a
		href="/"
		class="inline-block mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
	>
		Back to Home
	</a>
</main>
