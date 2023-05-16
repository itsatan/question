import React from 'react'
import { useTitle } from 'ahooks'
import { Spin, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const { Title } = Typography

const List: React.FC = () => {
	useTitle('小慕问卷 - 我的问卷')
	const { data = {}, loading } = useLoadQuestionListData()
	const { list = [], total = 0 } = data as any
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
				{loading && (
					<div style={{ textAlign: 'center' }}>
						<Spin />
					</div>
				)}
				{!loading &&
					list?.length > 0 &&
					list?.map((question: any) => {
						const { _id } = question
						return <QuestionCard key={_id} {...question} />
					})}
			</div>
			<div className={styles.footer}>loadMore 下滑加载更多...</div>
		</>
	)
}

export default List
