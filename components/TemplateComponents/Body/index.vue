<template>
	<div>
		<section-header
			:title="$t('Body.body')"
			:subtitle="$t('Body.enter-the-text-of-your-message-in-the-language-you')"
		/>
		<v-card
			flat
			class="pa-4"
		>
			<v-textarea
				v-model="model.text "
				rows="3"
				:rules="rules({ required: true, whitespace: true })"
			/>
		</v-card>
	</div>
</template>

<script lang="ts" setup>
import type { Body } from '~/types/TemplatesBody'

const model = defineModel<Body>({
	default: () => ({
		text: '',
		type: 'BODY',
	}),
})
</script>
