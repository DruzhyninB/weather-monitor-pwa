import {combineReducers} from 'redux';
import {reducer as toastrReducer} from 'ultumus-react-redux-toastr'

import form from './form.reducers';
import sidebar from 'components/Sidebar/store/reducers';

const rootReducer = combineReducers({
    form,
    sidebar,
    toastr:toastrReducer
});

export default rootReducer;