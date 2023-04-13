import React from 'react'
import { Space, Typography, Button, Form, Input } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'

const { Title } = Typography

interface RegisterProps {
	username: string
	password: string
	confirm: string
	nickname: string
}

const Register: React.FC = () => {
	const onFinish = (params: RegisterProps) => {
		console.log('提交', params)
	}
	return (
		<div className={styles.container}>
			<Space>
				<Title level={2}>
					<UserAddOutlined />
				</Title>
				<Title level={2}>注册新用户</Title>
			</Space>
			<Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish} autoComplete="off">
				<Form.Item label="用户名" name="username">
					<Input placeholder="请输入用户名" />
				</Form.Item>
				<Form.Item label="密码" name="password">
					<Input.Password placeholder="请输入密码" />
				</Form.Item>
				<Form.Item label="确认密码" name="confirm">
					<Input.Password placeholder="请确认密码" />
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
