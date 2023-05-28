import React from 'react'
import { Radio, Space, Typography } from 'antd'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionRadio: React.FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
	const {
		title = '单选框标题',
		isVertical = false,
		options = [],
		value = '',
	} = { ...QuestionRadioDefaultProps, ...props }
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<Radio.Group value={value}>
				<Space direction={isVertical ? 'vertical' : 'horizontal'}>
					{options.map(opt => {
						const { text, value } = opt
						return (
							<Radio key={value} value={value}>
								{text}
							</Radio>
						)
					})}
				</Space>
			</Radio.Group>
		</div>
	)
}

export default QuestionRadio
