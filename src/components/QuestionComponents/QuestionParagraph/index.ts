/**
 * @description 问卷 - 段落
 * @author ITSATAN
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

// Paragraph组件配置
export default {
	title: '段落',
	type: 'questionParagraph',
	Component,
	PropComponent,
	defaultProps: QuestionParagraphDefaultProps,
}
