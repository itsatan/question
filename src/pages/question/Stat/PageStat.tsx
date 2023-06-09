import React, { useState } from 'react'
import { Typography, Spin, Table, Pagination } from 'antd'
import { useRequest } from 'ahooks'
import { getStatListService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '../../../constants'

const { Title } = Typography

type PropsType = {
	selectedComponentId: string
	setSelectedComponentId: (selectedComponentId: string) => void
	setSelectedComponentType: (selectedComponentType: string) => void
}

const PageStat: React.FC<PropsType> = props => {
	const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
	const { componentList } = useGetComponentInfo()
	const { id = '' } = useParams()
	const [list, setList] = useState([])
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
	const [total, setTotal] = useState(0)

	const { loading } = useRequest(
		async () => {
			const data = await getStatListService(id, { page, pageSize })
			return data
		},
		{
			// 依赖项变化触发重新请求
			refreshDeps: [id, page, pageSize],
			onSuccess: response => {
				const { list = [], total = 0 } = response
				setList(list)
				setTotal(total)
			},
		}
	)

	const columns = componentList.map(c => {
		const { fe_id, type, props } = c
		const columnTitle = props!.title || c.title

		const handleColumnClick = () => {
			setSelectedComponentId(fe_id)
			setSelectedComponentType(type)
		}

		return {
			dataIndex: fe_id,
			title: (
				<span
					style={{ cursor: 'pointer', color: selectedComponentId === fe_id ? '#1890ff' : '' }}
					onClick={handleColumnClick}
				>
					{columnTitle}
				</span>
			),
		}
	})

	const TableElem = (
		<>
			<Table rowKey={(c: any) => c._id} columns={columns} dataSource={list} pagination={false} />
			<div style={{ textAlign: 'center', marginTop: 18 }}>
				<Pagination
					total={total}
					current={page}
					pageSize={pageSize}
					onChange={page => setPage(page)}
					onShowSizeChange={(page, pageSize) => {
						setPage(page)
						setPageSize(pageSize)
					}}
				/>
			</div>
		</>
	)
	return (
		<div>
			{loading && (
				<div style={{ textAlign: 'center', marginTop: 100 }}>
					<Spin />
				</div>
			)}
			{!loading && <Title level={3}>答卷数量: {total}</Title>}
			{!loading && TableElem}
		</div>
	)
}

export default PageStat
