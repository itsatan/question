import { createSlice } from '@reduxjs/toolkit'

const INIT_STATE = 100

// create 创建 slice 切片
export const countSlice = createSlice({
	// 模块名称
	name: 'count',
	// 初始值
	initialState: INIT_STATE,
	// reducer
	reducers: {
		increment: state => state + 1,
		decrement: state => state - 1,
	},
})

export const { increment, decrement } = countSlice.actions
export default countSlice.reducer
