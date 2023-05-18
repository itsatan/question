import React, { useState } from 'react'
import { Button, Space, Divider, Tag, Popconfirm, message } from 'antd'
import {
	CopyOutlined,
	DeleteOutlined,
	EditOutlined,
	LineChartOutlined,
	StarOutlined,
} from '@ant-design/icons'
import styles from './QuestionCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '../services/question'

type PropsType = {
	_id: number
	title: string
	isPublished: boolean
	isStar: boolean
	answerCount: number
	createdAt: string
}

const QuestionCard: React.FC<PropsType> = props => {
	const { _id, title, isPublished, isStar, answerCount, createdAt } = props
	const navigate = useNavigate()

	// 更新标星
	const [isStarStatus, setIsStarStatus] = useState(isStar)
	const { loading: changeStarLoading, run: changeStar } = useRequest(
		async () => {
			await updateQuestionService(_id, { isStar: !isStarStatus })
		},
		{
			manual: true,
			onSuccess: () => {
				setIsStarStatus(!isStarStatus)
				message.success('更新成功')
			},
		}
	)

	// 复制问卷
	const { loading: duplicateLoading, run: duplicate } = useRequest(
		async () => {
			const data = await duplicateQuestionService(_id)
			return data
		},
		{
			manual: true,
			onSuccess: (result: any) => {
				navigate(`/question/edit/${result.id}`) // 跳转到问卷编辑页
				message.success('复制成功')
			},
		}
	)

	// 删除（假删除 修改isDeleted）
	const [deleteStatus, setDeleteStatus] = useState(false)
	const { loading: delLoading, run: del } = useRequest(
		async () => {
			const data = await updateQuestionService(_id, { isDeleted: true })
			return data
		},
		{
			manual: true,
			onSuccess: () => {
				setDeleteStatus(true)
				message.success('删除成功')
			},
		}
	)

	// 已经删除的问卷 不要再渲染卡片
	if (deleteStatus) return null
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h3 className={styles.left}>
					<Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
						<Space>
							{isStarStatus && <StarOutlined style={{ color: 'red' }} />}
							{title}
						</Space>
					</Link>
				</h3>
				<h3 className={styles.right}>
					<Space>
						{isPublished ? <Tag color="success">已发布</Tag> : <Tag>未发布</Tag>}
						<span>答卷：{answerCount}</span>
						<span>{createdAt}</span>
					</Space>
				</h3>
			</div>
			<Divider style={{ margin: '12px 0' }} />
			<div className={styles['button-container']}>
				<div className={styles.left}>
					<Space>
						<Button
							icon={<EditOutlined />}
							type="text"
							size="small"
							onClick={() => navigate(`/question/edit/${_id}`)}
						>
							编辑问卷
						</Button>
						<Button
							icon={<LineChartOutlined />}
							type="text"
							size="small"
							disabled={!isPublished}
							onClick={() => navigate(`/question/stat/${_id}`)}
						>
							数据统计
						</Button>
					</Space>
				</div>
				<div className={styles.right}>
					<Space>
						<Button
							icon={<StarOutlined style={{ color: isStarStatus ? 'red' : '' }} />}
							type="text"
							size="small"
							disabled={changeStarLoading}
							onClick={changeStar}
						>
							{isStarStatus ? '取消标星' : '标星'}
						</Button>
						<Popconfirm
							title="是否复制该问卷？"
							onConfirm={duplicate}
							okText="确定"
							cancelText="取消"
						>
							<Button icon={<CopyOutlined />} type="text" size="small" disabled={duplicateLoading}>
								复制
							</Button>
						</Popconfirm>
						<Popconfirm title="是否删除该问卷？" onConfirm={del} okText="确定" cancelText="取消">
							<Button icon={<DeleteOutlined />} type="text" size="small" disabled={delLoading}>
								删除
							</Button>
						</Popconfirm>
					</Space>
				</div>
			</div>
		</div>
	)
}

export default QuestionCard
