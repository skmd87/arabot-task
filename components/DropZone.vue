<template>
	<v-input>
		<v-responsive
			width="100%"
			:aspect-ratio="16/9"
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
					<v-icon
						size="64"
						icon="i-mdi:cloud-upload-outline"
					/>
					<div class="text">
						{{ $t('DropZone.drag-and-drop-excel-file-here') }}
					</div>
					<div class="or">
						{{ $t('DropZone.or') }}
					</div>
					<v-btn @click="dropzoneClickHandler">
						{{ $t('DropZone.click-to-upload') }}
					</v-btn>
				</div>
			</div>
		</v-responsive>
	</v-input>
</template>

<script lang="ts" setup>
type Props = {
	dataTypes?: string[]
	multiple?: boolean
	loading?: boolean
}

const p = withDefaults(defineProps<Props>(), {
	dataTypes: () => [],
	multiple: false,
	loading: false,
})
type Model = File | Array<File> | null

const model = defineModel<Model>()

const dropZoneRef = ref<HTMLDivElement>()

function onDrop(files: File[] | null) {
	if (!p.multiple) {
		files = files ? [files[0]] : null
	}
	if (files) {
		// check files type
		model.value = files.filter(file => p.dataTypes.includes(file.type))
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
	input.multiple = p.multiple
	input.onchange = (e) => {
		const files = (e.target as HTMLInputElement).files
		if (files) {
			onDrop(Array.from(files))
		}
	}
	input.click()
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

			.text{
				font-size: 20px;
				margin-block: 12px;
			}
			.or{
				font-size: 16px;
				margin-bottom: 12px;
				color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity)) !important;
			}
		}
	}
</style>
