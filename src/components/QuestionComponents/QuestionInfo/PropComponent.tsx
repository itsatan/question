import React, { useEffect } from 'react'
import { QuestionInfoPropsType } from './interface'
import { Form, Input } from 'antd'

const { TextArea } = Input

const PropComponent: React.FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
	const { title, desc, onChange, disabled } = props
	const [form] = Form.useForm()

	// 监听属性变化
	useEffect(() => {
		form.setFieldsValue({ title, desc })
	}, [title, desc])

	// 统一处理表达数据变化
	const handleValuesChange = () => {
		onChange && onChange(form.getFieldsValue())
	}

	return (
		<Form
			layout="vertical"
			initialValues={{ title, desc }}
			form={form}
			onValuesChange={handleValuesChange}
			disabled={disabled}
		>
			<Form.Item
				label="问卷标题"
				name="title"
				rules={[{ required: true, message: '请输入问卷标题' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item label="问卷描述" name="desc">
				<TextArea style={{ height: 150 }} />
			</Form.Item>
		</Form>
	)
}

export default PropComponent
