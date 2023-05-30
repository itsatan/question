import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useTitle } from 'ahooks'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

const Edit: React.FC = () => {
	const { loading } = useLoadQuestionData()
	const dispatch = useDispatch()
	const { title } = useGetPageInfo()
	// 点击画布灰色区域 清空选中框
	const clearSelectedId = () => {
		dispatch(changeSelectedId(''))
	}
	// 修改页面标题
	useTitle(`问卷编辑 - ${title}`)
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
