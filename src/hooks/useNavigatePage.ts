import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	LOGIN_PATHNAME,
	MANAGE_INDEX_PATHNAME,
	isLoginOrRegister,
	isNoNeedUserInfo,
} from '../router'
import useGetUserInfo from './useGetUserInfo'

const useNavigatePage = (waitingUserData: boolean) => {
	const { username } = useGetUserInfo()
	const { pathname } = useLocation()
	const navigate = useNavigate()
	useEffect(() => {
		if (waitingUserData) return
		// 已经登陆
		if (username) {
			if (isLoginOrRegister(pathname)) {
				navigate(MANAGE_INDEX_PATHNAME)
			}
			return
		}

		// 未登录
		if (isNoNeedUserInfo(pathname)) {
			// 如果不需要用户信息的页面 直接返回
			return
		} else {
			navigate(LOGIN_PATHNAME)
		}
	}, [waitingUserData, username, pathname])
}

export default useNavigatePage
