<template lang="pug">
	#app
		address table data from https://dmrompav.github.io/crazy_panda_table/table.json
		Paging(
			:multi-select="true"
			:page-selected="pageSelected"
			:table-length="tableLen"
			@page-select="pageSelect"
			:quantity="quantity"
			@quantity="newQuantity"
		)
		input(
			class="border border-black mt-4 mb-4 pl-2 pr-2 focus:shadow-inn"
			placeholder="Search"
			type="text"
			@input="filter"
		)
		Table(
			:quantity="quantity"
			:table-data="tableData"
			:page-selected="pageSelected"
			:type-of-sort="typeOfSort"
			@sort="sort"
		)
		Paging(
			:multi-select="false"
			:page-selected="pageSelected"
			:table-length="tableLen"
			@page-select="pageSelect"
			:quantity="quantity"
		)
</template>



<script>
import Table from './components/Table.vue'
import Paging from './components/Paging.vue'

export default {
	name: 'App',
	components: {
		Table, Paging, 
	},
	data() {
		return {
			quantity: 50,
			pageSelected: 1,
			tableData: {
				caption: '',
				head: [],
				main: [
					[]
				],
			},
			typeOfSort: ['ascend'],
			Data: [],
		}
	},
	methods: {
		pageSelect(page) {
			this.pageSelected = page
		},
		newQuantity(newQ) {
			this.quantity = newQ
			if (this.tableLen <= (this.pageSelected - 1) * this.quantity) {this.pageSelected = Math.ceil(this.tableLen / this.quantity) || 1}
		},
		sort(ind) {
			let type
			switch (this.typeOfSort[ind]) {
				case undefined:
				case 'discend':
					this.tableData.main
						.sort((a, b) => {
							if (a[ind] > b[ind]) {return 1}
							else if (a[ind] < b[ind]) {return -1}
							else {return (a[0] > b[0])? 1: -1}
						})
					type = 'ascend'
					break
				case 'ascend':
					this.tableData.main
						.sort((a, b) => {
							if (a[ind] < b[ind]) {return 1}
							else if (a[ind] > b[ind]) {return -1}
							else {return (a[0] < b[0])? 1: -1}
						})
					type = 'discend'
					break
			}
			this.typeOfSort = []
			this.typeOfSort[ind] = type
		},
		filter(event) {
			this.tableData.main = this.Data.filter(row => {
				let has = false 
				row.forEach(cell => {
					if (cell.toString().toLowerCase().startsWith(event.target.value.toString().toLowerCase())) has = true
				})
				return has
			})
			if (this.tableLen <= (this.pageSelected - 1) * this.quantity) {this.pageSelected = Math.ceil(this.tableLen / this.quantity) || 1}
		}
	},
	computed: {
		tableLen() {
			return this.tableData.main.length
		}
	},
	created: function() {
		let requestURL = 'https://dmrompav.github.io/crazy_panda_table/table.json'
		let request = new XMLHttpRequest()
		request.open('GET', requestURL)
		request.responseType = 'json';
		request.send();
		let that = this
		request.onload = function() {
			that.tableData = request.response
			that.tableData.main.forEach((el, ind) => el.unshift(ind + 1))
			that.Data = that.tableData.main.slice(0)
		}
	}
} 
</script>



<style>
body{ 
	@apply block w-screen
}
#app{
	@apply block w-11/12 max-w-screen-lg ml-auto mr-auto
}	
</style>
