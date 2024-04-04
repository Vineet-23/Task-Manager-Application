import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Todo } from "../types/Todo";
import styles from "../styles/Column.module.scss";
import TodoItems from "./TodoItem";


// Remove unused interface ITodoItemProps

const getItemStyle = (_isDragging: boolean, draggableStyle: any) => ({
  ...draggableStyle,
});

// Update the type definitions for CSSProperties and draggable props
interface IColumnProps {
  title: string;
  todos: Todo[];
  type: "todo" | "inProgress" | "completed";
}

// Import the necessary draggable props types from the drag and drop library
// interface DraggableProvidedDragHandleProps {
//   draggableProps: any;
//   dragHandleProps: any;
// }

// interface DraggableProvidedDraggableProps {
//   draggableProps: any;
// }

const Column: React.FC<IColumnProps> = ({ todos, title, type }) => {
  return (
    <div className={styles.column}>
      <h6 className={[styles.title, styles[type]].join(" ")}>{title}</h6>
      <div className={styles.todoContainer}>
        <Droppable droppableId={type}>
          {(provided, _snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <TodoItems
                      key={item.id}
                      todo={item}
                      ref={provided.innerRef}
                      dragHandleProps={provided.dragHandleProps ?? undefined}
                      draggableProps={provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    ></TodoItems>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
