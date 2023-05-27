/**
 * @description 问卷 - 标题
 * @author ITSATAN
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// Title 组件配置
export default {
	title: '标题',
	type: 'questionTitle', // 要和后端统一好
	Component,
	PropComponent, // 属性组件
	defaultProps: QuestionTitleDefaultProps,
}
