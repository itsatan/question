import React from 'react'
import { Space, Typography, Button, Form, Input, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { registerService } from '../services/user'

const { Title } = Typography

interface RegisterProps {
	username: string
	password: string
	confirm: string
	nickname: string
}

const Register: React.FC = () => {
	const navigate = useNavigate()
	const { run: handleRegister } = useRequest(
		async params => {
			const { username, password, nickname } = params
			const data = await registerService(username, password, nickname)
			return data
		},
		{
			manual: true,
			onSuccess: () => {
				message.success('注册成功')
				navigate(LOGIN_PATHNAME)
			},
		}
	)
	const onFinish = (params: RegisterProps) => handleRegister(params)
	return (
		<div className={styles.container}>
			<Space>
				<Title level={2}>
					<UserAddOutlined />
				</Title>
				<Title level={2}>注册新用户</Title>
			</Space>
			<Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish} autoComplete="off">
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
				<Form.Item
					label="确认密码"
					name="confirm"
					dependencies={['password']} // 依赖 password ， password 改变会重新触发validator校验
					rules={[
						{ required: true, message: '请输入确认密码' },
						({ getFieldValue }) => ({
							validator: (_, value) => {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve()
								} else {
									return Promise.reject(new Error('两次密码不一致'))
								}
							},
						}),
					]}
				>
					<Input.Password placeholder="请输入确认密码" />
				</Form.Item>
				<Form.Item label="昵称" name="nickname">
					<Input placeholder="请输入昵称" />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Space>
						<Button type="primary" htmlType="submit">
							注册
						</Button>
						<Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
					</Space>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Register
