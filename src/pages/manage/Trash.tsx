import { useTitle } from 'ahooks'
import React, { useState } from 'react'
import { Button, Empty, Modal, Space, Table, Tag, Typography, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import styles from './common.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography

const rawQuestionList = [
	{
		_id: 5,
		title: '问卷5',
		isPublished: true,
		isStar: false,
		answerCount: 5,
		createdAt: '3月10日 13:23',
	},
	{
		_id: 6,
		title: '问卷6',
		isPublished: true,
		isStar: false,
		answerCount: 0,
		createdAt: '3月11日 17:23',
	},
	{
		_id: 7,
		title: '问卷7',
		isPublished: false,
		isStar: true,
		answerCount: 15,
		createdAt: '3月12日 21:23',
	},
]

interface DataType {
	_id: number
	title: string
	isPublished: boolean
	isStar: boolean
	answerCount: number
	createdAt: string
}

const columns: ColumnsType<DataType> = [
	{
		title: '标题',
		dataIndex: 'title',
	},
	{
		title: '是否发布',
		dataIndex: 'isPublished',
		render: (isPublished: boolean) =>
			isPublished ? <Tag color="success">已发布</Tag> : <Tag>未发布</Tag>,
	},
	{
		title: '是否标星',
		dataIndex: 'isStar',
		render: (isStar: boolean) => (isStar ? <Tag color="success">已标星</Tag> : <Tag>未标星</Tag>),
	},
	{
		title: '答卷',
		dataIndex: 'answerCount',
	},
	{
		title: '创建时间',
		dataIndex: 'createdAt',
	},
]

const Trash: React.FC = () => {
	useTitle('小慕问卷 - 回收站')
	const [questionList, setQuestionList] = useState(rawQuestionList)
	const [selectedIds, setSelectedIds] = useState<React.Key[]>([])

	const delQuestion = () => {
		Modal.confirm({
			title: '确认删除该问卷？',
			icon: <ExclamationCircleOutlined />,
			content: '你正在执行彻底删除问卷操作，删除后，将无法恢复。 确认要删除吗？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				message.success('删除成功')
			},
		})
	}

	const TableElem = (
		<>
			<Space style={{ marginBottom: 15 }}>
				<Button type="primary" disabled={!selectedIds.length}>
					恢复答卷
				</Button>
				<Button danger disabled={!selectedIds.length} onClick={delQuestion}>
					彻底删除
				</Button>
			</Space>
			<Table
				columns={columns}
				dataSource={questionList}
				pagination={false}
				rowKey={q => q._id}
				rowSelection={{
					type: 'checkbox',
					onChange: selectedRowKeys => setSelectedIds(selectedRowKeys),
				}}
			/>
		</>
	)

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>回收站</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{questionList.length === 0 && <Empty description="什么都没有哦" />}
				{questionList.length > 0 && TableElem}
			</div>
		</>
	)
}

export default Trash
