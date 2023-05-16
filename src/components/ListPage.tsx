import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../constants'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type IProps = {
	total: number
}

const ListPage: React.FC<IProps> = (props: IProps) => {
	const { total } = props
	const [current, setCurrent] = useState(1)
	const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
	// 从 url 参数中找到 page pageSize , 并同步到 Pagination 中
	const [searchParams] = useSearchParams()
	useEffect(() => {
		const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
		setCurrent(page)
		const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
		setPageSize(pageSize)
	}, [searchParams])

	// 当 page pageSize 改变时,跳转页面(改变 url 参数)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	function handlePaginationChange(page: number, pageSize: number) {
		// 设置最新的page pageSize
		searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
		searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
		// 跳转新的url
		navigate({
			pathname,
			search: searchParams.toString(),
		})
	}

	return (
		<Pagination
			current={current}
			pageSize={pageSize}
			total={total}
			onChange={handlePaginationChange}
		/>
	)
}

export default ListPage
