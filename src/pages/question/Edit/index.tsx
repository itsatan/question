import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

const Edit: React.FC = () => {
	const { loading } = useLoadQuestionData()
	const dispatch = useDispatch()
	// return <>{loading ? <p>loading...</p> : <div>Edit:{JSON.stringify(data)}</div>}</>
	// 点击画布灰色区域 清空选中框
	const clearSelectedId = () => {
		dispatch(changeSelectedId(''))
	}
	return (
		<div className={styles.container}>
			<EditHeader />
			<div className={styles['container-wrapper']}>
				<div className={styles.content}>
					<div className={styles.left}>
						<LeftPanel />
					</div>
					<div className={styles.main} onClick={clearSelectedId}>
						<div className={styles['canvas-wrapper']}>
							<EditCanvas loading={loading} />
						</div>
					</div>
					<div className={styles.right}>
						<RightPanel />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Edit
