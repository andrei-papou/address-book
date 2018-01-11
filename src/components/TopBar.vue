<template>

	<header class="app-header">
		<div class="container">
			<img src="@/assets/images/logo.png" />
		</div>
	</header>

</template>

<style lang="scss" scoped>

@import '../assets/scss/main.scss';

header {
	background-color: $accent-color;
	height: 80px;
	box-shadow: 0 3px 10px #777;
	margin-bottom: 50px;

	img {
		width: 200px;
		margin-top: 25px;
	}
}

</style>
