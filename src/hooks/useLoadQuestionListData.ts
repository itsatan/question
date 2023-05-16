import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAMS_KEY } from '../constants'

const useLoadQuestionListData = () => {
	const [searchParams] = useSearchParams()
	const { loading, data, error } = useRequest(
		async () => {
			const keyword = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
			const data = await getQuestionListService({ keyword })
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
	}
}

export default useLoadQuestionListData
