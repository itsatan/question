import React from 'react'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography

const QuestionInput: React.FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
	const { title = '输入框标题', placeholder = '请输入...' } = {
		...QuestionInputDefaultProps,
		...props,
	}
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<Input placeholder={placeholder} style={{ display: 'block' }} />
		</div>
	)
}

export default QuestionInput
