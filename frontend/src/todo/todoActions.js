import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = (event) => ({
    type : 'DESCRIPTION_CHANGED',
    payload : event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/i` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then((resp) => dispatch({type : 'TODO_SEARCHED', payload : resp.data}))
    }
}

export const add = (description) => {

    return (dispatch) => {
        axios.post(URL, {description})
            .then((resp) => dispatch(clear()))
                .then((resp) => dispatch(search()))
    }

}

export const concluido = (item) => {

    return (dispatch) => {
        axios.put(`${URL}/${item._id}`, {...item, done : true})
            .then((resp) => dispatch({ type : 'TODO_CONCLUIDO', payload : resp.data }))
                .then((resp) => dispatch(search()))
    }

}

export const desfazer = (item) => {

    return (dispatch) => {
        axios.put(`${URL}/${item._id}`, {...item, done : false})
            .then((resp) => dispatch({ type : 'TODO_PENDING', payload : resp.data}))
                .then((resp) => dispatch(search()))
    }

}

export const deletarTodo = (item) => {

    return (dispatch) => {
        axios.delete(`${URL}/${item._id}`)
            .then((resp) => dispatch({ type : 'TODO_DELETE', payload : resp.data}))
                .then((resp) => dispatch(search()))
    }

}

export const clear = () => {

    return [{ type : 'TODO_CLEAR' }, search()]

}