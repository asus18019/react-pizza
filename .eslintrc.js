module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'xo'
	],
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'only-warn'
	],
	rules: {
		'keyword-spacing': ['error', {
			overrides: {
				if: { after: false },
				for: { after: false },
				while: { after: false },
				static: { after: false },
				as: { after: false }
			}
		}],
		'no-multiple-empty-lines': ['error', { max: 2 }],
		'no-trailing-spaces': ['error', { skipBlankLines: true }],
		'no-alert': 0,
		'object-curly-spacing': [2, 'always'],
		'eol-last': 0,
		'comma-dangle': 0,
		'arrow-body-style': 0,
		'no-mixed-spaces-and-tabs': 0,
		'template-curly-spacing': 0,
		'jsx-quotes': ['error', 'prefer-double']
	}
};