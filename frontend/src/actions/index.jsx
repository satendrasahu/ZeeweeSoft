 export const incNumber = () =>{
    return{ 
    type : "INCREMENT"}
 }


 export const decNumber = () =>{
     
    return{
        type : "DECREMENT"
    }
}


export const SearchProduct = (searchname) =>{
    return{
        type : "SearchProdcut",
        payload : searchname
    }
}

export const ShowCategory = (val) =>{
    return{
        type : "ShowCategory",
        payload : val
    }
}