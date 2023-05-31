import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { InputRef } from 'antd'
import { Button, Input, Popover, Space, Tooltip, Typography, message } from 'antd'
import QRCode from 'qrcode.react'
import { EditOutlined, LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

import styles from './StatHeader.module.scss'

const { Title } = Typography

const StatHeader: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { title, isPublished } = useGetPageInfo()

	// 拷贝链接
	const linkInputRef = useRef<InputRef>(null)
	const copyLink = () => {
		const elem = linkInputRef.current
		if (elem === null) return
		// 选中Input内容
		elem.select()
		// 执行复制 (document.execCommand 老式富文本编辑器也在用)
		document.execCommand('copy')
		message.success(`链接已复制到剪贴板`)
	}

	const genLinkAndQRCodeElem = () => {
		// 如果未发布
		if (!isPublished) return null

		// 拼接url 需要参考C端规则
		const url = `http://localhost:3000/question/${id}`
		// 根据链接生成二维码
		const QRCodeElem = <QRCode value={url} size={150} />
		return (
			<Space>
				<Input ref={linkInputRef} value={url} style={{ width: 300 }} />
				<Tooltip title="拷贝链接">
					<Button icon={<CopyOutlined />} onClick={copyLink} />
				</Tooltip>
				<Popover content={QRCodeElem}>
					<Button icon={<QrcodeOutlined />} />
				</Popover>
			</Space>
		)
	}

	return (
		<div className={styles['header-wrapper']}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
							返回
						</Button>
						<Title level={5}>{title}</Title>
					</Space>
				</div>
				<div className={styles.main}>{genLinkAndQRCodeElem()}</div>
				<div className={styles.right}>
					<Button
						type="primary"
						icon={<EditOutlined />}
						onClick={() => navigate(`/question/edit/${id}`)}
					>
						编辑问卷
					</Button>
				</div>
			</div>
		</div>
	)
}

export default StatHeader
