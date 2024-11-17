<template>
	<div class="mb-4">
		<section-header
			title="Header"
			subtitle="Highlight your brand here, use images or videos, to stand out"
		/>
		<v-card
			flat
			class="pa-4"
		>
			<v-sheet
				color="#edf2f7"
				class="pa-2 mb-2"
			>
				<v-btn-toggle
					v-model="format"
					mandatory
					color="transparent"
					selected-class="bg-white"
				>
					<v-btn value="NONE">
						None
					</v-btn>

					<v-btn value="TEXT">
						<v-icon
							icon="mdi-menu"
							start
						/> Text
					</v-btn>

					<v-btn value="IMAGE">
						<v-icon
							start
							icon="i-mdi:image-outline"
						/> Image
					</v-btn>
				</v-btn-toggle>
			</v-sheet>

			<div v-auto-animate>
				<template-components-header-text
					v-if="model.format === 'TEXT'"
					v-model="model"
				/>
				<template-components-header-image
					v-if="model.format === 'IMAGE'"
					v-model="model"
				/>
			</div>
		</v-card>
	</div>
</template>

<script lang="ts" setup>
import type { Header } from '~/types/TemplatesBody'

const model = defineModel<Header>({
	required: true,
})

const format = computed({
	get() {
		return model.value?.format || 'NONE'
	},
	set(value: string) {
		if (!model.value) {
			return
		}
		model.value.format = value as Header['format']
	},
})
</script>
