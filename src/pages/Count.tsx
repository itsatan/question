import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../store/count'
import { StateType } from '../store'

const Count = () => {
	const count = useSelector((state: StateType) => state.count)
	const dispatch = useDispatch()
	return (
		<div>
			<h3>COUNT:{count}</h3>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button>
		</div>
	)
}

export default Count
