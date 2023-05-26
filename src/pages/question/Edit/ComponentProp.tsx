import React from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProp: React.FC = () => {
	return <div style={{ textAlign: 'center', marginTop: 50 }}>未选中任何组件</div>
}

const ComponentProp: React.FC = () => {
	const { selectedComponent } = useGetComponentInfo()
	const dispatch = useDispatch()
	if (selectedComponent === undefined) return <NoProp />
	const { type, props } = selectedComponent
	// 根据type生成组件配置
	const componentConf = getComponentConfByType(type)
	if (componentConf === undefined) return <NoProp />

	const changeProps = (newProps: ComponentPropsType) => {
		if (selectedComponent === undefined) return
		// 根据fe_id找到对应的数据修改
		const { fe_id } = selectedComponent
		// redux修改组件属性
		dispatch(changeComponentProps({ fe_id, newProps }))
	}

	// 解构出属性组件
	const { PropComponent } = componentConf
	return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
