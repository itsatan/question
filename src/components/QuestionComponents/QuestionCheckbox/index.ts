/**
 * @description 问卷 - 复选框
 * @author ITSATAN
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './interface'

export * from './interface'

// Checkbox组件配置
export default {
	title: '复选',
	type: 'questionCheckbox',
	Component,
	PropComponent,
	defaultProps: QuestionCheckboxDefaultProps,
}
