<template>
	<div>
		<v-label>
			{{ $t('Text.text') }}
		</v-label>
		<v-text-field
			v-model.trim="model.value.text"
			:placeholder="$t('Text.please-enter-the-text-header-here')"
			:rules="rules({ required: true, whitespace: true })"
		/>
	</div>
</template>

<script lang="ts" setup>
import type { TextHeader } from '~/types/TemplatesBody'

const model = defineModel<TextHeader>({
	required: true,
})
</script>
