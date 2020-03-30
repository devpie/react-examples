import { combineReducers } from 'redux'
import reduceTodos from './todos'
import reduceVisibilityFilter from './visibilityFilter'


export default combineReducers({
  todos: reduceTodos,
  visibilityFilter: reduceVisibilityFilter
})
