import React from 'react'
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from './interface'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography
const { TextArea } = Input

const QuestionTextarea: React.FC<QuestionTextareaPropsType> = (
	props: QuestionTextareaPropsType
) => {
	const { title = '输入框标题', placeholder = '请输入...' } = {
		...QuestionTextareaDefaultProps,
		...props,
	}
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<TextArea placeholder={placeholder} />
		</div>
	)
}

export default QuestionTextarea
