import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_FAILURE,
  REMOVE_SERVICE_SUCCESS,
  FETCH_EDITABLE_SERVICE_REQUEST,
  FETCH_EDITABLE_SERVICE_FAILURE,
  FETCH_EDITABLE_SERVICE_SUCCESS,
  CHANGE_EDITABLE_SERVICE_FIELD,
  ADD_EDITED_SERVICE_REQUEST,
  ADD_EDITED_SERVICE_SUCCESS,
  ADD_EDITED_SERVICE_FAILURE,
} from './actionTypes';

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = (error) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = (items) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
});

export const addServiceFailure = (error) => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const removeServiceRequest = (id) => ({
  type: REMOVE_SERVICE_REQUEST,
  payload: {
    id,
  },
});

export const removeServiceFailuer = (error) => ({
  type: REMOVE_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const removeServiceSuccess = () => ({
  type: REMOVE_SERVICE_SUCCESS,
});

export const fetchEditableServiceRequest = () => ({
  type: FETCH_EDITABLE_SERVICE_REQUEST,
});

export const fetchEditableServiceFailure = (error) => ({
  type: FETCH_EDITABLE_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const fetchEditableServiceSuccess = (item) => ({
  type: FETCH_EDITABLE_SERVICE_SUCCESS,
  payload: {
    item,
  },
});

export const addEditedServiceRequest = (name, price, content) => ({
  type: ADD_EDITED_SERVICE_REQUEST,
  payload: {
    name,
    price,
    content,
  },
});

export const addEditedServiceFailure = (error) => ({
  type: ADD_EDITED_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addEditedServiceSuccess = () => ({
  type: ADD_EDITED_SERVICE_SUCCESS,
});

export const changeEditableServiceField = (name, value) => ({
  type: CHANGE_EDITABLE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const fetchEditableService = (id) => async (dispatch) => {
  dispatch(fetchEditableServiceRequest());
  try {
    const response = await fetch(`http://localhost:7070/api/services/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchEditableServiceSuccess(data));
  } catch (e) {
    dispatch(fetchEditableServiceFailure(e.message));
  }
};

export const removeService = async (dispatch, id) => {
  dispatch(removeServiceRequest());
  try {
    const response = await fetch(`http://localhost:7070/api/services/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(removeServiceSuccess());
  } catch (e) {
    dispatch(removeServiceFailuer(e.message));
  }
  dispatch(fetchServices());
};

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`http://localhost:7070/api/services`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
};

export const addService = () => async (dispatch, getState) => {
  dispatch(addServiceRequest());
  const {
    serviceAdd: {
      item: { name, price },
    },
  } = getState();

  try {
    const response = await fetch(`http://localhost:7070/api/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 0, name, price }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
  dispatch(fetchServices());
};

export const addEditedService =
  (name, price, content, id) => async (dispatch) => {
    dispatch(fetchEditableServiceRequest());
    try {
      const response = await fetch(`http://localhost:7070/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, name, price, content }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      dispatch(addEditedServiceSuccess());
    } catch (e) {
      dispatch(fetchEditableServiceFailure(e.message));
    }
  };
