import React from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'

const RightPanel: React.FC = () => {
	const tabsItems = [
		// 属性
		{
			key: 'props',
			label: (
				<span>
					<FileTextOutlined />
					属性
				</span>
			),
			children: <ComponentProp />,
		},
		// 页面设置
		{
			key: 'settings',
			label: (
				<span>
					<SettingOutlined />
					页面设置
				</span>
			),
			children: <div>页面设置BODY</div>,
		},
	]
	return <Tabs defaultActiveKey="props" items={tabsItems} />
}

export default RightPanel
