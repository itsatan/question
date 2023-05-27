import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
	removeSelectedComponent,
	copySelectedComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent,
} from '../store/componentsReducer'

/**
 * 判断当前激活元素是否合法
 */
const isActiveElementValid = () => {
	const activeElem = document.activeElement
	if (activeElem === document.body) return true
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

	// TODO 撤销 重做
}

export default useBindCanvasKeyPress
