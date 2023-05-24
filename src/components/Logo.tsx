import React, { useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'

const { Title } = Typography

const Logo: React.FC = () => {
	const { username } = useGetUserInfo()
	const [pathName, setPatchName] = useState(HOME_PATHNAME)
	useEffect(() => {
		if (username) {
			setPatchName(MANAGE_INDEX_PATHNAME)
		}
	}, [username])
	return (
		<div className={styles.logo}>
			<Link to={pathName}>
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
