import React from 'react'
import { Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: React.FC = () => {
	return (
		<div className={styles.logo}>
			<Link to="/">
				<Space>
					<Title level={2}>
						<FormOutlined />
					</Title>
					<Title level={2}>小慕问卷</Title>
				</Space>
			</Link>
		</div>
	)
}

export default Logo
