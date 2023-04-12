import React from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './NotFound.module.scss'

const NotFound: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className={styles.container}>
			<Result
				icon={<SmileOutlined />}
				title="抱歉，您访问的页面不存在"
				extra={
					<Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
						返回首页
					</Button>
				}
			/>
		</div>
	)
}

export default NotFound
