/**
 * @description 问卷 - 信息
 * @author ITSATAN
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

// Paragraph组件配置
export default {
	title: '问卷信息',
	type: 'questionInfo',
	Component,
	PropComponent,
	defaultProps: QuestionInfoDefaultProps,
}
