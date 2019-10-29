import {forecast} from 'api';
import * as util from 'utl';
import {toastr} from 'ultumus-react-redux-toastr'

export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
export const SET_DATA = 'SET_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_FILTERING = 'SET_FILTERING';


export const loadCity = id => {
    return (dispatch, getState) => {
        dispatch(setLoadingData(true));
        forecast.getForecast(id)
            .then(res => {
                dispatch(setData(util.formatData(res.data.list)));
                dispatch(setSelectedCity(res.data.city));
                dispatch(setLoadingData(false));
            }).catch(err=>dispatch(errorHandler(err)));
    }
}

export const setSelectedCity = city => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_SELECTED_CITY,
            payload: city,
        })
    }
}

export const setData = data => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_DATA,
            payload: data,
        })
    }
}

export const setLoadingData = state => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_LOADING,
            payload: state,
        })
    }
}

export const setFilteringData = state => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_FILTERING,
            payload: state,
        })
    }
}

const errorHandler = err => {
    return (dispatch, getState) => {
        dispatch(setLoadingData(false));
        toastr.error('Error!', err.message)
    }
}