import React from 'react'
import { Checkbox, Space, Typography } from 'antd'
import { OptionsType, QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface'

const { Paragraph } = Typography

const QuestionCheckbox: React.FC<QuestionCheckboxPropsType> = (
	props: QuestionCheckboxPropsType
) => {
	const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<Space direction={isVertical ? 'vertical' : 'horizontal'}>
				{list.map((opt: OptionsType) => {
					const { text, value, checked } = opt
					return (
						<Checkbox key={value} value={value} checked={checked}>
							{text}
						</Checkbox>
					)
				})}
			</Space>
		</div>
	)
}

export default QuestionCheckbox
