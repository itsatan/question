import React from 'react'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import styles from './ComponentLib.module.scss'
import { addComponent } from '../../../store/componentsReducer'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'

const { Title } = Typography

// 生成组件
const genComponent = (item: ComponentConfType) => {
	const { title, type, Component, defaultProps } = item

	const dispatch = useDispatch()
	const handleClick = () => {
		dispatch(
			addComponent({
				fe_id: nanoid(),
				title,
				type,
				props: defaultProps,
			})
		)
	}
	return (
		<div key={type} className={styles.wrapper} onClick={handleClick}>
			<div className={styles.component}>
				<Component />
			</div>
		</div>
	)
}

const ComponentLib: React.FC = () => {
	return (
		<>
			{componentConfGroup.map((group, index) => {
				const { groupId, groupName, components } = group
				return (
					<div key={groupId}>
						<Title level={5} style={{ marginTop: index > 0 ? 20 : 0 }}>
							{groupName}
						</Title>
						{components.map(c => genComponent(c))}
					</div>
				)
			})}
		</>
	)
}

export default ComponentLib
