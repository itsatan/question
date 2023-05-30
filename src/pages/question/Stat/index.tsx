import React from 'react'
import { useTitle } from 'ahooks'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: React.FC = () => {
	const { loading } = useLoadQuestionData()
	const { title, isPublished } = useGetPageInfo()
	const navigate = useNavigate()
	// 修改页面标题
	useTitle(`问卷统计 - ${title}`)

	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: 100 }}>
				<Spin />
			</div>
		)
	}

	if (!isPublished) {
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

	return <div>Statistic</div>
}

export default Stat
