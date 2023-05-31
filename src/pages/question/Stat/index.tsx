import React from 'react'
import { useTitle } from 'ahooks'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

import styles from './index.module.scss'
import StatHeader from './StatHeader'

const Stat: React.FC = () => {
	const { loading } = useLoadQuestionData()
	const { title, isPublished } = useGetPageInfo()
	const navigate = useNavigate()
	// 修改页面标题
	useTitle(`问卷统计 - ${title}`)

	// Loading Elem
	const LoadingElem = (
		<div style={{ textAlign: 'center', marginTop: 100 }}>
			<Spin />
		</div>
	)
	const genContentElem = () => {
		// 判断isPublished有值 并且是布尔值的时候
		if (typeof isPublished === 'boolean' && !isPublished) {
			return (
				<Result
					status="warning"
					title="问卷暂未发布"
					extra={
						<Button type="primary" onClick={() => navigate(-1)}>
							返回上一页
						</Button>
					}
				/>
			)
		}
		return (
			<>
				<div className={styles.left}>Left</div>
				<div className={styles.main}>Main</div>
				<div className={styles.right}>Right</div>
			</>
		)
	}

	return (
		<div className={styles.container}>
			<StatHeader />
			<div className={styles['content-wrapper']}>
				{loading && LoadingElem}
				{!loading && <div className={styles.content}>{genContentElem()}</div>}
			</div>
		</div>
	)
}

export default Stat
