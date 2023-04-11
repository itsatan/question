import React from 'react'
import styles from './QuestionCard.module.scss'

type PropsType = {
	_id: number
	title: string
	isPublished: boolean
	isStar: boolean
	answerCount: number
	createdAt: string
}

const QuestionCard: React.FC<PropsType> = (props: PropsType) => {
	const { _id } = props
	return (
		<>
			<p>{_id}</p>
		</>
	)
}

export default QuestionCard
