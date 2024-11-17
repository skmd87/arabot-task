<template>
	<div>
		<v-label>
			Text
		</v-label>
		<v-text-field
			v-model="model.value.text"
			placeholder="Please enter the text header here"
		/>
	</div>
</template>

<script lang="ts" setup>
import type { TextHeader } from '~/types/TemplatesBody'

const model = defineModel<TextHeader>({
	required: true,
})
</script>
