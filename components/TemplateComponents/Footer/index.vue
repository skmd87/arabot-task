<template>
	<div>
		<section-header
			:title="$t('Footer.footer')"
			:subtitle="$t('Footer.use-this-section-for-optional-details-like-disclai')"
		/>
		<v-card
			flat
			class="pa-4"
		>
			<v-text-field
				v-model="model.text "
				:placeholder="$t('Footer.enter-text')"
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
