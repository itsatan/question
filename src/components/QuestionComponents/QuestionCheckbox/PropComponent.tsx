import { Button, Checkbox, Form, Input, Space } from 'antd'
import React, { useEffect } from 'react'
import { OptionsType, QuestionCheckboxPropsType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const CheckboxPropComponent: React.FC<QuestionCheckboxPropsType> = (
	props: QuestionCheckboxPropsType
) => {
	const { title, isVertical, list, onChange, disabled } = props

	const [form] = Form.useForm()

	// 监听属性变化
	useEffect(() => {
		form.setFieldsValue({ title, isVertical, list })
	}, [title, isVertical, list])

	// 统一处理表达数据变化
	const handleValuesChange = () => {
		if (onChange === undefined) return
		const newValues = form.getFieldsValue() as QuestionCheckboxPropsType

		if (newValues.list) {
			// 需要清除 text undefined 的选项
			newValues.list = newValues.list.filter(opt => !(opt.text === undefined))
		}

		const { list = [] } = newValues
		list.forEach(opt => {
			if (opt.value) return
			opt.value = nanoid(5) // 补齐opt value
		})

		onChange(newValues)
	}
	return (
		<Form
			layout="vertical"
			initialValues={{ title, isVertical, list }}
			disabled={disabled}
			form={form}
			onValuesChange={handleValuesChange}
		>
			<Form.Item
				label="标题内容"
				name="title"
				rules={[{ required: true, message: '请输入标题内容' }]}
			>
				<Input placeholder="请输入标题内容" />
			</Form.Item>
			<Form.Item label="选项">
				<Form.List name="list">
					{(fields, { add, remove }) => (
						<>
							{/* 遍历所有的选项 (可删除) */}
							{fields.map(({ key, name }, index) => {
								return (
									<Space key={key} align="baseline">
										{/* 当前选项 是否选中 */}
										<Form.Item name={[name, 'checked']} valuePropName="checked">
											<Checkbox />
										</Form.Item>
										{/* 当前选项 输入框 */}
										<Form.Item
											name={[name, 'text']}
											rules={[
												{ required: true, message: '请输入选项文字' },
												{
													validator: (_, text) => {
														const { list } = form.getFieldsValue()
														let num = 0
														list.forEach((opt: OptionsType) => {
															if (opt.text === text) num++
														})
														if (num === 1) return Promise.resolve()
														return Promise.reject(new Error('存在重复项'))
													},
												},
											]}
										>
											<Input placeholder="请输入选项文字..." />
										</Form.Item>
										{/* 当前选项 删除 */}
										{index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
									</Space>
								)
							})}
							{/* 添加选项 */}
							<Form.Item>
								<Button
									type="link"
									icon={<PlusOutlined />}
									block
									onClick={() => add({ text: '', value: '', checked: false })}
								>
									添加选项
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form.Item>
			<Form.Item name="isVertical" valuePropName="checked">
				<Checkbox>竖向排列</Checkbox>
			</Form.Item>
		</Form>
	)
}

export default CheckboxPropComponent
