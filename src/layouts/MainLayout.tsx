import React from 'react'
import { Outlet } from 'react-router-dom'

const MinLayout: React.FC = () => {
	return (
		<div>
			<div>header</div>
			<div>
				<Outlet />
			</div>
			<div>footer</div>
		</div>
	)
}

export default MinLayout
