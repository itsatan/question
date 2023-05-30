import React from 'react'
import styles from './EditCanvas.module.scss'
import classNames from 'classnames'
// import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
// import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
	ComponentInfoType,
	changeSelectedId,
	moveComponent,
} from '../../../store/componentsReducer'
import { ComponentConfType, getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

type EditCanvasPropsType = {
	loading: boolean
}

// 生成组件
const genComponent = (componentInfo: ComponentInfoType) => {
	const { type, props } = componentInfo
	// 根据type获取到对应的组件配置
	const componentConf = getComponentConfByType(type)
	if (componentConf === null) return null
	const { Component } = componentConf as ComponentConfType
	return <Component {...props} />
}

const EditCanvas: React.FC<EditCanvasPropsType> = ({ loading }) => {
	const { componentList, selectedId } = useGetComponentInfo()
	const dispatch = useDispatch()
	const handleClick = (event: React.MouseEvent, id: string) => {
		event.stopPropagation() // 阻止冒泡
		dispatch(changeSelectedId(id))
	}

	// 绑定快捷键
	useBindCanvasKeyPress()

	// 具有id的组件列表
	const componentListWithId = componentList.map(c => ({ ...c, id: c.fe_id }))
	// 拖拽排序结束
	const handleDragEnd = (oldIndex: number, newIndex: number) => {
		dispatch(moveComponent({ oldIndex, newIndex }))
	}

	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: 50 }}>
				<Spin />
			</div>
		)
	}
	return (
		<SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
			<div className={styles.canvas}>
				{componentList
					.filter(c => !c.isHidden)
					.map(c => {
						const { fe_id, isLocked } = c
						// 拼接className
						const wrapperDefaultClassName = styles['component-wrapper']
						const selectedClassName = styles.selected
						const lockedClassName = styles.locked
						const wrapperClassName = classNames({
							[wrapperDefaultClassName]: true,
							[selectedClassName]: fe_id === selectedId,
							[lockedClassName]: isLocked,
						})
						return (
							<SortableItem key={fe_id} id={fe_id}>
								<div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
									<div className={styles.component}>{genComponent(c)}</div>
								</div>
							</SortableItem>
						)
					})}
				{/* <div className={styles['component-wrapper']}>
				<div className={styles.component}>
					<QuestionTitle />
				</div>
			</div>
			<div className={styles['component-wrapper']}>
				<div className={styles.component}>
					<QuestionInput />
				</div>
			</div> */}
			</div>
		</SortableContainer>
	)
}

export default EditCanvas
