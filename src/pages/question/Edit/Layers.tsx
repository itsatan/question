import React, { useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { message, Input, Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
	changeComponentHidden,
	changeComponentTitle,
	changeSelectedId,
	toggleComponentLocked,
} from '../../../store/componentsReducer'

import styles from './Layers.module.scss'

const Layers: React.FC = () => {
	const { componentList, selectedId } = useGetComponentInfo()
	const dispatch = useDispatch()

	// 记录当前正在修改标题的组件
	const [changingTitleId, setChangingTitleId] = useState('')

	// 点击选中组件
	function handleTitleClick(fe_id: string) {
		const currentComponent = componentList.find(c => c.fe_id === fe_id)
		if (currentComponent && currentComponent.isHidden) {
			message.info('不能选中隐藏的组件')
			return
		}
		if (fe_id !== selectedId) {
			// 当前组件未被选中，执行选中
			dispatch(changeSelectedId(fe_id))
			setChangingTitleId('')
			return
		}

		// 点击修改标题
		setChangingTitleId(fe_id)
	}

	// 修改标题
	const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		const newTitle = event.target.value.trim()
		if (!newTitle) return
		if (!selectedId) return
		dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
	}

	// 切换 隐藏/显示
	const changeHidden = (fe_id: string, isHidden: boolean) => {
		dispatch(changeComponentHidden({ fe_id, isHidden }))
	}

	// 切换 锁定/解锁
	const changeLocked = (fe_id: string) => {
		dispatch(toggleComponentLocked({ fe_id }))
	}

	return (
		<>
			{componentList.map(c => {
				const { fe_id, title, isHidden, isLocked } = c

				// 拼接 titleClassName
				const titleDefaultClassName = styles.title
				const selectedClassName = styles.selected
				const titleClassName = classNames({
					[titleDefaultClassName]: true,
					[selectedClassName]: fe_id === selectedId,
				})

				return (
					<div key={fe_id} className={styles.wrapper}>
						<div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
							{fe_id === changingTitleId && (
								<Input
									value={title}
									// 回车的时候 清空id
									onPressEnter={() => setChangingTitleId('')}
									// 失去焦点的时候 清空id
									onBlur={() => setChangingTitleId('')}
									// change时候修改标题
									onChange={changeTitle}
								/>
							)}
							{fe_id !== changingTitleId && title}
						</div>
						<div className={styles.handler}>
							<Space>
								<Button
									className={!isHidden ? styles.btn : ''}
									size="small"
									icon={<EyeInvisibleOutlined />}
									shape="circle"
									type={isHidden ? 'primary' : 'text'}
									onClick={() => changeHidden(fe_id, !isHidden)}
								/>
								<Button
									className={!isLocked ? styles.btn : ''}
									size="small"
									icon={<LockOutlined />}
									shape="circle"
									type={isLocked ? 'primary' : 'text'}
									onClick={() => changeLocked(fe_id)}
								/>
							</Space>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default Layers
