import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

const useLoadQuestionData = () => {
	const { id = '' } = useParams()
	const dispatch = useDispatch()
	const { run, data, loading, error } = useRequest(
		async (id: string) => {
			if (!id) throw new Error('没有问卷 id')
			const data = await getQuestionService(id)
			return data
		},
		{
			manual: true,
		}
	)
	// 根据获取的 data 设置 redux store
	useEffect(() => {
		if (!data) return
		const {
			title = '',
			desc = '',
			css = '',
			js = '',
			isPublished = false,
			componentList = [],
		} = data as any
		// 获取默认selectedId
		let selectedId = ''
		if (componentList.length) {
			selectedId = componentList[0].fe_id
		}
		// 设置 components redux
		dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
		// 设置 pageInfo redux
		dispatch(resetPageInfo({ title, desc, css, js, isPublished }))
	}, [data])
	// 根据id变化 发起请求
	useEffect(() => {
		run(id)
	}, [id])
	return {
		loading,
		error,
	}
}

export default useLoadQuestionData
