import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

const useGetComponentInfo = () => {
	const components = useSelector<StateType>(
		state => state.components.present // 当前
	) as ComponentsStateType

	const { componentList = [], selectedId = '', copiedComponent } = components

	// 获取当前选择的组件
	const selectedComponent = componentList.find(c => c.fe_id === selectedId)

	return {
		componentList,
		selectedId,
		selectedComponent,
		copiedComponent,
	}
}

export default useGetComponentInfo
