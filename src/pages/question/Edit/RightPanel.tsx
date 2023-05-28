import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSettings from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

// 枚举
enum TAB_KEYS {
	PROPS_KEY = 'props',
	SETTINGS_KEY = 'settings',
}

const RightPanel: React.FC = () => {
	const { selectedId } = useGetComponentInfo()
	const [activeKey, setActiveKey] = useState(TAB_KEYS.PROPS_KEY)

	// 监听selectedId的变化 控制tab
	useEffect(() => {
		if (selectedId) setActiveKey(TAB_KEYS.PROPS_KEY)
		else setActiveKey(TAB_KEYS.SETTINGS_KEY)
	}, [selectedId])

	const tabsItems = [
		// 属性
		{
			key: TAB_KEYS.PROPS_KEY,
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
			key: TAB_KEYS.SETTINGS_KEY,
			label: (
				<span>
					<SettingOutlined />
					页面设置
				</span>
			),
			children: <PageSettings />,
		},
	]
	return <Tabs activeKey={activeKey} items={tabsItems} />
}

export default RightPanel
