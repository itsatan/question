import { Checkbox, Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { QuestionTitlePropsType } from './interface'

const TitlePropComponent: React.FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
	const { text, level, isCenter, onChange, disabled } = props
	const [form] = Form.useForm()

	// 监听属性变化
	useEffect(() => {
		form.setFieldsValue({ text, level, isCenter })
	}, [text, level, isCenter])

	// 统一处理表达数据变化
	const handleValuesChange = () => {
		onChange && onChange(form.getFieldsValue())
	}
	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{ text, level, isCenter }}
			onValuesChange={handleValuesChange}
			disabled={disabled}
		>
			<Form.Item
				label="标题内容"
				name="text"
				rules={[{ required: true, message: '请输入标题内容' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item label="层级" name="level">
				<Select
					options={[
						{ text: 1, value: 1 },
						{ text: 2, value: 2 },
						{ text: 3, value: 3 },
						{ text: 4, value: 4 },
						{ text: 5, value: 5 },
					]}
				/>
			</Form.Item>
			<Form.Item name="isCenter" valuePropName="checked">
				<Checkbox>居中显示</Checkbox>
			</Form.Item>
		</Form>
	)
}

export default TitlePropComponent
