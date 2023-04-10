import React, { useState } from 'react'
import produce from 'immer'

const List: React.FC = () => {
	const [questionList, setQuestionList] = useState([
		{ id: '1', title: '问卷1', isPublished: false },
		{ id: '2', title: '问卷2', isPublished: true },
		{ id: '3', title: '问卷3', isPublished: true },
		{ id: '4', title: '问卷4', isPublished: false },
	])
	const addQuestion = () => {
		const random = Math.random().toString().slice(-3)
		setQuestionList(
			produce(draft => {
				draft.push({ id: random, title: `问卷${random}`, isPublished: false })
			})
		)
	}
	const deleteQuestion = (id: string) => {
		setQuestionList(
			produce(draft => {
				const index = draft.findIndex(q => q.id === id)
				draft.splice(index, 1)
			})
		)
	}
	const updatePublish = (id: string) => {
		setQuestionList(
			produce(draft => {
				const q = draft.find(item => item.id === id)
				q && (q.isPublished = true)
			})
		)
	}
	return (
		<div>
			<h1>问卷列表</h1>
			{questionList.map(question => {
				const { id, title, isPublished } = question
				return (
					<div key={id}>
						<strong>{title}</strong>
						&nbsp;
						{/* 条件判断 */}
						{isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
						&nbsp;
						<button onClick={() => updatePublish(id)}>发布问卷</button>
						&nbsp;
						<button onClick={() => deleteQuestion(id)}>删除问卷</button>
					</div>
				)
			})}
			<button onClick={addQuestion}>新增问卷</button>
		</div>
	)
}

export default List
