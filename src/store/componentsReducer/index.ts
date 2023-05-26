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
		// 添加新组件到画布
		addComponent: produce(
			(draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
				const newComponent = action.payload
				const { selectedId, componentList } = draft
				const index = componentList.findIndex(c => c.fe_id === selectedId)

				if (index < 0) {
					// 未选中任何组件
					draft.componentList.push(newComponent)
				} else {
					// 选中了组件 插入到组件（index）的后面
					draft.componentList.splice(index + 1, 0, newComponent)
				}

				// 更新selectedId
				draft.selectedId = newComponent.fe_id
			}
		),
	},
})

export const { resetComponents, changeSelectedId, addComponent } = componentsReducer.actions

export default componentsReducer.reducer
