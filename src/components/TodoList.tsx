import React, { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const TodoList: React.FC = () => {
  const { todos, error, loading, page, limit } = useTypedSelector((state) => state.todo);
  const { fetchTodos, setTodoPage } = useActions();
  const pages = [1, 2, 3, 4, 5];

  useEffect(() => {
    fetchTodos(page, limit);
  }, [page]);

  if (loading) return <h1>Идёт загрузка...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <div>
      {todos.map((todo) => (
        <h1 key={todo.id}>
          {todo.id} - {todo.title}
        </h1>
      ))}
      <div style={{ display: 'flex' }}>
        {pages.map((p) => (
          <div
            onClick={() => setTodoPage(p)}
            key={p}
            style={{
              cursor: 'pointer',
              border: '2px solid black',
              color: p === page ? 'red' : 'black',
              fontSize: p === page ? '30px' : '25px',
              padding: p === page ? '30px' : '25px',
            }}>
            {p}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
