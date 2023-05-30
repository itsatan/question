import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
	fe_id: string
	type: string
	title: string
	isHidden?: boolean
	isLocked?: boolean
	props: ComponentPropsType
}

export type ComponentsStateType = {
	selectedId: string
	componentList: Array<ComponentInfoType>
	copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
	// 选中项Id
	selectedId: '',
	// 组件列表
	componentList: [],
	// 复制内容(初始化null)
	copiedComponent: null,
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
				// 抽离的插入组件函数
				insertNewComponent(draft, newComponent)
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
		// 隐藏/显示  选中的组件
		changeComponentHidden: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
				const { componentList = [] } = draft
				const { fe_id, isHidden } = action.payload

				// 重新计算selectedId
				let newSelectedId = ''
				if (isHidden) {
					// 如果是隐藏
					newSelectedId = getNextSelectedId(fe_id, componentList)
				} else {
					// 如果是显示
					newSelectedId = fe_id
				}
				draft.selectedId = newSelectedId

				// 获取当前要操作的组件
				const currentComponent = componentList.find(c => c.fe_id === fe_id)
				if (currentComponent) {
					currentComponent.isHidden = isHidden
				}
			}
		),
		// 锁定/解锁  选中的组件
		toggleComponentLocked: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
				const { componentList } = draft
				const { fe_id } = action.payload
				// 获取当前要操作的组件
				const currentComponent = componentList.find(c => c.fe_id === fe_id)
				if (currentComponent) {
					currentComponent.isLocked = !currentComponent.isLocked
				}
			}
		),
		// 拷贝当前选中的组件
		copySelectedComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const selectedComponent = componentList.find(c => c.fe_id === selectedId)
			if (selectedComponent === undefined) return
			draft.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
		}),
		// 粘贴组件
		pasteCopiedComponent: produce((draft: ComponentsStateType) => {
			const { copiedComponent } = draft
			if (copiedComponent === null) return
			// 修改fe_id 确保唯一
			copiedComponent.fe_id = nanoid()
			// 抽离的插入组件函数
			insertNewComponent(draft, copiedComponent)
		}),
		// 选中上一个
		selectPrevComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
			if (selectedIndex <= 0) return //未选中组件 或 已经选中了第一个 无法在向上选中
			draft.selectedId = componentList[selectedIndex - 1].fe_id
		}),
		// 选中下一个
		selectNextComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
			if (selectedIndex < 0 || selectedIndex + 1 === componentList.length) return // 未选中组件 或 已经选中了最后一个 无法在向下选中
			draft.selectedId = componentList[selectedIndex + 1].fe_id
		}),
		// 修改组件标题
		changeComponentTitle: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
				const { componentList } = draft
				const { fe_id, title } = action.payload
				const currentComponent = componentList.find(c => c.fe_id === fe_id)
				if (currentComponent === undefined) return
				currentComponent.title = title
			}
		),

		// 移动组件
		moveComponent: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ oldIndex: number; newIndex: number }>
			) => {
				const { componentList: currentComponentList } = draft
				const { oldIndex, newIndex } = action.payload
				// 移动
				draft.componentList = arrayMove(currentComponentList, oldIndex, newIndex)
			}
		),
	},
})

export const {
	resetComponents,
	changeSelectedId,
	addComponent,
	changeComponentProps,
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLocked,
	copySelectedComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent,
	changeComponentTitle,
	moveComponent,
} = componentsReducer.actions

export default componentsReducer.reducer
