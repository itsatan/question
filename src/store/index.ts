import { configureStore } from '@reduxjs/toolkit'
import countReducer from './count'

export type StateType = {
	count: number
}

// configure 安装 store 仓库
export default configureStore({
	reducer: {
		count: countReducer,
	},
})
