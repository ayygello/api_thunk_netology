import {
  FETCH_EDITABLE_SERVICE_REQUEST,
  FETCH_EDITABLE_SERVICE_FAILURE,
  FETCH_EDITABLE_SERVICE_SUCCESS,
  CHANGE_EDITABLE_SERVICE_FIELD,
  ADD_EDITED_SERVICE_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  item: { name: '', price: '', content: '' },
  loading: false,
  error: null,
};

const serviceEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EDITABLE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EDITABLE_SERVICE_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_EDITABLE_SERVICE_SUCCESS:
      const { item } = action.payload;
      return {
        ...state,
        item,
        loading: false,
        error: null,
      };
    case CHANGE_EDITABLE_SERVICE_FIELD:
      const { name, value } = action.payload;
      const newItem = state.item;
      return {
        ...state,
        item: {
          ...newItem,
          [name]: value,
        },
      };
    case ADD_EDITED_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default serviceEditReducer;
