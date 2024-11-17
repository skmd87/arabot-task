<template>
	<drop-zone
		:data-types="['image/*']"
		@update:model-value="uploadHandler"
	/>
</template>

<script lang="ts" setup>
import type { ImageHeader } from '~/types/TemplatesBody'

const model = defineModel<ImageHeader>({
	required: true,
})

const uploadHandler = (file: File | File[] | null) => {
	// array check is only for typing purposes
	if (!file || Array.isArray(file)) return

	const reader = new FileReader()
	reader.onload = (e) => {
		// do the upload here
		console.log('🚀 ~ uploadHandler ~ e:', e)
		model.value.value.url = e.target?.result as string
	}
	reader.readAsDataURL(file)
}
</script>
