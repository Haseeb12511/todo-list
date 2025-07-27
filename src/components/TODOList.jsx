import DeleteIcon from "./DeleteIcon";
import React from "react";
import EditIcon from "./EditIcon";

function TODOList({ todos, setTodos }) {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => (
          <Item key={index} item={item} todos={todos} setTodos={setTodos} />
        ))
      ) : (
        <p>Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  );
}

export default TODOList;

////////////////////////////////

function Item({ todos, item, setTodos }) {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);

  const completeTodo = () => {
    setTodos((prevTodos) => {
      const updated = prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updated));
      return updated;
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInpuSubmit = (event) => {
    event.preventDefault();
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
    setEditing(false);
  };

  const handleInputBlur = () => {
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);

    setEditing(false);
  };

  const handleInputChange = (e) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    const updatedTodos = JSON.stringify(
      todos.filter((todo) => todo.id !== item.id)
    );
    localStorage.setItem("todos", updatedTodos);
  };

  return (
    <li id={item?.id} className="todo_card">
      {editing ? (
        <form className="edit-form" onSubmit={handleInpuSubmit}>
          <input
            ref={inputRef}
            type="text"
            name="edit-todo"
            id="edit-todo"
            defaultValue={item?.title}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
          />
        </form>
      ) : (
        <>
          <div className="todo_card_left" onClick={completeTodo}>
            <svg
              fill={item.is_completed ? "#22C55E" : "#555"}
              width="24"
              height="24"
            >
              <circle cx="12" cy="12" r="9.5" />
            </svg>
            <p className={item.is_completed ? "completed" : ""}>
              {item?.title}
            </p>
          </div>
          <div className="todo_card_right">
            <button onClick={handleEdit} title="Edit">
              <EditIcon />
            </button>
            <button onClick={handleDelete} title="Delete">
              <DeleteIcon />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
