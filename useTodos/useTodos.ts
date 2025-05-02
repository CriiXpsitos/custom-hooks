import { useCallback, useEffect, useReducer } from "react";
import {
  initialState,
  TodoAction,
  todoReducer,
} from "../08-useReducer/todoReducer";
import type { Todo } from "../08-useReducer/interfaces/todo";

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo: Todo) => {
    const action: TodoAction = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = useCallback((id: number) => {
    dispatch({
      type: "[TODO] Remove Todo",
      payload: { id },
    });
  }, []);

  const onToggleTodo = useCallback((id: number) => {
    dispatch({
      type: "[TODO] Toggle Todo",
      payload: { id },
    });
  }, []);

  return {
    todos,
    onToggleTodo,
    handleDeleteTodo,
    handleNewTodo,
  };
};
