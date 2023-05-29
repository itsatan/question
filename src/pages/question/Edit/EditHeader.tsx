import React, { ChangeEvent, useRef, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Input, InputRef, Space, Typography } from 'antd'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'

const { Title } = Typography

// 显示和修改标题
const TitleElem = () => {
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
						<Button>保存</Button>
						<Button type="primary">发布</Button>
					</Space>
				</div>
			</div>
		</div>
	)
}

export default EditHeader
