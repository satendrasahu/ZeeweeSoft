const initialState = "";

const changeTheProductName = (state = initialState, action)=>{
  // alert(action.payload)
    switch (action.type) {
        case "SearchProdcut" :   return action.payload;
        default : return state;
    }
}
const initialCategoryState = false;

const changeShowCategory = (state = initialCategoryState, action)=>{
    switch (action.type) {
        case "ShowCategory" :   return action.payload;
        default : return state;
    }
}

export default changeTheProductName;

export {changeShowCategory}