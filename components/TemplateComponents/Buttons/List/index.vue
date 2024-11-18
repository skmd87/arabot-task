<template>
	<div>
		<div v-auto-animate>
			<template-components-buttons-list-item
				v-for="(_button, index) in model"
				:key="index"
				v-model="model[index]"
				class="mb-2"
				@remove="removeHandler(index)"
			/>
		</div>
		<v-empty-state v-if="!model.length">
			<template #title>
				There is no any button yet.
			</template>
		</v-empty-state>
		<div class="text-center">
			<v-btn
				prepend-icon="mdi-plus"
				variant="text"
				@click="addHandler"
			>
				Add a button
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Button } from '~/types/TemplatesBody'

const model = defineModel<Button[]>({
	required: true,
})

const removeHandler = (index: number) => {
	model.value.splice(index, 1)
}

const addHandler = () => {
	model.value.push({
		// assume that the default type is CALL
		type: 'CALL',
		text: '',
		value: {
			phone_number: '',
		},
	})
}
</script>
