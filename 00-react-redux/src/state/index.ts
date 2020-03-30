import {VisibilityFilter} from '../actions';

export type Todo = {
  id: number
  text: string
  completed: boolean
}

export type MainState = {
  todos: Todo[],
  visibilityFilter: VisibilityFilter
}



