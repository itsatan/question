import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'

const { Title } = Typography

const rawQuestionList = [
	{
		_id: 5,
		title: '问卷5',
		isPublished: true,
		isStar: true,
		answerCount: 5,
		createdAt: '3月10日 13:23',
	},
	{
		_id: 6,
		title: '问卷6',
		isPublished: true,
		isStar: true,
		answerCount: 0,
		createdAt: '3月11日 17:23',
	},
	{
		_id: 7,
		title: '问卷7',
		isPublished: true,
		isStar: true,
		answerCount: 15,
		createdAt: '3月12日 21:23',
	},
]

const Star: React.FC = () => {
	useTitle('小慕问卷 - 标星问卷')
	const [questionList, setQuestionList] = useState(rawQuestionList)
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>标星问卷</Title>
				</div>
				<div className={styles.right}>(搜索)</div>
			</div>
			<div className={styles.content}>
				{questionList.length === 0 && <Empty description="暂无标星问卷" />}
				{questionList.length > 1 &&
					questionList.map(question => {
						const { _id } = question
						return <QuestionCard key={_id} {...question} />
					})}
			</div>
			<div className={styles.footer}> 分页...</div>
		</>
	)
}

export default Star
