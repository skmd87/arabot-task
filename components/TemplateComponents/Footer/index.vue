<template>
	<div>
		<section-header
			title="Footer"
			subtitle="Use this section for optional details like disclaimers, contact info, or additional context."
		/>
		<v-card
			flat
			class="pa-4"
		>
			<v-text-field
				v-model="model.text "
				placeholder="Enter text"
			/>
		</v-card>
	</div>
</template>

<script lang="ts" setup>
import type { Footer } from '~/types/TemplatesBody'

const model = defineModel<Footer>({
	default: () => ({
		text: '',
		type: 'FOOTER',
	}),
})
</script>
