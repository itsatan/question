import {
	BlockOutlined,
	CopyOutlined,
	DeleteOutlined,
	DownOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	UpOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
	changeComponentHidden,
	removeSelectedComponent,
	toggleComponentLocked,
	copySelectedComponent,
	pasteCopiedComponent,
	moveComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: React.FC = () => {
	const dispatch = useDispatch()
	const { selectedId, selectedComponent, componentList, copiedComponent } = useGetComponentInfo()
	const { isLocked } = selectedComponent || {}

	// 获取当前选中项索引
	const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
	const length = componentList.length
	// isFirst为true说明是第一个组件
	const isFirst = selectedIndex <= 0
	// isFirst为true说明是最后一个组件
	const isLast = selectedIndex + 1 >= length

	// 删除选中的组件
	const handleDelete = () => {
		dispatch(removeSelectedComponent())
	}

	// 隐藏/显示  选中的组件
	const handleHidden = () => {
		dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
	}

	// 锁定/解锁  选中的组件
	const handleLock = () => {
		dispatch(toggleComponentLocked({ fe_id: selectedId }))
	}

	// 复制组件
	const handleCopy = () => {
		dispatch(copySelectedComponent())
	}

	// 粘贴组件
	const handlePaste = () => {
		dispatch(pasteCopiedComponent())
	}

	// 上移
	const handleUpMove = () => {
		if (isFirst) return
		dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
	}

	// 下移
	const handleDownMove = () => {
		if (isLast) return
		dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
	}

	// TODO 撤销 重做

	return (
		<Space>
			<Tooltip title="删除">
				<Button
					shape="circle"
					icon={<DeleteOutlined />}
					disabled={isLocked} // 已锁定组件不可以删除
					onClick={handleDelete}
				/>
			</Tooltip>
			<Tooltip title="隐藏">
				<Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
			</Tooltip>
			<Tooltip title={isLocked ? '解锁' : '锁定'}>
				<Button
					type={isLocked ? 'primary' : 'default'}
					shape="circle"
					icon={<LockOutlined />}
					onClick={handleLock}
				/>
			</Tooltip>
			<Tooltip title="复制">
				<Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
			</Tooltip>
			<Tooltip title="粘贴">
				<Button
					shape="circle"
					icon={<BlockOutlined />}
					disabled={copiedComponent === null}
					onClick={handlePaste}
				/>
			</Tooltip>
			<Tooltip title="上移">
				<Button shape="circle" icon={<UpOutlined />} onClick={handleUpMove} disabled={isFirst} />
			</Tooltip>
			<Tooltip title="下移">
				<Button shape="circle" icon={<DownOutlined />} onClick={handleDownMove} disabled={isLast} />
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
