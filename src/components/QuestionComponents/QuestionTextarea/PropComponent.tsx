import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionTextareaPropsType } from './interface'

const InputPropComponent: React.FC<QuestionTextareaPropsType> = (
	props: QuestionTextareaPropsType
) => {
	const { title, placeholder, onChange, disabled } = props
	const [form] = Form.useForm()

	// 监听属性变化
	useEffect(() => {
		form.setFieldsValue({ title, placeholder })
	}, [title, placeholder])

	// 统一处理表达数据变化
	const handleValuesChange = () => {
		onChange && onChange(form.getFieldsValue())
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{ title, placeholder }}
			onValuesChange={handleValuesChange}
			disabled={disabled}
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Placeholder" name="placeholder">
				<Input />
			</Form.Item>
		</Form>
	)
}

export default InputPropComponent
