import { CSSProperties, forwardRef } from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { removeTodo, setEditingTodo } from "../store/reducers/todoReducer";
import { Todo, TodoStatus } from "../types/Todo";
import styles from "../styles/TodoItem.module.scss";

interface ITodoItemProps {
  todo: Todo;
  ref: HTMLDivElement;
  style: CSSProperties | undefined;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
  draggableProps: DraggableProvidedDraggableProps;
}

const TodoItem = forwardRef<HTMLDivElement, ITodoItemProps>((props, ref) => {
  const dispatch = useDispatch();

  const getTodoStatusStyle = () => {
    const { status } = props.todo;

    if (status === TodoStatus.Todo) {
      return styles.todo;
    } else if (status === TodoStatus.InProgress) {
      return styles.inProgress;
    } else {
      return styles.completed;
    }
  };

  return (
    <div
      className={[styles.todoItem, getTodoStatusStyle()].join(" ")}
      {...props.draggableProps}
      {...props.dragHandleProps}
      style={props.style}
      ref={ref}
    >
      <div className={styles.info}>
        <p className={styles.title}>{props.todo.title}</p>
        <p className={styles.description}>{props.todo.description}</p>
      </div>
      <div className={styles.actions}>
        <button
          className={[styles.actionButton, styles.edit].join(" ")}
          onClick={() => {
            dispatch(setEditingTodo(props.todo));
          }}
          aria-label="Edit"
        >
          <FaEdit />
        </button>
        <button
          className={[styles.actionButton, styles.remove].join(" ")}
          onClick={() => {
            dispatch(removeTodo(props.todo));
          }}
          aria-label="Remove"
        >
          <RiDeleteBin4Fill />
        </button>
      </div>
    </div>
  );
});

export default TodoItem;
