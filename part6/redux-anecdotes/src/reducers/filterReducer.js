import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filter(state, action) {
            return (action.payload)
        }
    }
    })
    export const changeFilter = (data) => async dispatch => {
        await dispatch(filter(data))
        }
 
  
  export const { filter } = filterSlice.actions
  export default filterSlice.reducer