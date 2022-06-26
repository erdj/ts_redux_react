import { TodoAction, TodoActionType } from '../../types/todo';
import { Dispatch } from 'redux';
import axios from 'axios';

export const fetchTodos = (page: number = 1, limit: number = 10) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionType.FETCH_TODOS });
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
        params: { _page: page, _limit: limit },
      });
      dispatch({ type: TodoActionType.FETCH_TODOS_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TodoActionType.FETCH_TODOS_ERROR,
        payload: 'Произошла ошибка при загрузке списка дел',
      });
    }
  };
};

export function setTodoPage(page: number) {
  return { type: TodoActionType.SET_TODO_PAGE, payload: page };
}
