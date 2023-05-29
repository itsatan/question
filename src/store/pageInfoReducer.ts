import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
	title: string
	desc?: string
	css?: string
	js?: string
}

const INIT_STATE: PageInfoType = {
	title: '',
	desc: '',
	css: '',
	js: '',
}

const pageInfoSlice = createSlice({
	name: 'pageInfo',
	initialState: INIT_STATE,
	reducers: {
		// 重置PAGE_INFO （初始化）
		resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
			return action.payload
		},
	},
})

export const { resetPageInfo } = pageInfoSlice.actions
export default pageInfoSlice.reducer
