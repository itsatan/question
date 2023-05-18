import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import {
	LIST_PAGE_PARAM_KEY,
	LIST_PAGE_SIZE,
	LIST_PAGE_SIZE_PARAM_KEY,
	LIST_SEARCH_PARAMS_KEY,
} from '../constants'

type OptionType = {
	isStar: boolean
	isDeleted: boolean
}

const useLoadQuestionListData = (opt: Partial<OptionType> = {}) => {
	const { isStar, isDeleted } = opt
	const [searchParams] = useSearchParams()
	const { loading, data, error, refresh } = useRequest(
		async () => {
			const keyword = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
			const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
			const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
			const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
			return data
		},
		{
			refreshDeps: [searchParams], // 刷新的依赖项
		}
	)
	return {
		loading,
		data,
		error,
		refresh,
	}
}

export default useLoadQuestionListData
