import Component from './Component'

import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// Title 组件配置
export default {
	title: '标题',
	type: 'questionTitle', // 要和后端统一好
	Component,
	defaultProps: QuestionTitleDefaultProps,
}
