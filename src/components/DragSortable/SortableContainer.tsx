/**
 * 文档Demo：https://docs.dndkit.com/presets/sortable
 */
import React from 'react'
import {
	DndContext,
	closestCenter,
	// KeyboardSensor,
	// PointerSensor,
	MouseSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core'
import {
	// arrayMove,
	SortableContext,
	// sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'

type PropsType = {
	children: JSX.Element | JSX.Element[]
	items: Array<{ id: string; [key: string]: any }>
	onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer: React.FC<PropsType> = (props: PropsType) => {
	const { children, items, onDragEnd } = props
	const sensors = useSensors(
		// 鼠标相关
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 8, // 如果鼠标移动超过8px 则认为进行拖拽
			},
		})
		// useSensor(PointerSensor), 点击相关
		// useSensor(KeyboardSensor, { // 键盘相关
		// 	coordinateGetter: sortableKeyboardCoordinates,
		// })
	)
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (over === null) return
		if (active.id !== over.id) {
			const oldIndex = items.findIndex(c => c.id === active.id)
			const newIndex = items.findIndex(c => c.id === over.id)
			onDragEnd(oldIndex, newIndex)
		}
	}
	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{children}
			</SortableContext>
		</DndContext>
	)
}

export default SortableContainer
