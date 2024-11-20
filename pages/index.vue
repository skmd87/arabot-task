<template>
	<div>
		<v-app-bar
			color="white"
			height="52"
			scroll-behavior="elevate"
		>
			<v-container class="py-0 d-flex align-center">
				<v-app-bar-title>
					<v-icon
						icon="mdi-plus"
						start
					/> {{ $t('index.new-template-message') }}
				</v-app-bar-title>
				<div class="hidden-sm-and-down">
					<div class="d-flex ga-2">
						<!-- <v-btn
							text="Preview"
							prepend-icon="mdi-eye-check-outline"
							variant="text"
							height="40"
							color="btn"
							@click="previewHandler"
						/> -->
						<v-btn
							:text="otherLocale.shortCode.toUpperCase()"
							variant="text"
							height="40"
							color="btn"
							@click="changeLocaleHandler"
						/>
						<v-btn
							text="Save"
							prepend-icon="mdi-content-save-outline"
							variant="flat"
							height="40"
							color="btn"
							:loading="isSaving"
							@click="saveHandler"
						/>
					</div>
				</div>
				<v-btn
					icon
					variant="text"
					class="hidden-md-and-up"
				>
					<v-icon icon="mdi-dots-vertical" />
					<v-menu activator="parent">
						<v-list
							slim
							density="compact"
						>
							<v-list-item
								:title="$t('index.save')"
								prepend-icon="mdi-content-save-outline"
								@click="saveHandler"
							/>
							<v-list-item
								:title="$t('index.preview')"
								prepend-icon="mdi-eye-check-outline"
								@click="previewHandler"
							/>
							<v-list-item
								:title="$t('index.switch-to-otherlocale', [otherLocale.shortCode.toUpperCase()])"
								prepend-icon="mdi-translate"
								@click="changeLocaleHandler"
							/>
						</v-list>
					</v-menu>
				</v-btn>
			</v-container>
		</v-app-bar>
		<v-container class="py-0">
			<v-row>
				<v-col>
					<v-breadcrumbs
						:items="breadcrumbItems"
						class="ps-0 ms-n1"
					/>
					<v-defaults-provider
						:defaults="{
							VTextField: inputsDefaults,
							VSelect: inputsDefaults,
							VTextarea: inputsDefaults,
							VAutocomplete: inputsDefaults,
						}"
					>
						<v-form ref="formRef">
							<template-components-name-and-language
								v-model:name="form.name"
								v-model:language="form.language"
								class="mb-4"
							/>

							<template-components-category
								v-model="form.category"
								class="mb-4"
							/>

							<template-components-header
								v-if="hasHeader"
								v-model="(form.components[headerIndex] as Header)"
								class="mb-4"
							/>

							<template-components-body
								v-if="hasBody"
								v-model="(form.components[bodyIndex] as Body)"
								class="mb-4"
							/>
							<template-components-footer
								v-if="hasFooter"
								v-model="(form.components[footerIndex] as Footer)"
								class="mb-4"
							/>

							<template-components-buttons
								v-if="hasButtons"
								v-model="(form.components[buttonsIndex] as Buttons)"
								class="mb-4"
							/>

							<v-btn
								text="Save"
								prepend-icon="mdi-content-save-outline"
								variant="flat"
								height="40"
								color="btn"
								:loading="isSaving"
								@click="saveHandler"
							/>
						</v-form>
					</v-defaults-provider>
				</v-col>
				<v-col
					md="auto"
					class="hidden-sm-and-down"
				>
					<template-components-preview
						:template="form"
						class="position-sticky top-0"
					/>
				</v-col>
			</v-row>
		</v-container>
		<v-bottom-sheet
			v-model="bottomSheetModel"
			fullscreen
			class="hidden-md-and-up"
		>
			<v-card>
				<div class="text-end">
					<v-btn
						icon="mdi-close"
						variant="text"
						@click="bottomSheetModel = false"
					/>
				</div>
				<template-components-preview
					:template="form"
					class="mx-auto"
				/>
			</v-card>
		</v-bottom-sheet>
		<v-snackbar
			v-model="snackbarModel"
			v-bind="snackbarProps"
		/>
	</div>
</template>

<script lang="ts" setup>
import { VForm, VSnackbar } from 'vuetify/components'
import type { Body, Buttons, Footer, Header, Template } from '~/types/TemplatesBody'

const { locales, locale, setLocale, t } = useI18n()

const formRef = ref<InstanceType<typeof VForm>>()

const inputsDefaults = {
	variant: 'outlined',
	density: 'compact',
	rounded: 'lg',
	bgColor: 'white',
}

const breadcrumbItems = computed(() => [
	{ title: t('index.templates'), disabled: false, href: '/templates' },
	{ title: t('index.new-template-message'), disabled: true },
])

const form = reactive<Template>({
	category: 'MARKETING',
	components: [
		{
			type: 'HEADER',
			format: 'TEXT',
			value: {
				text: 'Don\'t miss out on our latest offers!',
			},
		},
		{
			type: 'BODY',
			text: 'Hey, shop now through our online store and use code OFFR30 to get 30% off of all products.\n\nTap the Offer Details button or call us for more information.',
		},
		{
			type: 'FOOTER',
			text: 'Powered by Samer',
		},
		{
			type: 'BUTTONS',
			buttons: [
				{
					type: 'URL',
					text: 'Offer Details',
					value: {
						url: 'https://google.com',
					},
				},
				{
					type: 'CALL',
					text: 'Call',
					value: {
						phone_number: '+962780850045',
					},
				},
			],
		},

	],
	language: 'en_US',
	name: '',
})

const headerIndex = computed(() => form.components.findIndex(c => c.type === 'HEADER'))

const hasHeader = computed(() => headerIndex.value !== -1)

const bodyIndex = computed(() => form.components.findIndex(c => c.type === 'BODY'))

const hasBody = computed(() => bodyIndex.value !== -1)

const buttonsIndex = computed(() => form.components.findIndex(c => c.type === 'BUTTONS'))

const hasButtons = computed(() => buttonsIndex.value !== -1)

const footerIndex = computed(() => form.components.findIndex(c => c.type === 'FOOTER'))

const hasFooter = computed(() => form.components.findIndex(c => c.type === 'FOOTER') !== -1)

const isSaving = ref(false)

const snackbarModel = ref(false)

const snackbarProps = reactive<InstanceType<typeof VSnackbar>['$props']>({})

const bottomSheetModel = ref(false)

const goTo = useGoTo()
const saveHandler = async () => {
	const validationResult = await formRef.value!.validate()

	if (validationResult.valid) {
		isSaving.value = true
		// Call the API to save the form
		setTimeout(() => {
			isSaving.value = false
			snackbarProps.color = 'success'
			snackbarProps.text = 'Template saved successfully'
			snackbarModel.value = true
		}, 2000)
	} else {
		snackbarProps.color = 'error'
		snackbarProps.text = 'Please fill all required fields'
		snackbarModel.value = true
		goTo('.v-input--error', {
			offset: -80,
		})
	}
}

const previewHandler = () => {
	bottomSheetModel.value = true
}

const otherLocale = computed(() => locales.value.find(l => l.code !== locale.value))

// const other

const changeLocaleHandler = () => {
	setLocale(otherLocale.value.code)
}
</script>
