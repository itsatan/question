import React from 'react'
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from './interface'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const QuestionInfo: React.FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
	const { title = '问卷标题', desc = '问卷描述' } = { ...QuestionInfoDefaultProps, ...props }

	const descTextList = desc.split('\n')

	return (
		<div style={{ textAlign: 'center' }}>
			<Title style={{ fontSize: 24 }} level={1}>
				{title}
			</Title>
			<Paragraph style={{ marginBottom: 0 }}>
				{descTextList.map((t, i) => (
					<span key={i}>
						{i > 0 && <br />}
						{t}
					</span>
				))}
			</Paragraph>
		</div>
	)
}

export default QuestionInfo
