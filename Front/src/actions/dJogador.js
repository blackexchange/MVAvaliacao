import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data => ({
    ...data,
    equipeId: parseInt(data.equipeId ? data.equipeId : 0)
})

export const fetchAll = () => dispatch => {
    api.dJogador().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
/*
export const fetchAllTime = () => dispatch => {
    api.dTime().fetchAllTime()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALLTIMES,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}*/

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.dJogador().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    console.log(data);
    data = formateData(data)
    api.dJogador().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.dJogador().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}