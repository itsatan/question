import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId } from './utils'

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
		// 修改组件属性
		changeComponentProps: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
			) => {
				const { fe_id, newProps } = action.payload
				// 找到当前要修改的组件
				const currentComponent = draft.componentList.find(c => c.fe_id === fe_id)
				if (currentComponent) {
					currentComponent.props = {
						...currentComponent.props,
						...newProps, // 传入参数覆盖之前的props
					}
				}
			}
		),
		// 删除选中的组件
		removeSelectedComponent: produce((draft: ComponentsStateType) => {
			const { componentList = [], selectedId: deleteId } = draft

			// 重新计算selectedId
			const newSelectedId = getNextSelectedId(deleteId, componentList)
			draft.selectedId = newSelectedId

			// 根据当前选中组件的索引删除组件
			const index = componentList.findIndex(c => c.fe_id === deleteId)
			componentList.splice(index, 1)
		}),
	},
})

export const {
	resetComponents,
	changeSelectedId,
	addComponent,
	changeComponentProps,
	removeSelectedComponent,
} = componentsReducer.actions

export default componentsReducer.reducer
