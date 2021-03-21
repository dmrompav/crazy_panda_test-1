<template lang="pug">
	table.table(
		class="border-collapse"
	)
		caption.caption(
			class="text-lg font-bold"
		) {{ tableData.caption }}
		tr.header
			th.header__title.cell(
				class="bg-blue-400 cursor-pointer hover:bg-blue-200 select-none"
				v-for="(title, ind) in tableData.head"
				@click="$emit('sort', ind)"
			) 
				span.sort(v-if="typeOfSort[ind]" v-html="typeOfSort[ind]==='ascend'? '&uarr;' : '&darr;'") 
				| {{ title }}
		tr.main-row(
			v-for="row in tableDataCutted"
			:key="row[0]"
		)
			td.main-row__cell.cell(
				v-for="cell in row"
			) {{ cell }}
</template>



<script>
export default {
	name: "Table",
	props: {
		pageSelected: Number,
		quantity: Number,
		tableData: Object,
		typeOfSort: Array,
	},
	computed: {
		tableDataCutted() {
			if (this.tableData.main.length <= this.quantity) {
				return this.tableData.main
			}
			else {
				return this.tableData.main
					.slice((this.pageSelected - 1) * this.quantity, this.pageSelected * this.quantity)
			}
		}
	}
};
</script>



<style scoped>
.cell{
	@apply border border-black text-center pl-4 pr-8 max-w-screen-sm break-words
}
</style>
