import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography

const rawQuestionList = [
	{
		_id: 1,
		title: '问卷1',
		isPublished: false,
		isStar: false,
		answerCount: 5,
		createdAt: '3月10日 13:23',
	},
	{
		_id: 2,
		title: '问卷2',
		isPublished: true,
		isStar: true,
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
		isStar: false,
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
					<Title level={3}>我的问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{questionList.length > 0 &&
					questionList.map(question => {
						const { _id } = question
						return <QuestionCard key={_id} {...question} />
					})}
			</div>
			<div className={styles.footer}>loadMore 下滑加载更多...</div>
		</>
	)
}

export default List
