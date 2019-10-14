import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDemetraUser, defaultValue } from 'app/shared/model/demetra-user.model';

export const ACTION_TYPES = {
  FETCH_DEMETRAUSER_LIST: 'demetraUser/FETCH_DEMETRAUSER_LIST',
  FETCH_DEMETRAUSER: 'demetraUser/FETCH_DEMETRAUSER',
  CREATE_DEMETRAUSER: 'demetraUser/CREATE_DEMETRAUSER',
  UPDATE_DEMETRAUSER: 'demetraUser/UPDATE_DEMETRAUSER',
  DELETE_DEMETRAUSER: 'demetraUser/DELETE_DEMETRAUSER',
  RESET: 'demetraUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDemetraUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DemetraUserState = Readonly<typeof initialState>;

// Reducer

export default (state: DemetraUserState = initialState, action): DemetraUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DEMETRAUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEMETRAUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DEMETRAUSER):
    case REQUEST(ACTION_TYPES.UPDATE_DEMETRAUSER):
    case REQUEST(ACTION_TYPES.DELETE_DEMETRAUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DEMETRAUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEMETRAUSER):
    case FAILURE(ACTION_TYPES.CREATE_DEMETRAUSER):
    case FAILURE(ACTION_TYPES.UPDATE_DEMETRAUSER):
    case FAILURE(ACTION_TYPES.DELETE_DEMETRAUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEMETRAUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEMETRAUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DEMETRAUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_DEMETRAUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEMETRAUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/demetra-users';

// Actions

export const getEntities: ICrudGetAllAction<IDemetraUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DEMETRAUSER_LIST,
  payload: axios.get<IDemetraUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDemetraUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEMETRAUSER,
    payload: axios.get<IDemetraUser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDemetraUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DEMETRAUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDemetraUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEMETRAUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDemetraUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DEMETRAUSER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
