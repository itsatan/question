import React from 'react'
import { useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'

const { Title } = Typography

const Star: React.FC = () => {
	useTitle('小慕问卷 - 标星问卷')
	const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
	const { list = [], total = 0 } = data as any
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>标星问卷</Title>
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
				{!loading && list.length === 0 && <Empty description="暂无标星问卷" />}
				{list.length > 1 &&
					list.map((question: any) => {
						const { _id } = question
						return <QuestionCard key={_id} {...question} />
					})}
			</div>
			<div className={styles.footer}>
				<ListPage total={total} />
			</div>
		</>
	)
}

export default Star
