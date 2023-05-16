import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: React.FC = () => {
	const { loading, data } = useLoadQuestionData()
	return <>{loading ? <p>loading...</p> : <div>Edit:{JSON.stringify(data)}</div>}</>
}

export default Edit
