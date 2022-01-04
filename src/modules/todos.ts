// Action 정의
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

// 초기값
let nexId = 1;

// 액션 함수 정의 (addTodo, toggleTodo, removeTodo)
export const addTodo = (text: string) => ({
    type: ADD_TODO,
    payload: {
        id: nexId++,
        text
    }
})
export const toggleTodo = (id: number) => ({
    type: TOGGLE_TODO,
    payload: id
})
export const removeTodo = (id: number) => ({
    type: REMOVE_TODO,
    payload: id
})

// Union Action tpye 정의
type TodoAction =
    | ReturnType<typeof addTodo>
    | ReturnType<typeof toggleTodo>
    | ReturnType<typeof removeTodo>

// Todo state type 정의
export type Todo = {
    id: number;
    text: string;
    done: boolean;
}

// TodosState initialState 초기화 type 정의
type TodosState = Todo[];

// initialState 초기화
const initialState: TodosState = []

// reducer 작성
function todos(state: TodosState = initialState, action: TodoAction): TodosState {
    switch (action.type) {
        case ADD_TODO:
            return state.concat({
                id: action.payload.id,
                text: action.payload.text,
                done: false,
            })
        case TOGGLE_TODO:
            return state.map((item) => item.id === action.payload ? { ...item, done: !item.done } : item)
        case REMOVE_TODO:
            return state.filter((item) => item.id !== action.payload)
        default:
            return state;
    }
}

export default todos;