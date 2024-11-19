<template>
	<div>
		<section-header
			:title="$t('Category.category')"
			:subtitle="t('Category.choose-your-message-template')"
		/>
		<v-card
			flat
			class="pa-4"
		>
			<v-input
				:model-value="model"
				:rules="rules({ required: true })"
			>
				<div class="flex-grow-1">
					<v-card
						v-for="item, i in items"
						:key="i"
						:color="item.value === model? item.color:undefined"
						rounded
						flat
						border
						class="pa-2 mb-2 d-flex align-center no-item-flex"
						@click="(model = item.value as Template['category'])"
					>
						<template #prepend>
							<v-avatar color="white">
								<v-icon :icon="item.icon" />
							</v-avatar>
						</template>

						<template #item>
							<div>
								<v-card-title class="pb-0">
									{{ item.title }}
								</v-card-title>
								<v-card-subtitle>
									{{ item.subtitle }}
								</v-card-subtitle>
							</div>
						</template>
					</v-card>
				</div>
			</v-input>
		</v-card>
	</div>
</template>

<script lang="ts" setup>
import MarketingIcon from '~/components/Icons/Marketing.vue'
import UtilityIcon from '~/components/Icons/Utility.vue'
import type { Template } from '~/types/TemplatesBody'

const model = defineModel<Template['category']>()

const { t } = useI18n()

const items = computed(() => [
	{
		title: t('Category.marketing'),
		subtitle: t('Category.send-promotions-and-information-about-your-product'),
		value: 'MARKETING',
		color: '#E4E5EF',
		icon: MarketingIcon,
	},
	{
		title: t('Category.utility'),
		subtitle: t('Category.send-messages-about-an-existing-order-or-account'),
		value: 'UTILITY',
		color: '#EDF2F7',
		icon: UtilityIcon,
	},
])
</script>
