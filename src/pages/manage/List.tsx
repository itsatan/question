import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'

const rawQuestionList = [
	{
		_id: 1,
		title: '问卷1',
		isPublished: false,
		isStar: true,
		answerCount: 5,
		createdAt: '3月10日 13:23',
	},
	{
		_id: 2,
		title: '问卷2',
		isPublished: true,
		isStar: false,
		answerCount: 0,
		createdAt: '3月11日 17:23',
	},
	{
		_id: 3,
		title: '问卷3',
		isPublished: true,
		isStar: false,
		answerCount: 15,
		createdAt: '3月12日 21:23',
	},
	{
		_id: 4,
		title: '问卷4',
		isPublished: false,
		isStar: true,
		answerCount: 6,
		createdAt: '3月12日 19:23',
	},
]

const List: React.FC = () => {
	useTitle('小慕问卷 - 我的问卷')
	const [questionList, setQuestionList] = useState(rawQuestionList)
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<h3>我的问卷</h3>
				</div>
				<div className={styles.right}>(搜索)</div>
			</div>
			<div className={styles.content}>
				{questionList.map(question => {
					const { _id } = question
					return <QuestionCard key={_id} {...question} />
				})}
			</div>
			<div className={styles.footer}>footer</div>
		</>
	)
}

export default List
