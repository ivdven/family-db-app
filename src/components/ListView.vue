<template>
	<div class="members-card">
	  <div class="card">
				<div class="document" v-for="document in displayedDocuments" :key="document.id">
					<p class="styled-text">Family {{ document.familyName }}</p>
					<router-link class="detail-link btn" :to="{ name: 'Detail', params: { id: document.id } }">
						See data
					</router-link>
				</div>
		</div>
	</div>
</template>

<script>

import { computed, onMounted } from 'vue'

export default {
	props: {
		documents: {
			type: Array,
			required: true
		},
		isSearching: {
			type: Boolean,
			required: true
		}
	},
	setup(props) {
		
		// sort the documents in alphabetic order by name
		const sortedDocuments = computed(() => {
			return props.documents.slice().sort((a, b) => {
				if (a.familyName < b.familyName) return -1
				if (a.familyName > b.familyName) return 1
				return 0
			})
		})

		const displayedDocuments = computed(() => {
			return props.isSearching ? props.documents : sortedDocuments.value
		})

		return { sortedDocuments, displayedDocuments }
	}
}
</script>

<style scoped>
.members-card {
  width: 100%;
}
.card {
	display: flex;
	flex-direction: column;
}
.document {
	display: flex;
  justify-content: space-between;
	align-items: center;
}
.detail-link {
  margin-left: 16px;
  white-space: nowrap;
}
</style>