import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import type { Rule } from 'async-validator'

export default (rule: Rule & { label?: string }) => {
	const { $i18n } = useNuxtApp()

	const { t } = $i18n

	const key = rule.label || t('rules.field')

	return async (value: any) => {
		const { errorFields } = await useAsyncValidator({ [key]: value }, { [key]: rule }, {
			validateOption: {
				messages: {
					default: field => t('rules.default', { field }),
					required: field => t('rules.required', { field }),
					enum: (field, values) => t('rules.enum', { field, values }),
					whitespace: field => t('rules.whitespace', { field }),
					date: {
						format: (field, value, format) => t('rules.date.format', { field, value, format }),
						parse: (field, value) => t('rules.date.parse', { field, value }),
						invalid: (field, value) => t('rules.date.invalid', { field, value }),
					},
					types: {
						string: (field, type) => t('rules.types.string', { field, type }),
						method: (field, type) => t('rules.types.method', { field, type }),
						array: (field, type) => t('rules.types.array', { field, type }),
						object: (field, type) => t('rules.types.object', { field, type }),
						number: (field, type) => t('rules.types.number', { field, type }),
						date: (field, type) => t('rules.types.date', { field, type }),
						boolean: (field, type) => t('rules.types.boolean', { field, type }),
						integer: (field, type) => t('rules.types.integer', { field, type }),
						float: (field, type) => t('rules.types.float', { field, type }),
						regexp: (field, type) => t('rules.types.regexp', { field, type }),
						email: (field, type) => t('rules.types.email', { field, type }),
						url: (field, type) => t('rules.types.url', { field, type }),
						hex: (field, type) => t('rules.types.hex', { field, type }),
					},
					string: {
						len: (field, len) => t('rules.string.len', { field, len }),
						min: (field, min) => t('rules.string.min', { field, min }),
						max: (field, max) => t('rules.string.max', { field, max }),
						range: (field, min, max) => t('rules.string.range', { field, min, max }),
					},
					number: {
						len: (field, len) => t('rules.number.len', { field, len }),
						min: (field, min) => t('rules.number.min', { field, min }),
						max: (field, max) => t('rules.number.max', { field, max }),
						range: (field, min, max) => t('rules.number.range', { field, min, max }),
					},
					array: {
						len: (field, len) => t('rules.array.len', { field, len }),
						min: (field, min) => t('rules.array.min', { field, min }),
						max: (field, max) => t('rules.array.max', { field, max }),
						range: (field, min, max) => t('rules.array.range', { field, min, max }),
					},
					pattern: {
						mismatch: (field, value, pattern) => t('rules.pattern.mismatch', { field, value, pattern }),
					},
				},
				suppressWarning: true,
			},
		})

		const message = errorFields.value?.[key]?.map(error => error.message)?.[0]

		return message || true
	}
}
