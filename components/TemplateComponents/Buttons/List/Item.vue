<template>
	<div class="d-flex">
		<v-sheet
			color="surface2"
			class="pa-4 flex-grow-1 me-1"
			rounded
		>
			<v-row>
				<v-col
					cols="12"
					lg="4"
				>
					<v-label>
						Button type <span class="text-error">*</span>
					</v-label>
					<v-select
						:model-value="model.type"
						:items="typeItems"
						:rules="rules({ required: true, whitespace: true })"
						@update:model-value="typeChangeHandler"
					/>
				</v-col>
				<v-col
					cols="12"
					lg="3"
				>
					<v-label>
						Button Text <span class="text-error">*</span>
					</v-label>
					<v-text-field
						v-model.trim="model.text"
						:items="typeItems"
						:rules="rules({ required: true, whitespace: true })"
					/>
				</v-col>
				<v-col
					cols="12"
					lg="5"
				>
					<template v-if="model.type === 'CALL'">
						<v-label>
							Phone Number <span class="text-error">*</span>
						</v-label>

						<v-input
							:model-value="model.value.phone_number"
							:rules="[rule({ required: true, whitespace: true }), validNumber]"
						>
							<div class="d-flex flex-grow-1">
								<v-select
									v-model="countryCode"
									hide-details
									:items="countriesItems"
									item-title="title"
									item-value="value"
									class="me-2"
									max-width="90"
								>
									<template #selection="{ item }">
										<div
											class="rounded overflow-hidden"
											style="width: 32px; height: 19px;"
											v-html="item.raw.flag"
										/>
									</template>
								</v-select>
								<v-text-field
									v-model="nationalNumber"
									:items="typeItems"
									type="number"
									pattern="[0-9]{10}"
									hide-spin-buttons
									hide-details
								/>
							</div>
						</v-input>
					</template>

					<template v-else-if="model.type === 'URL'">
						<v-label>
							Website URL <span class="text-error">*</span>
						</v-label>

						<v-text-field
							v-model.trim="model.value.url"
							:rules="rules({ required: true, whitespace: true, type: 'url' })"
						/>
					</template>
				</v-col>
			</v-row>
		</v-sheet>
		<v-btn
			:icon="DeleteIcon"
			variant="text"
			@click="$emit('remove')"
		/>
	</div>
</template>

<script lang="ts" setup>
import { PhoneNumberUtil } from 'google-libphonenumber'
import { getName, registerLocale } from 'i18n-iso-countries'
import { hasFlag } from 'country-flag-icons'
import * as flags from 'country-flag-icons/string/3x2'
import DeleteIcon from '~/components/Icons/Delete.vue'
import type { Button } from '~/types/TemplatesBody'

registerLocale(await import('i18n-iso-countries/langs/en.json'))
registerLocale(await import('i18n-iso-countries/langs/ar.json'))

const model = defineModel<Button>({
	required: true,
})

type Emit = {
	(key: 'remove'): void
}

defineEmits<Emit>()

const typeItems = [
	{
		value: 'CALL',
		title: 'Phone Number',
	},
	{
		value: 'URL',
		title: 'Visit Website',
	},
]

const typeChangeHandler = (value: string) => {
	if (value === 'CALL') {
		model.value = {
			type: 'CALL',
			text: model.value.text,
			value: {
				phone_number: '',
			},
		}
	} else {
		model.value = {
			type: 'URL',
			text: model.value.text,
			value: {
				url: '',
			},
		}
	}
}

const phoneUtil = PhoneNumberUtil.getInstance()

const nationalNumber = computed({
	get() {
		if (model.value.type !== 'CALL') {
			return ''
		}
		try {
			const parsedNumber = phoneUtil.parse(model.value.value.phone_number)

			return parsedNumber.getNationalNumber()?.toString() || ''
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_e) {
			return ''
		}
	},
	set(nationalNumber: string) {
		console.log('🚀 ~ set ~ value:', nationalNumber)
		if (model.value.type !== 'CALL') {
			return
		}
		model.value.value.phone_number = `+${countryCode.value}${nationalNumber}`
	},
})

const countryCode = computed({
	get() {
		if (model.value.type !== 'CALL') {
			return ''
		}
		try {
			const parsedNumber = phoneUtil.parse(model.value.value.phone_number)

			return parsedNumber.getCountryCode()?.toString() || ''
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_e) {
			return model.value.value.phone_number.replace(/\D/g, '').slice(0, 3)
		}
	},
	set(countryCode: string) {
		if (model.value.type !== 'CALL') {
			return ''
		}
		model.value.value.phone_number = `+${countryCode}${nationalNumber.value}`
	},
})

const { localeProperties } = useI18n()

const countriesItems = phoneUtil.getSupportedRegions().map(country => ({
	code: country,
	value: phoneUtil.getCountryCodeForRegion(country).toString(),
	title: getName(country, localeProperties.value.shortCode) || country,
	flag: hasFlag(country) ? flags[country] : '',
}))

const validNumber = (value: string | undefined) => {
	try {
		const parsedNumber = phoneUtil.parse(value)
		if (!phoneUtil.isValidNumber(parsedNumber)) {
			return 'Invalid phone number'
		}

		return true
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (_e) {
		return 'Invalid phone number'
	}
}
</script>
