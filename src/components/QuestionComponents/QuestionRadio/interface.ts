export type OptionsType = {
	text: string
	value: string
}

export type QuestionRadioPropsType = {
	title?: string
	isVertical?: boolean
	options?: Array<OptionsType>
	value?: string

	onChange?: (newProps: QuestionRadioPropsType) => void
	disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
	title: '单选框标题',
	isVertical: false,
	options: [
		{ text: '选项1', value: 'item1' },
		{ text: '选项2', value: 'item2' },
		{ text: '选项3', value: 'item3' },
	],
	value: '',
}
