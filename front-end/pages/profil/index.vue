<template>
	<div class="content">
		<div class="profil">
			<div>
				<img src="https://i.pravatar.cc/300" alt="">
					<h2>{{ user.firstName }} {{ user.lastName }}</h2>
					<h3>{{ user.email }}</h3>
				<p>Vous avez partagé {{ nbrLikeText }} publication</p>
				<button class="button updateProfile"><NuxtLink class="link" to="/profil/updateProfil">Je modifie mon profile !</NuxtLink></button>
			</div>
		</div>
		<div class="realContent">
			<div class="msg">
				<form>
					<input v-model="title" type="text" placeholder="Titre de la publication">
					<div class="flex">
						<textarea-autosize v-model="desc" placeholder="Ercivez votre message" ref="myTextarea" :min-height="100"/>
						<button class="button" @click='postText()'>Envoyer</button>
					</div>
				</form>
			</div>
			<div class="texts">
				<figcaption v-for="text in texts" :key="text.id">
					<button class="button supp" @click='deleteText()'>x</button>
					<h2>{{ text.title }}</h2>
					<p>{{ text.desc }}</p>
					<div class="flex action">
						<button class="button like"><NuxtLink class="link" :to="'/blogText/' + text.id">Modifier !</NuxtLink></button>
					</div>
				</figcaption>
			</div>
		</div>
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

	data: () => ({
		user: [],
		texts: [],
		id : '',
		firstName: '',
		lastName: '',
		email: '',
		nbrLikeText: '',
		title: '',
		desc: '',
		author: ''
	}),

	async fetch() {
		this.texts = await this.$axios.$get('http://localhost:4000/api/blogTexts')
	},

	methods: {
		async postText() {
			await this.$axios.$post('http://localhost:4000/api/blogTexts', {
				title: this.title,
				desc: this.desc,
				author: this.author,
			})
			.then(res => console.log(res))
			.catch(err => console.log(err))
		},

		async deleteText() {
			await this.$axios.$delete(`http://localhost:4000/api/blogTexts/delete/${this.id}`)
			.then(res => console.log(res))
			.catch(err => console.log(err))
		}
	},
}

</script>

<style lang="scss" scoped>

	.content {
		position: absolute;
		top: 8%;
		width: 100%;
	}

	.realContent{
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		padding-top: 2rem;
		margin-top: 8rem;
	}

	.profil{
		text-align: center;
		background-image: url('https:///random.imagecdn.app/3500/500');
		padding: 1rem 0 0 1rem;
		margin-bottom: 5rem;
		div {
			background: var(--bg);
			width: 25rem;
			height: 25rem;
			border-radius: 50% 50% 0 0;
			img{
				margin-top: 1rem;
			}
			
		}
	}

	.profilName {
		height: 5rem !important;
	}

	.link{
		font-size: 1rem;
	}


	.updateProfile{
		left: 0;
		transform: translateX(0);
	}

	form{
		width: 70%;
		margin: 0 auto;

		div{
			margin: 0 auto;
			flex-direction: column;
		}
	}

	img{
		border-radius: 50%;
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

	form .button{
		left: 5%;
		margin-top: 1rem;
	}

	.msg{
		border : 2px solid var(--color);
		border-radius: 2rem;
		width: 70%;
		margin: 0 auto;
	}

	.texts{
		display: flex;
		flex-direction: column-reverse;
	}

</style>