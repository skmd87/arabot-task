<template>
	<v-responsive
		width="100%"
		:aspect-ratio="16/9"
		max-height="400"
	>
		<div
			ref="dropZoneRef"
			class="dropzone"
			:class="{ 'file-over': isOverDropZone }"
		>
			<v-progress-circular
				v-if="loading"
				indeterminate
				size="80"
			/>
			<div
				v-else
				class="content"
			>
				<template v-if="!previewURL">
					<v-icon
						size="64"
						:icon="UploadIcon"
					/>
					<div class="text-subtitle-1">
						{{ title }}
					</div>
					<div
						v-if="subtitle"
						class="text-subtitle-2 text-medium-emphasis mb-2"
					>
						{{ subtitle }}
					</div>
				</template>
				<template v-else>
					<v-img
						:src="previewURL"
						width="80%"
						:aspect-ratio="16/9"
						min-width="100"
					/>
				</template>
				<div class="my-2">
					<v-btn
						v-if="previewURL"
						variant="outlined"
						class="me-2"
						@click="clearHandler"
					>
						{{ $t('DropZone.clear') }}
					</v-btn>
					<v-btn
						variant="outlined"
						@click="dropzoneClickHandler"
					>
						{{ $t('DropZone.select-files') }}
					</v-btn>
				</div>
			</div>
		</div>
	</v-responsive>
</template>

<script lang="ts" setup>
import UploadIcon from '~/components/Icons/Upload.vue'

type Props = {
	dataTypes?: string[]
	loading?: boolean
	title?: string
	subtitle?: string
}

const p = withDefaults(defineProps<Props>(), {
	dataTypes: () => [],
	loading: false,
	title: 'Drop files here',
	subtitle: '',
})
type Model = File | string | null

const model = defineModel<Model>()

const dropZoneRef = ref<HTMLDivElement>()

function onDrop(files: File[] | null) {
	if (files) {
		// check files type
		files = files.filter(file => p.dataTypes.includes(file.type))
		if (files.length > 0) {
			model.value = files[0]
		}
	}
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
	onDrop,
	dataTypes: p.dataTypes,
})

const dropzoneClickHandler = () => {
	const input = document.createElement('input')
	input.type = 'file'
	input.accept = p.dataTypes.join(',')
	input.onchange = (e) => {
		const files = (e.target as HTMLInputElement).files
		if (files) {
			onDrop(Array.from(files))
		}
	}
	input.click()
}

const previewURL = computed<null | string>(() => {
	if (!model.value) return null

	if (typeof model.value === 'string') {
		return model.value
	}

	return model.value ? URL.createObjectURL(model.value) : ''
})

const clearHandler = () => {
	model.value = null
}
</script>

<style lang="scss" scoped>
.dropzone {
		border: 2px dashed rgb(var(--v-theme-secondary));
		border-radius: 12px;
		width: 100%;
		height:100%;
		transition:all 0.3s;
		// background: #eee;
		display: flex;
		justify-content: center;
		align-items: center;
		&.file-over {
			border-color:rgb( var(--v-theme-success));
			background-color: rgba( var(--v-theme-success), 0.05) ;
			transition:all 0.3s;
		}
		.content{
			display: flex;
			flex-direction: column;
			align-items: center;
			flex-grow: 1;
		}
	}
</style>
