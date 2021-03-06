import axios from "axios";

const servicesActions = {
  getServices: () => {
    return async (dispatch, getState) => {
      let response = await axios.get('https://brokandfix.herokuapp.com/api/services')
      if(!response.data.success) {
        throw new Error(response.data.error)
      }
      dispatch({type:'GET_SERVICES', payload: response.data.services});
    }
  },
  getOneService: (id) => {
    return (dispatch, getState) => {
      dispatch({type: 'GET_ONE_SERVICE', payload:id});
    }
  }
}

export default servicesActions
