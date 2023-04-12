import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, Divider } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'

const path = {
	list: '/manage/list',
	start: '/manage/star',
	trash: '/manage/trash',
}

const ManageLayout: React.FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Space direction="vertical">
					<Button type="primary" icon={<PlusOutlined />}>
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
