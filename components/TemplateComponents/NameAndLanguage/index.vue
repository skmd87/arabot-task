<template>
	<div class="mb-4">
		<section-header
			title="Template Details"
			subtitle="Define your template name and language"
		/>
		<v-card
			flat
			class="pa-4"
		>
			<v-label>
				Template Name <span class="text-error">*</span>
			</v-label>
			<v-text-field
				v-model="nameModel"
				placeholder="Enter template name"
			/>
			<v-label>
				Language <span class="text-error">*</span>
			</v-label>
			<v-select
				v-model="languageModel"
				:items="['en_US', 'ar_SA']"
			/>
		</v-card>
	</div>
</template>

<script lang="ts" setup>
import type { Template } from '~/types/TemplatesBody'

const nameModel = defineModel<Template['name']>('name')

const languageModel = defineModel<Template['language']>('language')
</script>
