import { ComponentInfoType, ComponentsStateType } from '.'

/**
 * 获取下一个selectedId
 * @param fe_id 当前id
 * @param componentList 组件列表
 * @returns newSelectedId
 */
export const getNextSelectedId = (fe_id: string, componentList: Array<ComponentInfoType>) => {
	// 过滤隐藏组件
	const visibleComponentList = componentList.filter(c => !c.isHidden)
	// 获取当前selectedId的index
	const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
	// 处理异常情况 如果没找到这个组件
	if (index < 0) return ''

	// 重新计算selectedId
	let newSelectedId = ''
	const length = visibleComponentList.length

	if (length <= 1) {
		// 如果当前组件列表只有一个组件，被删除了，就没有组件了
		newSelectedId = ''
	} else {
		// 组件至少有两个
		if (index + 1 === length) {
			// 进入此判断说明要删除最后一个组件
			newSelectedId = visibleComponentList[index - 1].fe_id // 选中上一个
		} else {
			// 进入此判断说明要删除的不是最后一个
			newSelectedId = visibleComponentList[index + 1].fe_id // 选中下一个
		}
	}
	return newSelectedId
}

/**
 * 插入新组件
 * @param draft draft state
 * @param newComponent 要插入的新组件
 */
export const insertNewComponent = (draft: ComponentsStateType, newComponent: ComponentInfoType) => {
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
