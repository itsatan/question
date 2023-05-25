import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'

export type StateType = {
	user: UserStateType
	components: ComponentsStateType
}

// configure 安装 store 仓库
export default configureStore({
	reducer: {
		user: userReducer,
		components: componentsReducer,
	},
})
