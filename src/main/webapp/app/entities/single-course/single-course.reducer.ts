import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISingleCourse, defaultValue } from 'app/shared/model/single-course.model';

export const ACTION_TYPES = {
  FETCH_SINGLECOURSE_LIST: 'singleCourse/FETCH_SINGLECOURSE_LIST',
  FETCH_SINGLECOURSE: 'singleCourse/FETCH_SINGLECOURSE',
  CREATE_SINGLECOURSE: 'singleCourse/CREATE_SINGLECOURSE',
  UPDATE_SINGLECOURSE: 'singleCourse/UPDATE_SINGLECOURSE',
  DELETE_SINGLECOURSE: 'singleCourse/DELETE_SINGLECOURSE',
  RESET: 'singleCourse/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISingleCourse>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SingleCourseState = Readonly<typeof initialState>;

// Reducer

export default (state: SingleCourseState = initialState, action): SingleCourseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SINGLECOURSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SINGLECOURSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SINGLECOURSE):
    case REQUEST(ACTION_TYPES.UPDATE_SINGLECOURSE):
    case REQUEST(ACTION_TYPES.DELETE_SINGLECOURSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SINGLECOURSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SINGLECOURSE):
    case FAILURE(ACTION_TYPES.CREATE_SINGLECOURSE):
    case FAILURE(ACTION_TYPES.UPDATE_SINGLECOURSE):
    case FAILURE(ACTION_TYPES.DELETE_SINGLECOURSE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SINGLECOURSE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SINGLECOURSE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SINGLECOURSE):
    case SUCCESS(ACTION_TYPES.UPDATE_SINGLECOURSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SINGLECOURSE):
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

const apiUrl = 'api/single-courses';

// Actions

export const getEntities: ICrudGetAllAction<ISingleCourse> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SINGLECOURSE_LIST,
  payload: axios.get<ISingleCourse>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISingleCourse> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SINGLECOURSE,
    payload: axios.get<ISingleCourse>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISingleCourse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SINGLECOURSE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISingleCourse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SINGLECOURSE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISingleCourse> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SINGLECOURSE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
