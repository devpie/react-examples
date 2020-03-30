let nextTodoId = 0;

export interface AddTodoAction {
  type: string
  id: number
  text: string
}

export const addTodo = (text: string): AddTodoAction => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

export interface VisibilityFilterAction {
  type: string
  filter: VisibilityFilter
}

export const setVisibilityFilter = (filter: VisibilityFilter): VisibilityFilterAction => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export interface TodoToggleAction {
  type: string
  id: number
}

export const toggleTodo = (id: number): TodoToggleAction => ({
  type: 'TOGGLE_TODO',
  id
});

export enum VisibilityFilter {
  SHOW_ALL,
  SHOW_COMPLETED ,
  SHOW_ACTIVE ,
};
