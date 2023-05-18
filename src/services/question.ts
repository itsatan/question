import axios from './ajax'
import type { ResponseType } from './ajax'

type SearchOption = {
	keyword: string
	isStar: boolean
	isDeleted: boolean
	page: number
	pageSize: number
}

// 获取单个问卷信息
export const getQuestionService = async (id: string): Promise<ResponseType> => {
	const url = `/api/question/${id}`
	const data = (await axios.get(url)) as ResponseType
	return data
}

// 获取（查询）问卷列表
export const getQuestionListService = async (
	option: Partial<SearchOption>
): Promise<ResponseType> => {
	const url = '/api/question'
	const data = (await axios.get(url, { params: option })) as ResponseType
	return data
}

// 创建问卷
export const createQuestionService = async (): Promise<ResponseType> => {
	const url = '/api/question'
	const data = (await axios.post(url)) as ResponseType
	return data
}

// 修改问卷
export const updateQuestionService = async (
	id: number,
	option: { [key: string]: any }
): Promise<ResponseType> => {
	const url = `/api/question/${id}`
	const data = (await axios.patch(url, option)) as ResponseType
	return data
}
