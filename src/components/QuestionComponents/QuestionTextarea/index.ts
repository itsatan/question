/**
 * @description 问卷 - 多行输入
 * @author ITSATAN
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTextareaDefaultProps } from './interface'

export * from './interface'

// Textarea 组件配置
export default {
	title: '多行输入',
	type: 'questionTextarea', // 要和后端统一好
	Component,
	PropComponent, // 属性组件
	defaultProps: QuestionTextareaDefaultProps,
}
