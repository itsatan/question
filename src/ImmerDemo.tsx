import React, { useState } from 'react'
import produce from 'immer'

const Demo: React.FC = () => {
	const [userInfo, setUserInfo] = useState({ name: '爱笑', age: 23 })
	// const handleClick = () => {
	// 	setUserInfo({ ...userInfo, age: 22 })
	// }
	const handleClick = () => {
		setUserInfo(
			produce(draft => {
				draft.age = 222
			})
		)
	}
	return (
		<>
			<p>{JSON.stringify(userInfo)}</p>
			<button onClick={handleClick}>click</button>
		</>
	)
}

export default Demo
