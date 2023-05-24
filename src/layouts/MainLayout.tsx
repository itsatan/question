import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import styles from './MainLayout.module.scss'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavigatePage from '../hooks/useNavigatePage'

const { Header, Content, Footer } = Layout

const MinLayout: React.FC = () => {
	const waitingUserData = useLoadUserData()
	useNavigatePage(waitingUserData)
	return (
		<Layout>
			<Header className={styles.header}>
				<div className={styles.left}>
					<Logo />
				</div>
				<div className={styles.right}>
					<UserInfo />
				</div>
			</Header>
			<Content className={styles.main}>
				{/* 存在用户信息 渲染Outlet */}
				{waitingUserData ? (
					<div style={{ textAlign: 'center', marginTop: 100 }}>
						<Spin />
					</div>
				) : (
					<Outlet />
				)}
			</Content>
			<Footer className={styles.footer}>小慕问卷 &copy; 2023 - present. Created by 双越老师</Footer>
		</Layout>
	)
}

export default MinLayout
