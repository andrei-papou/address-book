<template>

	<div>
		<div :class="{blurred: backgroundBlur}">
			<top-bar></top-bar>
			<div class="container">
				<b-row class="heading-row">
					<b-col>
						<h4>Clients</h4>
					</b-col>
					<b-col class="text-right">
						<router-link :to="{name: 'create-contact'}">
							<b-button><i class="fa fa-plus" aria-hidden="true"></i>&nbsp; Add client</b-button>
						</router-link>
					</b-col>
				</b-row>
				<b-table outlined
						 :items="allContacts"
						 :fields="fields"
						 :sort-by.sync="sortBy" 
						 :sort-desc.sync="sortDesc">
					<template slot="edit" slot-scope="data">
						<router-link :to="{name: 'edit-contact', params: {id: data.item.name}}">
							<i class="fa fa-pencil edit-link" aria-hidden="true"></i>
						</router-link>
					</template>
				</b-table>
			</div>
		</div>

		<router-view :set-background-blur="setBackgroundBlur"></router-view>

	</div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import TopBar from '@/components/TopBar';

export default {
  	components: {
  		TopBar,
  	},
  	computed: {
    	...mapGetters(['allContacts']),
  	},
  	methods: {
  		...mapActions(['getContacts']),

  		setBackgroundBlur(val) {
  			this.backgroundBlur = val;
  		}
  	},

  	data() {
  		return {
  			sortBy: null,
  			sortDesc: false,
  			fields: [
				{ key: 'name', sortable: true },
				{ key: 'phone', sortable: true },
				{ key: 'birthday', sortable: true },
				{ key: 'edit', label: ' ', tdClass: 'text-right' },
  			],
  			backgroundBlur: false,
  		};
  	},
  
  	mounted() {
    	this.getContacts();
  	},
}

</script>

<style>

</style>
