import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
	removeSelectedComponent,
	copySelectedComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent,
} from '../store/componentsReducer'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

/**
 * 判断当前激活元素是否合法
 */
const isActiveElementValid = () => {
	const activeElem = document.activeElement
	// dnd-kit 之前
	// if (activeElem === document.body) return true
	// dnd-kit 之后
	if (activeElem === document.body) return true
	// 如果元素被指定的选择器字符串选择，Element.matches() 方法返回 true; 否则返回 false。
	if (activeElem?.matches('div[role="button"]')) return true
	return false
}

/**
 * 绑定快捷键
 */
const useBindCanvasKeyPress = () => {
	const dispatch = useDispatch()

	// 删除组件
	useKeyPress(['backspace', 'delete'], () => {
		if (!isActiveElementValid()) return
		dispatch(removeSelectedComponent())
	})

	// 复制组件 ctrl.c - Window  meta.c - Mac
	useKeyPress(['ctrl.c', 'meta.c'], () => {
		if (!isActiveElementValid()) return
		dispatch(copySelectedComponent())
	})

	// 粘贴组件 ctrl.v - Window  meta.v - Mac
	useKeyPress(['ctrl.v', 'meta.v'], () => {
		if (!isActiveElementValid()) return
		dispatch(pasteCopiedComponent())
	})

	// 选中上一个
	useKeyPress('uparrow', () => {
		if (!isActiveElementValid()) return
		dispatch(selectPrevComponent())
	})

	// 选中下一个
	useKeyPress('downarrow', () => {
		if (!isActiveElementValid()) return
		dispatch(selectNextComponent())
	})

	//  exactMatch 开启严格匹配

	// 撤销
	useKeyPress(
		['ctrl.z', 'meta.z'],
		() => {
			if (!isActiveElementValid()) return
			dispatch(UndoActionCreators.undo())
		},
		{
			exactMatch: true,
		}
	)

	// 重做
	useKeyPress(
		['ctrl.shift.z', 'meta.shift.z'],
		() => {
			if (!isActiveElementValid()) return
			dispatch(UndoActionCreators.redo())
		},
		{
			exactMatch: true,
		}
	)
}

export default useBindCanvasKeyPress
