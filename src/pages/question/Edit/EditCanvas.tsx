import React from 'react'
import styles from './EditCanvas.module.scss'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import { Spin } from 'antd'

type EditCanvasPropsType = {
	loading: boolean
}

const EditCanvas: React.FC<EditCanvasPropsType> = ({ loading }) => {
	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: 50 }}>
				<Spin />
			</div>
		)
	}
	return (
		<div className={styles.canvas}>
			<div className={styles['component-wrapper']}>
				<div className={styles.component}>
					<QuestionTitle />
				</div>
			</div>
			<div className={styles['component-wrapper']}>
				<div className={styles.component}>
					<QuestionInput />
				</div>
			</div>
		</div>
	)
}

export default EditCanvas
