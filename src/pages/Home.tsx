import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<Title>问卷调查 ｜ 在线投票</Title>
				<Paragraph>已累计创建问卷 100份，发布问卷 90 份，收到答卷 980 份</Paragraph>
				<Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
					开始使用
				</Button>
			</div>
		</div>
	)
}

export default Home
