import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data => ({
    ...data,
    equipeAId: parseInt(data.equipeAId ? data.equipeAId : 0),
    equipeBId: parseInt(data.equipeBId ? data.equipeBId : 0),
    placarA: parseInt(data.placarA ? data.placarA : 0),
    placarB: parseInt(data.placarB ? data.placarB : 0)
})

export const fetchAll = () => dispatch => {
    api.dPartida().fetchAll()
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
    api.dPartida().create(data)
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
    api.dPartida().update(id, data)
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
    api.dPartida().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}