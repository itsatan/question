import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'
import { createQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const path = {
	list: '/manage/list',
	start: '/manage/star',
	trash: '/manage/trash',
}

const ManageLayout: React.FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
		manual: true,
		onSuccess: response => {
			const { id } = response as any
			navigate(`/question/edit/${id}`)
			message.success('创建成功')
		},
	})
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Space direction="vertical">
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleCreateClick}
						disabled={loading}
					>
						创建问卷
					</Button>
					<Divider style={{ borderTop: 'transparent' }} />
					<Button
						type={pathname.startsWith(path.list) ? 'default' : 'text'}
						icon={<BarsOutlined />}
						onClick={() => navigate(path.list)}
					>
						我的问卷
					</Button>
					<Button
						type={pathname.startsWith(path.start) ? 'default' : 'text'}
						icon={<StarOutlined />}
						onClick={() => navigate(path.start)}
					>
						标星问卷
					</Button>
					<Button
						type={pathname.startsWith(path.trash) ? 'default' : 'text'}
						icon={<DeleteOutlined />}
						onClick={() => navigate(path.trash)}
					>
						回收站
					</Button>
				</Space>
			</div>
			<div className={styles.right}>
				<Outlet />
			</div>
		</div>
	)
}

export default ManageLayout
