import React from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'

const LeftPanel: React.FC = () => {
	const tabsItems = [
		{
			key: 'componentLib',
			label: (
				<span>
					<AppstoreOutlined />
					组件库
				</span>
			),
			children: <ComponentLib />,
		},
		{
			key: 'layers',
			label: (
				<span>
					<BarsOutlined />
					图层
				</span>
			),
			children: <div>图层</div>,
		},
	]
	return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
}

export default LeftPanel
