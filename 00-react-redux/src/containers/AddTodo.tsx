import React from 'react';
import {connect} from 'react-redux';
import {addTodo, AddTodoAction} from '../actions';
import {Dispatch} from 'redux';

type AddTodoProps = {
  dispatch: Dispatch<AddTodoAction>
}

const AddTodo = ({dispatch}: AddTodoProps) => {
  let inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!inputRef.current || !inputRef.current.value.trim()) {
            return;
          }
          dispatch(addTodo(inputRef.current.value));
          inputRef.current.value = '';
        }}
      >
        <input ref={inputRef}/>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default connect()(AddTodo);
