/**
 * @description 设置/获取/删除 TOKEN
 */

const KEY = '__USER_TOKEN__'

export const setToken = (token: string) => {
	return localStorage.setItem(KEY, token)
}

export const getToken = () => {
	return localStorage.getItem(KEY) || ''
}

export const removeToken = () => {
	return localStorage.removeItem(KEY)
}
