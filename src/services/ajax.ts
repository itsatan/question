import axios from 'axios'
import { message as Message } from 'antd'

const instance = axios.create({
	timeout: 10 * 1000,
})

// response 拦截器
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
