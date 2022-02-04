<template>
		<div class="form">
			<div class="msg">
				<h2>{{ text.title }}</h2>
				<p>{{ text.desc }}</p>
			</div>
			<form>
				<h2>Modifier votre publication :</h2>
				<input v-model="title" type="text" placeholder="Titre de la publication">
				<textarea-autosize v-model="desc" placeholder="" ref="myTextarea" :min-height="100"/>
				<button class="button" @click='updateText()'>Envoyer</button>
			</form>
		</div>
</template>

<script>

import Vue from 'vue'
import TextareaAutosize from 'vue-textarea-autosize'
Vue.use(TextareaAutosize)

export default {

	watch: {
		'$route.query': '$fetch'
	},

	data() {
		return {
			title: '',
			desc: '',
			author: 'aleexxv',
			text: {}
		}
	},

	async asyncData({ params }) {
		let texts = await fetch(`http://localhost:4000/api/blogTexts/${params.id}`)
			.then(res => res.json({
				return: res.data
			}))
		console.log(texts)
		return {
			text: texts[0]
		}
	},

	methods: {
		async updateText({ params }) {
			await this.$axios.$put(`http://localhost:4000/api/blogTexts/update/${params.id}`, {
					title: this.title,
					desc: this.desc,
					author: this.author,
				})
				.then(res => console.log(res))
				.catch(err => console.log(err))
		},
	}
}

</script>

<style lang="scss" scoped>

	.form{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	figcaption{
		margin: 5rem;
	}

	.msg{
		margin-bottom: 5rem;
		border: 2rem solid var(--text);
	}

	textarea{
		background: var(--bg);
		color: var(--text);
		border-color: var(--text);
		height: 10%;
		width: 70%;
		border-radius: 2rem;
		padding: 1rem;
	}

</style>


