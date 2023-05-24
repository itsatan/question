import React from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import { Spin } from 'antd'
import useNavigatePage from '../hooks/useNavigatePage'

const QuestionLayout: React.FC = () => {
	const waitingUserData = useLoadUserData()
	useNavigatePage(waitingUserData)
	return (
		<div style={{ height: '100vh' }}>
			{waitingUserData ? (
				<div style={{ textAlign: 'center', marginTop: 100 }}>
					<Spin />
				</div>
			) : (
				<Outlet />
			)}
		</div>
	)
}

export default QuestionLayout
