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
import { updateQuestionService } from '../services/question'

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

	const duplicate = () => {
		message.success('复制成功')
	}
	const del = () => {
		message.success('删除成功')
	}
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h3 className={styles.left}>
					<Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
						<Space>
							{isStar && <StarOutlined style={{ color: 'red' }} />}
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
							<Button icon={<CopyOutlined />} type="text" size="small">
								复制
							</Button>
						</Popconfirm>
						<Popconfirm title="是否删除该问卷？" onConfirm={del} okText="确定" cancelText="取消">
							<Button icon={<DeleteOutlined />} type="text" size="small">
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
