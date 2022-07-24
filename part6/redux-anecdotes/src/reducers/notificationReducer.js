import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationslice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action) {
            return (action.payload)
        }
    }
    })

    let timerID;

    export const timedNotification = (data, time) => async dispatch => {
        await dispatch(addNotification(data))
        clearTimeout(timerID)

        timerID = setTimeout(function() {
        dispatch(addNotification(null))
          }, time*1000);
    }
 
  
  export const { addNotification } = notificationslice.actions
  export default notificationslice.reducer