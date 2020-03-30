import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilter } from '../actions'
import {MainState, Todo} from '../state';
import {Dispatch} from 'redux'

const getVisibleTodos = (todos: Todo[], filter: VisibilityFilter) => {
  switch (filter) {
    case VisibilityFilter.SHOW_ALL:
      return todos;
    case VisibilityFilter.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilter.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

const mapStateToProps = (state: MainState) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleTodo: (id: number) => dispatch(toggleTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
