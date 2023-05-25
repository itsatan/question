import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { ComponentPropsType } from '../../components/QuestionComponents'

export type ComponentInfoType = {
	fe_id: string
	type: string
	title: string
	props: ComponentPropsType
}

export type ComponentsStateType = {
	selectedId: string
	componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
	selectedId: '',
	componentList: [],
	// todo 扩展
}

const componentsReducer = createSlice({
	name: 'components',
	initialState: INIT_STATE,
	reducers: {
		// 重置所有组件
		resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
			return action.payload
		},
		// 修改 selectedId
		changeSelectedId: produce(
			// immer 改变 react（不可变数据） 写法
			// draft === state
			(draft: ComponentsStateType, action: PayloadAction<string>) => {
				draft.selectedId = action.payload
			}
		),
	},
})

export const { resetComponents, changeSelectedId } = componentsReducer.actions

export default componentsReducer.reducer
