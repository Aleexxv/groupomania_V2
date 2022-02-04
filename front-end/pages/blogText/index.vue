<template>
	<div>
		<div class="content">
			<div class="reelContent">
				<figcaption v-for="text in texts" :key="text.id">
					<!-- <button class="button supp">x</button> -->
					<h2> {{ text.title }} </h2>
					<p> {{ text.desc }} </p>
					
					<div class="flex action">
						<span> {{ text.author }} </span>
						<!-- <button class="button like">like</button>
						<p class="ctlike">1</p> -->
					</div>
				</figcaption>
			</div>
		</div>
	</div>
</template>

<script>

export default {

	data: () => ({
		title: '',
			desc: '',
			texts: []
		}),

	async fetch() {
		this.texts = await this.$axios.$get('http://localhost:4000/api/blogTexts')
	},

}



</script>

<style lang="scss" scoped>

.content{

	justify-content: center;
	position: relative;
	background: var(--bg);
	color: var(--color);;
	margin-top: 5rem;
}

figcaption{
	margin-top: 6rem;
}

.fullStars {
	width: 20%;
	border : 1px solid var(--color-primary);
}
</style>