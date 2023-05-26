import React from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

// 各个组件的 Props Type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 统一定义 组件配置Type
export type ComponentConfType = {
	title: string
	type: string
	Component: React.FC<ComponentPropsType>
	defaultProps: ComponentPropsType
}

// 统一定义 全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

// 组件分组
export const componentConfGroup = [
	{
		groupId: 'text',
		groupName: '文本显示',
		components: [QuestionTitleConf],
	},
	{
		groupId: 'input',
		groupName: '用户输入',
		components: [QuestionInputConf],
	},
]

// 通过type 获取组件配置
export const getComponentConfByType = (type: string) => {
	return componentConfList.find(item => item.type === type)
}
