import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const { TextArea } = Input

const PageSettings: React.FC = () => {
	const pageInfo = useGetPageInfo()
	const [form] = Form.useForm()
	const dispatch = useDispatch()

	// 实时更新数据
	useEffect(() => {
		form.setFieldsValue(pageInfo)
	}, [pageInfo])

	const handleValuesChange = () => {
		dispatch(resetPageInfo(form.getFieldsValue()))
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={pageInfo}
			onValuesChange={handleValuesChange}
		>
			<Form.Item
				label="页面标题"
				name="title"
				rules={[{ required: true, message: '请输入页面标题' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item label="页面描述" name="desc">
				<TextArea placeholder="请输入页面描述" />
			</Form.Item>
			<Form.Item label="样式代码" name="css">
				<TextArea placeholder="请输入 CSS 代码..." />
			</Form.Item>
			<Form.Item label="脚本代码" name="js">
				<TextArea placeholder="请输入 JS 代码..." />
			</Form.Item>
		</Form>
	)
}

export default PageSettings
