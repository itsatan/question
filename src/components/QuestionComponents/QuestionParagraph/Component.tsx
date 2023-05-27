import React from 'react'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const QuestionParagraph: React.FC<QuestionParagraphPropsType> = (
	props: QuestionParagraphPropsType
) => {
	const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

	// 尽量不要使用 dangerouslySetInnerHTML 不安全
	// 处理TextArea在画布中不换行显示的问题
	const textList = text.split('\n') // 例如 ['hell','word','123','456']

	return (
		<Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
			{/* 此处改为循环 */}
			{textList.map((t, i) => (
				<span key={i}>
					{i > 0 && <br />}
					{t}
				</span>
			))}
		</Paragraph>
	)
}

export default QuestionParagraph
