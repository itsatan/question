import React from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: React.FC = () => {
	return (
		<div>
			<div>Question Layout</div>
			<div>
				<Outlet />
			</div>
		</div>
	)
}

export default QuestionLayout
