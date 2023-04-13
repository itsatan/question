import React, { useEffect, useState } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAMS_KEY } from '../constants'

const { Search } = Input

const ListSearch: React.FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [searchParams] = useSearchParams()
	const [value, setValue] = useState('')
	// 将 url 获取的参数设置到value
	useEffect(() => {
		const curVal = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
		setValue(curVal)
	}, [searchParams])
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
	const handleSearch = (value: string) => {
		navigate({
			pathname,
			search: `${LIST_SEARCH_PARAMS_KEY}=${value}`,
		})
	}
	return (
		<Search
			style={{ width: 240 }}
			placeholder="请输入关键字"
			allowClear
			value={value}
			onChange={handleChange}
			onSearch={handleSearch}
		/>
	)
}

export default ListSearch
