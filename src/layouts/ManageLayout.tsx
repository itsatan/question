import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

const ManageLayout: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<button>创建问卷</button>
				<br />
				<button>我的问卷</button>
				<br />
				<button>星标问卷</button>
				<br />
				<button>回收站</button>
			</div>
			<div className={styles.right}>
				<Outlet />
			</div>
		</div>
	)
}

export default ManageLayout
