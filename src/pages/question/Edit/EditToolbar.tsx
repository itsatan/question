import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
	changeComponentHidden,
	removeSelectedComponent,
	toggleComponentLocked,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: React.FC = () => {
	const dispatch = useDispatch()
	const { selectedId, selectedComponent } = useGetComponentInfo()
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
	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
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
		</Space>
	)
}

export default EditToolbar
