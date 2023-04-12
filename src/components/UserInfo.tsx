import React from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'

const UserInfo: React.FC = () => {
	return <Link to={LOGIN_PATHNAME}>登陆</Link>
}

export default UserInfo
