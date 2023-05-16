import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'

const useLoadQuestionData = () => {
	const { id = '' } = useParams()
	// const [loading, setLoading] = useState(true)
	// const [questionData, setQuestionData] = useState({})
	// useEffect(() => {
	// 	async function fn() {
	// 		const data = await getQuestionService(id)
	// 		setQuestionData(data)
	// 		setLoading(false)
	// 	}
	// 	fn()
	// }, [])

	const load = async () => await getQuestionService(id)
	const { loading, data, error } = useRequest(load)
	return {
		loading,
		data,
		error,
	}
}

export default useLoadQuestionData
