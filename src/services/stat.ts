import axios, { ResponseDataType } from './ajax'

type StatListOption = {
	page: number
	pageSize: number
}

// 获取问卷统计列表
export const getStatListService = async (
	questionId: string,
	option: Partial<StatListOption>
): Promise<ResponseDataType> => {
	const url = `/api/stat/${questionId}`
	const data = (await axios.get(url, { params: option })) as ResponseDataType
	return data
}
