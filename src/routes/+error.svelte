<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? '404 | Aarsh Padia' : 'Error | Aarsh Padia'}</title>
</svelte:head>

{#if page.status === 404}
	<div class="flex items-center justify-center">
		<div class="space-y-6 text-center">
			<pre class="font-mono whitespace-pre text-accent">
{`
       _             _            _           
   _  /\\ \\         / /\\       _  /\\ \\         
  /\\_\\\\ \\ \\       / /  \\     /\\_\\\\ \\ \\        
 / / / \\ \\ \\     / / /\\ \\   / / / \\ \\ \\       
/ / /   \\ \\ \\   / / /\\ \\ \\ / / /   \\ \\ \\      
\\ \\ \\____\\ \\ \\ /_/ /  \\ \\ \\\\ \\ \\____\\ \\ \\     
 \\ \\________\\ \\\\ \\ \\   \\ \\ \\\\ \\________\\ \\    
  \\/________/\\ \\\\ \\ \\   \\ \\ \\/________/\\ \\   
            \\ \\ \\\\ \\ \\___\\ \\ \\         \\ \\ \\  
             \\ \\_\\\\ \\/____\\ \\ \\         \\ \\_\\ 
              \\/_/ \\_________\\/          \\/_/ 
`}
			</pre>

			<p class="text-gray-400">looks like you've wandered into uncharted territory</p>

			<a class="inline-block text-gray-400 transition-colors hover:text-accent" href="/">
				return home
			</a>
		</div>
	</div>
{:else}
	<div class="space-y-4 text-center">
		<h1 class="text-3xl font-bold text-white">something went wrong</h1>
		<p class="text-gray-400">please try refreshing the page.</p>
	</div>
{/if}
