import React, { useEffect } from 'react'
import styles from './Login.module.scss'
import { Space, Typography, Button, Form, Input, Checkbox } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { REGISTER_PATHNAME } from '../router'

const { Title } = Typography

interface LoginProps {
	username: string
	password: string
	remember: boolean
}

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

const rememberUser = (username: string, password: string) => {
	localStorage.setItem(USERNAME_KEY, username)
	localStorage.setItem(PASSWORD_KEY, password)
}

const deleteUserFromStorage = () => {
	localStorage.removeItem(USERNAME_KEY)
	localStorage.removeItem(PASSWORD_KEY)
}

const getUserFromStorage = () => {
	return {
		username: localStorage.getItem(USERNAME_KEY),
		password: localStorage.getItem(PASSWORD_KEY),
	}
}

const Login: React.FC = () => {
	const [form] = Form.useForm()
	useEffect(() => {
		const { username, password } = getUserFromStorage()
		form.setFieldsValue({ username, password })
	}, [])
	const onFinish = (params: LoginProps) => {
		const { username, password, remember } = params
		if (remember) {
			rememberUser(username, password)
		} else {
			deleteUserFromStorage()
		}
		console.log(params)
	}
	return (
		<div className={styles.container}>
			<Space>
				<Title level={2}>
					<UserAddOutlined />
				</Title>
				<Title level={2}>用户登录</Title>
			</Space>
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				onFinish={onFinish}
				autoComplete="off"
				initialValues={{ remember: true }}
				form={form}
			>
				<Form.Item
					label="用户名"
					name="username"
					rules={[
						{ required: true, message: '请输入用户名' },
						{ type: 'string', min: 5, max: 20, message: '字符长度在 5 - 20 之间' },
						{ pattern: /^\w+$/, message: '只能输入字母数字下划线' },
					]}
				>
					<Input placeholder="请输入用户名" />
				</Form.Item>
				<Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
					<Input.Password placeholder="请输入密码" />
				</Form.Item>
				<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
					<Checkbox>记住我</Checkbox>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Space>
						<Button type="primary" htmlType="submit">
							登陆
						</Button>
						<Link to={REGISTER_PATHNAME}>注册新用户</Link>
					</Space>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login
