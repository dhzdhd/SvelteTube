<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center h-full">
	<h1 class="w-full text-xl text-center">
		{$page.error?.message}
	</h1>
</div>
