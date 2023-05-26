import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent } from '../../../store/componentsReducer'

const EditToolbar: React.FC = () => {
	const dispatch = useDispatch()
	// 删除选中的组件
	const handleDelete = () => {
		dispatch(removeSelectedComponent())
	}
	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
