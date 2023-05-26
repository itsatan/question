import React from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: React.FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
	const {
		text = '一行标题',
		level = 1,
		isCenter = false,
	} = { ...QuestionTitleDefaultProps, ...props }

	// 生成字体大小
	const genFontSize = (level: number) => {
		switch (level) {
			case 1:
				return '24px'
			case 2:
				return '20px'
			case 3:
				return '16px'
			case 4:
				return '14px'
			case 5:
				return '12px'
			default:
				return '12px'
		}
	}

	return (
		<Title
			level={level}
			style={{
				textAlign: isCenter ? 'center' : 'start',
				marginBottom: 0,
				fontSize: genFontSize(level),
			}}
		>
			{text}
		</Title>
	)
}

export default QuestionTitle
