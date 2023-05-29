import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

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
		// 更新网页标题
		changePageTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
			draft.title = action.payload
		}),
	},
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
