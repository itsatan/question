import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './user'

export type StateType = {
	user: UserStateType
}

// configure 安装 store 仓库
export default configureStore({
	reducer: {
		user: userReducer,
	},
})
