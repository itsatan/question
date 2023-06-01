/**
 * @description 问卷 - 单选
 * @author ITSATAN
 */
import Component from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { QuestionRadioDefaultProps } from './interface'

export * from './interface'

// Radio 组件配置
export default {
	title: '单选',
	type: 'questionRadio',
	Component,
	PropComponent,
	StatComponent,
	defaultProps: QuestionRadioDefaultProps,
}
