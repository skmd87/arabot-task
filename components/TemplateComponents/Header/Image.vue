<template>
	<v-input
		:model-value="model.value.url"
		:rules="rules({ required: true, whitespace: true })"
	>
		<drop-zone
			:model-value="model.value.url"
			:title="$t('Image.drag-and-drop-file-here-to-upload-or-browse')"
			:subtitle="$t('Image.allowed-types-jpeg-jpg-png')"
			:data-types="['image/png', 'image/jpeg']"
			@update:model-value="uploadHandler"
		/>
	</v-input>
</template>

<script lang="ts" setup>
import type { ImageHeader } from '~/types/TemplatesBody'

const model = defineModel<ImageHeader>({
	required: true,
})

const uploadHandler = (file: File | string | null) => {
	if (!file || typeof file === 'string') {
		model.value.value.url = ''
		return
	}

	const reader = new FileReader()
	reader.onload = (e) => {
		// do the upload here, for task purposes we will use the file reader result as base64
		model.value.value.url = e.target?.result as string
	}
	reader.readAsDataURL(file)
}
</script>
