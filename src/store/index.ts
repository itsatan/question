import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

export type StateType = {
	user: UserStateType
	// undo 之前
	// components: StateWithHistory<ComponentsStateType>
	// 添加 undo 之后
	components: StateWithHistory<ComponentsStateType>
	pageInfo: PageInfoType
}

// configure 安装 store 仓库
export default configureStore({
	reducer: {
		user: userReducer,
		// undo 之前
		// components: componentsReducer,
		// 添加 undo 之后

		components: undoable(componentsReducer, {
			limit: 20, //限制 undo 20步
			filter: excludeAction([
				// 不需要触发undo的action
				'components/resetComponents',
				'components/changeSelectedId',
				'components/selectPrevComponent',
				'components/selectNextComponent',
			]),
		}),
		pageInfo: pageInfoReducer,
	},
})
