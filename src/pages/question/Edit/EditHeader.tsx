import React, { ChangeEvent, useRef, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Input, InputRef, Space, Typography, message } from 'antd'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '../../../services/question'

const { Title } = Typography

// 显示和修改标题
const TitleElem: React.FC = () => {
	const { title } = useGetPageInfo()
	const inputRef = useRef<InputRef>(null)
	const dispatch = useDispatch()
	const [editState, setEditState] = useState(false)
	const handleClick = async () => {
		await setEditState(true)
		inputRef.current && inputRef.current.focus()
	}
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newTitle = event.target.value.trim()
		if (!newTitle) return
		dispatch(changePageTitle(newTitle))
	}
	if (editState) {
		return (
			<Input
				ref={inputRef}
				value={title}
				onBlur={() => setEditState(false)}
				onPressEnter={() => setEditState(false)}
				onChange={handleChange}
			/>
		)
	}
	return (
		<Space>
			<Title level={5}>{title}</Title>
			<Button type="text" icon={<EditOutlined />} onClick={handleClick} />
		</Space>
	)
}

// 保存和自动保存
const SaveButton: React.FC = () => {
	const { id } = useParams()
	const pageInfo = useGetPageInfo()
	const { componentList = [] } = useGetComponentInfo()

	const { loading, run: save } = useRequest(
		async () => {
			if (!id) return
			await updateQuestionService(+id, { ...pageInfo, componentList })
		},
		{ manual: true }
	)

	// 快捷键保存
	useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
		// 禁用默认行为（网页保存）
		event.preventDefault()
		if (!loading) save()
	})

	// 防抖-自动保存（不是定时器）
	useDebounceEffect(
		() => {
			save()
		},
		[pageInfo, componentList],
		{ wait: 1000 } // 1000毫秒
	)

	return (
		<Button loading={loading} disabled={loading} onClick={save}>
			保存
		</Button>
	)
}

// 发布按钮
const PublishButton: React.FC = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const pageInfo = useGetPageInfo()
	const { componentList = [] } = useGetComponentInfo()

	const { loading, run: pub } = useRequest(
		async () => {
			if (!id) return
			await updateQuestionService(+id, {
				...pageInfo,
				componentList,
				isPublished: true, // 标志问卷已发布
			})
		},
		{
			manual: true,
			onSuccess: () => {
				message.success('发布成功')
				navigate(`/question/stat/${id}`) // 跳转统计页面
			},
		}
	)
	return (
		<Button type="primary" onClick={pub} loading={loading} disabled={loading}>
			发布
		</Button>
	)
}

const EditHeader: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className={styles['header-wrapper']}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
							返回
						</Button>
						<TitleElem />
					</Space>
				</div>
				<div className={styles.main}>
					<EditToolbar />
				</div>
				<div className={styles.right}>
					<Space>
						<SaveButton />
						<PublishButton />
					</Space>
				</div>
			</div>
		</div>
	)
}

export default EditHeader
