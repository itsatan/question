import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { QuestionCheckboxStatPropsType } from './interface'

const StatComponent: React.FC<QuestionCheckboxStatPropsType> = props => {
	const { stat } = props
	return (
		<div style={{ width: 400, height: 300 }}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={400}
					height={300}
					data={stat}
					margin={{
						top: 5,
						right: 30,
						left: 0,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="count" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default StatComponent
