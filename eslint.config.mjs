import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

import typegen from 'eslint-typegen'

export default typegen(createConfigForNuxt({
	features: {
		stylistic: {
			indent: 'tab',
			semi: false,
			quotes: 'single',
			blockSpacing: true,
			jsx: false,
			flat: true,
			braceStyle: '1tbs',

		},
	},
}, {
	rules: {
	},
})
	.override('nuxt/javascript', {
		rules: {
			'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
		},
	})
	.override('nuxt/vue/single-root', {
		rules: {
			'vue/no-multiple-template-root': 'off',
		},
	})
	.override('nuxt/stylistic', {
		rules: {
			'@stylistic/indent': ['error', 'tab', {
				ArrayExpression: 1,
				CallExpression: {
					arguments: 1,
				},
				flatTernaryExpressions: false,
				FunctionDeclaration: {
					body: 1,
					parameters: 1,
				},
				FunctionExpression: {
					body: 1,
					parameters: 1,
				},
				ignoreComments: false,
				ignoredNodes: [
					'TSUnionType',
					'TSIntersectionType',
					'TSTypeParameterInstantiation',
					'FunctionExpression > .params[decorators.length > 0]',
					'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
				],
				ImportDeclaration: 1,
				MemberExpression: 1,
				ObjectExpression: 1,
				offsetTernaryExpressions: true,
				outerIIFEBody: 1,
				SwitchCase: 1,
				tabLength: 4,
				VariableDeclarator: 1,
			}],

		},
	})
	.override('nuxt/vue/rules', {
		rules: {
			'vue/max-attributes-per-line': ['error', {
				singleline: {
					max: 1,
				},
				multiline: {
					max: 1,
				},
			}],
			'vue/valid-v-slot': ['error', {
				allowModifiers: true,
			}],
			'vue/multi-word-component-names': 'off',
			'vue/no-v-html': 'off',
		},
	})
	.override('nuxt/typescript/rules', {
		rules: {
			// ...Override rules, for example:
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/prefer-literal-enum-member': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@typescript-eslint/no-dynamic-delete': 'off',
			'@typescript-eslint/no-extraneous-class': 'off',
			'@typescript-eslint/unified-signatures': 'off',
		},
	}),
)
