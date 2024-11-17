<template>
	<div>
		<v-toolbar
			color="white"
			height="52"
		>
			<v-container class="py-0 d-flex align-center">
				<v-toolbar-title>
					<v-icon
						icon="mdi-plus"
						start
					/> New Template Message
				</v-toolbar-title>
				<v-spacer />
				<v-btn
					text="Save"
					prepend-icon="mdi-content-save-outline"
					variant="flat"
					height="40"
					color="btn"
				/>
			</v-container>
		</v-toolbar>
		<v-container class="py-0">
			<v-breadcrumbs
				:items="breadcrumbItems"
				class="ps-0 ms-n1"
			/>
			<v-defaults-provider
				:defaults="{
					VTextField: inputsDefaults,
					VSelect: inputsDefaults,
				}"
			>
				<template-components-name-and-language
					v-model:name="form.name"
					v-model:language="form.language"
				/>
				<template-components-category v-model="form.category" />

				<template
					v-for="component, c in form.components"
					:key="`comp-${c}`"
				>
					<component
						:is="componentsMap[(component.type as keyof typeof componentsMap) ]"
						v-model="form.components[c]"
					/>
				</template>
			</v-defaults-provider>
		</v-container>
	</div>
</template>

<script lang="ts" setup>
import type { Template } from '~/types/TemplatesBody'
import Header from '~/components/TemplateComponents/Header/index.vue'

const componentsMap = {
	HEADER: Header,
}

const inputsDefaults = {
	variant: 'outlined',
	density: 'compact',
	rounded: 'lg',
}

const breadcrumbItems = [
	{ title: 'Templates', disabled: false, href: '/templates' },
	{ title: 'New Template Message', disabled: true },
]

const form = reactive<Template>({
	category: 'MARKETING',
	components: [
		{
			type: 'HEADER',
			format: 'TEXT',
			value: {
				text: 'Hello World',
			},
		},

	],
	language: 'en_US',
	name: '',
})
</script>

<style>

</style>
