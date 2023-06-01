export type OptionsType = {
	text: string
	value: string
	checked: boolean
}

export type QuestionCheckboxPropsType = {
	title?: string
	isVertical?: boolean
	list?: Array<OptionsType>

	// 用于PropComponent
	onChange?: (newProps: QuestionCheckboxPropsType) => void
	disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
	title: '复选框标题',
	isVertical: false,
	list: [
		{ text: '选项1', value: 'item1', checked: false },
		{ text: '选项2', value: 'item2', checked: false },
		{ text: '选项3', value: 'item3', checked: false },
	],
}

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
	stat: Array<{ name: string; count: number }>
}
