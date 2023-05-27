/**
 * @description 问卷 - 输入框
 * @author ITSATAN
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

// Input 组件配置
export default {
	title: '输入框',
	type: 'questionInput', // 要和后端统一好
	Component,
	PropComponent, // 属性组件
	defaultProps: QuestionInputDefaultProps,
}
