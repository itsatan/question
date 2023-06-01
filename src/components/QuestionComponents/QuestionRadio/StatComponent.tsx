import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { STAT_COLORS } from '../../../constants'
import { QuestionRadioStatType } from './interface'

const StatComponent: React.FC<QuestionRadioStatType> = props => {
	const { stat = [] } = props

	// count 求和
	const sum = useMemo(() => stat.reduce((prev, cur) => prev + cur.count, 0), [stat])

	return (
		<div style={{ width: 400, height: 400 }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart width={400} height={400}>
					<Pie
						dataKey="count"
						data={stat}
						isAnimationActive={true}
						cx="50%" // x轴偏移量
						cy="50%" // y轴偏移量
						outerRadius={50} // 饼图直径
						label={i => `${i.name}: ${((i.count / sum) * 100).toFixed(2)}%`} // 计算百分比 小数放大100倍并保留两位小数
					>
						{stat.map((item, index) => (
							<Cell key={index} fill={STAT_COLORS[index]} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default StatComponent
