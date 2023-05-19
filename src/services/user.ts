import axios, { ResponseDataType } from './ajax'

// 获取用户信息
export const getUserInfoService = async (): Promise<ResponseDataType> => {
	const url = `/api/user/info`
	const data = (await axios.get(url)) as ResponseDataType
	return data
}

// 注册
export const registerService = async (
	username: string,
	password: string,
	nickname?: string
): Promise<ResponseDataType> => {
	const url = '/api/user/register'
	const body = { username, password, nickname: nickname || username }
	const data = (await axios.post(url, body)) as ResponseDataType
	return data
}

// 登陆
export const loginService = async (
	username: string,
	password: string
): Promise<ResponseDataType> => {
	const url = '/api/user/login'
	const body = { username, password }
	const data = (await axios.post(url, body)) as ResponseDataType
	return data
}
