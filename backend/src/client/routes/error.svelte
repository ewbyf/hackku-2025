<script lang="ts">
	let { message = null, jsonDump = null, links = {} }: { message?: string | null; jsonDump?: any; links?: Record<string, string> } = $props();
</script>

<svelte:head>
	<title>[placeholder] - Oops!</title>
</svelte:head>

<main class="container">
	<h1>An error occured:</h1>
	<p class="error">{message}</p>
	{#if jsonDump !== null}
		<h2>JSON Dump:</h2>
		<code>{JSON.stringify(jsonDump, null, 4)}</code>
		<br />
	{/if}
	<div class="row">
		{#each Object.entries(links) as [label, href]}
			<a {href} role="button">{label}</a>
		{/each}
	</div>
</main>
