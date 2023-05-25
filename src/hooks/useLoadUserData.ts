import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType, loginReducer } from '../store/userReducer'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'

const useLoadUserData = () => {
	const [waitingUserData, setWaitingUserData] = useState(true)
	const { username } = useSelector<StateType>(state => state.user) as UserStateType
	const dispatch = useDispatch()
	const { run } = useRequest(getUserInfoService, {
		manual: true,
		onSuccess: result => {
			const { username, nickname } = result
			// 存储到redux store中
			dispatch(loginReducer({ username, nickname }))
		},
		onFinally: () => {
			setWaitingUserData(false)
		},
	})
	useEffect(() => {
		// 判断当前 如果redux store 是否已经存在user信息
		if (username) {
			setWaitingUserData(false)
			return
		}
		// 如果redux store 中没有用户信息 发起请求获取用户数据
		run()
	}, [username])

	return waitingUserData
}

export default useLoadUserData
