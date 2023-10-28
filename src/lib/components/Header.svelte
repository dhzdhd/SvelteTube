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
	<div class=" join">
		<input
			type="text"
			placeholder="Search"
			class="w-24 input input-sm join-item input-bordered md:w-auto"
		/>
		<button class="rounded-r-xl btn btn-sm btn-primary join-item">GO</button>
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
		@apply min-h-[3.5rem] grid py-0 px-2 grid-cols-3;
	}

	.input {
		@apply w-full;
	}

	.dropdown {
		@apply place-self-end self-center;
	}
</style>
