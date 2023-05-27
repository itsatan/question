import React, { useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Checkbox, Form, Input } from 'antd'

const { TextArea } = Input

const PropComponent: React.FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
	const { text, isCenter, onChange, disabled } = props
	const [form] = Form.useForm()

	// 监听属性变化
	useEffect(() => {
		form.setFieldsValue({ text, isCenter })
	}, [text, isCenter])

	// 统一处理表达数据变化
	const handleValuesChange = () => {
		onChange && onChange(form.getFieldsValue())
	}
	return (
		<Form
			layout="vertical"
			initialValues={{ text, isCenter }}
			form={form}
			onValuesChange={handleValuesChange}
			disabled={disabled}
		>
			<Form.Item
				label="段落内容"
				name="text"
				rules={[{ required: true, message: '请输入段落内容' }]}
			>
				<TextArea style={{ height: 150 }} />
			</Form.Item>
			<Form.Item name="isCenter" valuePropName="checked">
				<Checkbox>居中显示</Checkbox>
			</Form.Item>
		</Form>
	)
}

export default PropComponent
