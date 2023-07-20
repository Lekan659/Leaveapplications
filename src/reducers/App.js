/**
 * Root reducer
 */
import {
    SET_SESSION_TOKEN,
    SET_USER_DATA,
    SET_IS_AUTHENTICATED_STATUS,
    SET_OPTIONS,
    SET_HAS_VIEW_PERMISSION,
    SET_USER_PERMISSIONS,
    SET_SELECTED_STAFF,
    SET_OFFICE_LOCATION,
    SET_USER_OFFICE_LOCATION,
    SET_SELECTED_CUSTOMER,
} from '../actions/types';

 const initialState = {
    session_token: localStorage.getItem("token"), //Get the last session token from local storage


    isAuthenticated: false, //stores session/authentication validity status of a user


    user_permissions: [], //Stores authenticated user assigned permissions

    hasViewPermission: false, //stores view permission state for active/requested view

    
 }

 /**
  * function init app reducer function
  */
 const App  = function initApp(state = initialState, action){
     switch (action.type) {
         case SET_SESSION_TOKEN:
             //save the new session token in local storage
             localStorage.setItem("token", action.token);
             //return new state object
             return Object.assign({}, state, {
                session_token: action.token
             });
         

         case SET_IS_AUTHENTICATED_STATUS:
            return Object.assign({}, state, {
                isAuthenticated: action.status
             });

         case SET_HAS_VIEW_PERMISSION:
             alert(action.status)
            return Object.assign({}, state, {
                hasViewPermission: action.status
            });
        
         case SET_USER_PERMISSIONS:
            return Object.assign({}, state, {
                user_permissions: action.permissions
            });

         default:
             return state;
     }
 }

 //export app reducer
export default App;
