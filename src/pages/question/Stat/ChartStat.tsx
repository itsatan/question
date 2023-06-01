import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getComponentStatService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '../../../components/QuestionComponents'

const { Title } = Typography

type PropsType = {
	selectedComponentId: string
	selectedComponentType: string
}

const ChartStat: React.FC<PropsType> = props => {
	const { selectedComponentId, selectedComponentType } = props
	const { id = '' } = useParams()
	const [stat, setStat] = useState([])
	const { run } = useRequest(
		async (questionId, componentId) => await getComponentStatService(questionId, componentId),
		{
			manual: true,
			onSuccess: result => {
				setStat(result.stat)
			},
		}
	)

	useEffect(() => {
		// 监听selectedComponentId 触发run获取数据
		selectedComponentId && run(id, selectedComponentId)
	}, [id, selectedComponentId])

	const genStatElem = () => {
		if (!selectedComponentId)
			return <div style={{ textAlign: 'center', marginTop: 100 }}>未选中任何组件</div>
		// 通过type获取组件配置 解构出统计组件
		const QuestionComponentConf = getComponentConfByType(selectedComponentType)
		if (QuestionComponentConf === undefined) return null
		const { StatComponent } = QuestionComponentConf
		if (StatComponent === undefined) return <span>该组件暂无图标统计</span>
		return <StatComponent stat={stat} />
	}

	return (
		<>
			<Title level={3}>图标统计</Title>
			<div>{genStatElem()}</div>
		</>
	)
}

export default ChartStat
