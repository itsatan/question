import React from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './ComponentList.module.scss'
import classNames from 'classnames'
import { getComponentConfByType } from '../../../components/QuestionComponents'

type PropsType = {
	selectedComponentId: string
	setSelectedComponentId: (selectedComponentId: string) => void
	setSelectedComponentType: (selectedComponentType: string) => void
}

const ComponentList: React.FC<PropsType> = props => {
	const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

	const { componentList } = useGetComponentInfo()

	return (
		<div className={styles.container}>
			{componentList
				.filter(c => !c.isHidden)
				.map(c => {
					const { fe_id, type, props } = c
					// 拼接 class name
					const wrapperDefaultClassName = styles['component-wrapper']
					const selectedClassName = styles.selected
					const wrapperClassName = classNames({
						[wrapperDefaultClassName]: true,
						[selectedClassName]: selectedComponentId === fe_id, // 是否选中
					})
					const componentConf = getComponentConfByType(type)
					if (componentConf === undefined) return null
					const { Component } = componentConf
					return (
						<div
							key={fe_id}
							className={wrapperClassName}
							onClick={() => {
								setSelectedComponentId(fe_id)
								setSelectedComponentType(type)
							}}
						>
							<div className={styles.component}>
								<Component {...props} />
							</div>
						</div>
					)
				})}
		</div>
	)
}

export default ComponentList
