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

// 通过type 获取组件配置
export const getComponentConfByType = (type: string) => {
	return componentConfList.find(item => item.type === type)
}
