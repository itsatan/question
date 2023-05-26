import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeComponentHidden, removeSelectedComponent } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: React.FC = () => {
	const dispatch = useDispatch()
	const { selectedId } = useGetComponentInfo()
	// 删除选中的组件
	const handleDelete = () => {
		dispatch(removeSelectedComponent())
	}
	// 隐藏/显示  选中的组件
	const handleHidden = () => {
		dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
	}
	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
			</Tooltip>
			<Tooltip title="隐藏">
				<Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
