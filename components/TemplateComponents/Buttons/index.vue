<template>
	<div>
		<section-header
			:title="$t('Buttons.buttons')"
			:subtitle="$t('Buttons.create-buttons-that-let-your-customers-respond-to-')"
		/>
		<v-card
			flat
			class="pa-4"
		>
			<v-sheet
				color="surface2"
				class="pa-1 mb-2 d-inline-block"
				rounded
			>
				<v-btn-toggle
					v-model="tab"
					mandatory
					color="#000"
					base-color="transparent"
					variant="flat"
					selected-class="bg-white"
					rounded
					class="hidden-overlay "
					style="height:32px"
					@update:model-value="tabChangeHandler"
				>
					<v-btn
						value="NONE"
						class="py-0"
					>
						{{ $t('Buttons.none') }}
					</v-btn>

					<v-btn value="ACTIONS">
						<v-icon
							icon="mdi-at"
							start
						/>
						{{ $t('Buttons.call-to-actions') }}
					</v-btn>
				</v-btn-toggle>
			</v-sheet>

			<div v-auto-animate>
				<template-components-buttons-list
					v-if="tab === 'ACTIONS'"
					v-model="model.buttons"
				/>
			</div>
		</v-card>
	</div>
</template>

<script lang="ts" setup>
import type { Buttons, Button } from '~/types/TemplatesBody'

const model = defineModel<Buttons>({
	required: true,
})

const buttonsHistory = ref<Button[] | null>(null)

const tab = ref<'NONE' | 'ACTIONS'>(model.value.buttons.length ? 'ACTIONS' : 'NONE')

const tabChangeHandler = (value: 'NONE' | 'ACTIONS') => {
	if (value === 'NONE') {
		buttonsHistory.value = model.value.buttons
		model.value.buttons = []
	} else {
		if (buttonsHistory.value) {
			model.value.buttons = buttonsHistory.value
		}
	}
}
</script>
