<template>
	<div class="mb-4">
		<div class="text-subtitle-1 font-weight-bold">
			{{ title }}
		</div>
		<div
			v-if="!!subtitle"
			class="text-subtitle-2 text-medium-emphasis"
		>
			{{ subtitle }}
		</div>
	</div>
</template>

<script lang="ts" setup>
type Props = {
	title: string
	subtitle?: string | undefined
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.section-title {
	display: flex;
	align-items: center;
	line-height: 21px;
	font-family: "Plus Jakarta Sans";
	font-size:14px;
}
</style>
