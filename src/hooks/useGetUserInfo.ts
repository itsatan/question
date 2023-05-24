import { useSelector } from 'react-redux'
import type { StateType } from '../store'
import { UserStateType } from '../store/user'

const useUserInfo = () => {
	const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
	return {
		username,
		nickname,
	}
}

export default useUserInfo
