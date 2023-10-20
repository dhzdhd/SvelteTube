<script>
	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<header class="fixed navbar bg-base-300">
	<div class="flex-1">
		<a href="/" class="text-xl normal-case btn btn-sm btn-ghost">YouTube</a>
	</div>
	<div class="form-control">
		<input type="text" placeholder="Search" class="w-24 input input-sm input-bordered md:w-auto" />
	</div>
	<div class="dropdown dropdown-end">
		<label tabindex="0" class="btn btn-sm btn-ghost btn-circle avatar">
			<div class="w-10 rounded-full">
				<img src="" alt="profile" />
			</div>
		</label>
		<ul
			tabindex="0"
			class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
		>
			<li>
				<a href="/" class="justify-between"> Profile </a>
			</li>
			<li><a href="/">Settings</a></li>
			<li><a href="/">Logout</a></li>
		</ul>
	</div>
</header>

<style lang="postcss">
	.navbar {
		@apply max-h-[2.5rem];
		@apply min-h-[2.5rem];
		@apply grid;
		@apply py-0;
		@apply px-2;
		@apply grid-cols-3;
	}

	.input {
		@apply w-full;
	}

	.dropdown {
		@apply place-self-end;
	}
</style>
