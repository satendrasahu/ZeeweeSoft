import changeTheNumber from "./operations";
import changeTheProductName,{changeShowCategory} from "./serachOperations";
import {combineReducers} from "redux"
 
 const rootReducer = combineReducers({
    changeTheNumber,
    changeTheProductName,
    changeShowCategory
 })

export default rootReducer;