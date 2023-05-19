import axios from 'axios'
import { message as Message } from 'antd'
import { getToken } from '../utils/user-token'

const instance = axios.create({
	timeout: 10 * 1000,
})

// request 请求拦截器
instance.interceptors.request.use(
	config => {
		config.headers['Authorization'] = `Bearer ${getToken()}` // 每次请求携带token
		return config
	},
	error => Promise.reject(error)
)

// response 响应拦截器
instance.interceptors.response.use(response => {
	const responseData = (response.data || {}) as ResponseType
	const { code, data, message } = responseData

	if (code) {
		Message.error(message || '系统错误')
		throw new Error(message || '系统错误')
	}

	return data as any
})

export default instance

export type ResponseDataType = {
	[key: string]: any
}

export type ResponseType = {
	code: number
	data?: ResponseDataType
	message?: string
}
