<template>
	<div>
		<section-header
			title="Category"
			subtitle="Choose your message template"
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
						:color="item.color"
						rounded
						flat
						:class="[item.value === model? 'border-md': 'opacity-50']"
						class="pa-2 mb-2 d-flex align-center"
						@click="(model = item.value as Template['category'])"
					>
						<template #prepend>
							<v-avatar color="white">
								<v-icon :icon="item.icon" />
							</v-avatar>
						</template>
						<!-- <template #append>
							<v-radio :model-value="item.value === model" />
						</template> -->
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
						<!-- <v-list-item

							v-bind="item"
							variant="tonal"
							class="mb-2 pa-2"
						>
							<template #prepend="{}">
								<v-avatar color="white">
									<v-icon :icon="item.icon" />
								</v-avatar>
							</template>
						</v-list-item> -->
					</v-card>
				</div>
			</v-input>
		</v-card>
	</div>
</template>

<script lang="ts" setup>
import type { Template } from '~/types/TemplatesBody'

const model = defineModel<Template['category']>()

const items = [
	{
		title: 'Marketing',
		subtitle: 'Send promotions and information about your products, services or business.',
		value: 'MARKETING',
		color: '#E4E5EF',
		icon: 'mdi-bullhorn-variant-outline',
	},
	{
		title: 'Utility',
		subtitle: 'Send messages about an existing order or account.',
		value: 'UTILITY',
		color: '#EDF2F7',
		icon: 'mdi-bell-outline',
	},
]
</script>
