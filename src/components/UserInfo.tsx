import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { removeToken } from '../utils/user-token'

const UserInfo: React.FC = () => {
	const { data } = useRequest(getUserInfoService)
	const navigate = useNavigate()
	const { username, nickname } = data || {}
	const logout = () => {
		removeToken()
		navigate(LOGIN_PATHNAME)
		message.success('退出成功')
	}
	const Info = (
		<>
			<span style={{ color: '#e8e8e8' }}>
				<UserOutlined />
				<span>{nickname}</span>
			</span>
			<Button type="link" onClick={logout}>
				退出
			</Button>
		</>
	)
	const Login = <Link to={LOGIN_PATHNAME}>登陆</Link>
	return <div>{username ? Info : Login}</div>
}

export default UserInfo
