import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'

const Edit: React.FC = () => {
	const { loading } = useLoadQuestionData()
	// return <>{loading ? <p>loading...</p> : <div>Edit:{JSON.stringify(data)}</div>}</>
	return (
		<div className={styles.container}>
			<div>Header</div>
			<div className={styles['container-wrapper']}>
				<div className={styles.content}>
					<div className={styles.left}>Left</div>
					<div className={styles.main}>
						<div className={styles['canvas-wrapper']}>
							<EditCanvas loading={loading} />
						</div>
					</div>
					<div className={styles.right}>Right</div>
				</div>
			</div>
		</div>
	)
}

export default Edit
