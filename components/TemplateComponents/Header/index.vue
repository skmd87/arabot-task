<template>
	<div>
		<section-header
			:title="$t('Header.header')"
			:subtitle="$t('Header.highlight-your-brand-here-use-images-or-videos-to-')"
		/>
		<v-card
			flat
			class="pa-4"
		>
			<v-sheet
				color="surface2"
				class="pa-1 mb-2 d-inline-block"
				rounded
			>
				<v-btn-toggle
					v-model="format"
					mandatory
					color="#000"
					base-color="transparent"
					variant="flat"
					selected-class="bg-white"
					rounded
					class="hidden-overlay "
					style="height:32px"
				>
					<v-btn
						value="NONE"
						class="py-0"
					>
						{{ $t('Header.none') }}
					</v-btn>

					<v-btn value="TEXT">
						<v-icon
							icon="mdi-menu"
							start
						/> {{ $t('Header.text') }}
					</v-btn>

					<v-btn value="IMAGE">
						<v-icon
							start
							icon="mdi-image-outline"
						/> {{ $t('Header.image') }}
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
