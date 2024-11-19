<template>
	<div class="mb-4">
		<section-header
			:title="$t('NameAndLanguage.template-details')"
			:subtitle="$t('NameAndLanguage.define-your-template-name-and-language')"
		/>
		<v-card
			flat
			class="pa-4"
		>
			<v-label>
				{{ $t('NameAndLanguage.template-name') }} <span class="text-error">*</span>
			</v-label>
			<v-text-field
				v-model.trim="nameModel"
				placeholder="Enter template name"
				:rules="rules({ required: true, whitespace: true, max: 20 })"
			/>
			<v-label>
				{{ $t('NameAndLanguage.language') }} <span class="text-error">*</span>
			</v-label>
			<v-select
				v-model="languageModel"
				:items="languageItems"
				:rules="rules({ required: true })"
			/>
		</v-card>
	</div>
</template>

<script lang="ts" setup>
import type { Template } from '~/types/TemplatesBody'

const nameModel = defineModel<Template['name']>('name')

const languageModel = defineModel<Template['language']>('language')

const { t } = useI18n()

const languageItems = ref([
	{
		title: t('NameAndLanguage.english-us'),
		value: 'en_US',
	},
	{
		title: t('NameAndLanguage.arabic-saudi-arabia'),
		value: 'ar_SA',
	},
])
</script>
