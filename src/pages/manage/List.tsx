import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAMS_KEY } from '../../constants'

const { Title } = Typography

const List: React.FC = () => {
	useTitle('小慕问卷 - 我的问卷')
	const [searchParams] = useSearchParams()
	const keyword = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
	const [started, setStarted] = useState(false) // 是否已经开始加载 （防抖 有延迟时间）
	const [page, setPage] = useState(1)
	const [list, setList] = useState([])
	const [total, setTotal] = useState(0)
	// 是否还有数据
	const haveMoreData = total > list.length

	// keyword 变化时重置信息
	useEffect(() => {
		setStarted(false)
		setPage(1)
		setList([])
		setTotal(0)
	}, [keyword])

	// 真实触发请求
	const { run: load, loading } = useRequest(
		async () => {
			const data = await getQuestionListService({
				page,
				pageSize: LIST_PAGE_SIZE,
				keyword,
			})
			return data
		},
		{
			manual: true,
			onSuccess: result => {
				const { list: l, total } = result as any
				setList(list.concat(l))
				setTotal(total)
				setPage(page + 1)
			},
		}
	)

	// 尝试加载加载 - 防抖
	const loadMoreContainerRef = useRef<HTMLDivElement>(null)
	const { run: tryLoadMore } = useDebounceFn(
		() => {
			// 获取dom
			const element = loadMoreContainerRef.current
			if (element === null) return
			// 通过dom 判断容器是否出现在窗口中
			const domRect = element.getBoundingClientRect()
			const { bottom } = domRect
			if (bottom <= document.body.clientHeight) {
				load()
				setStarted(true)
			}
		},
		{
			wait: 1000, // 延迟1s
		}
	)

	// 初始化加载 (依赖 searchParams) 检测 keyword 变化
	useEffect(() => {
		tryLoadMore()
	}, [searchParams])

	// 页面滚动时触发加载
	useEffect(() => {
		if (haveMoreData) {
			window.addEventListener('scroll', tryLoadMore)
		}
		return () => {
			window.removeEventListener('scroll', tryLoadMore) // 解绑事件
		}
	}, [searchParams, haveMoreData])

	// Load More
	const LoadMoreContentElement = useMemo(() => {
		if (!started || loading) return <Spin />
		if (total === 0) return <Empty description="暂无数据" />
		if (!haveMoreData) return <span>没有更多了...</span>
		return <span>加载中...请耐心等待...</span>
	}, [started, loading, haveMoreData])
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>我的问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{list?.length > 0 &&
					list?.map((question: any) => {
						const { _id } = question
						return <QuestionCard key={_id} {...question} />
					})}
			</div>
			<div className={styles.footer}>
				<div ref={loadMoreContainerRef}>{LoadMoreContentElement}</div>
			</div>
		</>
	)
}

export default List
