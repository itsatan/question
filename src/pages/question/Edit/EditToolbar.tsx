import {
	BlockOutlined,
	CopyOutlined,
	DeleteOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
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
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: React.FC = () => {
	const dispatch = useDispatch()
	const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
	const { isLocked } = selectedComponent || {}

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

	// TODO 上移 下移 撤销 重做

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
		</Space>
	)
}

export default EditToolbar
