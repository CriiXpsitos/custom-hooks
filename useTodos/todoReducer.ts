import { Todo } from "./interfaces/todo";

export type TodoAction =
  | { type: "[TODO] Add Todo"; payload: Todo }
  | { type: "[TODO] Remove Todo"; payload: { id: number } }
  | { type: "[TODO] Toggle Todo"; payload: { id: number } }
  | { type: "[TODO] Update Todo"; payload: { id: number; description: string } }
  | { type: "[TODO] Set Todos"; payload: Todo[] };

const getInitialState = JSON.parse(localStorage.getItem("todos") ?? "[]");


export const initialState: Todo[] = [ 
  ...getInitialState,
  //   {
  //     id: new Date().getTime(),
  //     description: "Recolectar la piedra del alma",
  //     done: false,
  //   },
  //   {
  //     id: new Date().getTime() * 3,
  //     done: false,
  //     description: "Recolectar piedra del poder",
  //   },
];

export const todoReducer = (state: Todo[] = [], action: TodoAction) => {
  const { type, payload } = action;

  switch (type) {
    case "[TODO] Add Todo":
      return [...state, payload];

    case "[TODO] Remove Todo":
        return state.filter(todo => todo.id !== payload.id)

    case "[TODO] Toggle Todo":
        return state.map(todo => todo.id === payload.id ? {...todo, done: !todo.done} : todo
        )

    default:
      return state;
  }
};
