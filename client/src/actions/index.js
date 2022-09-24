export const login = () =>{
    return{
        type: "SIGN_IN"
    }
}

export const signUp = () =>{
    return{
        type: "SIGN_UP"
    }
}

export const addCart = (product) =>{
    return {
        type: "ADDITEM",
        payload: product
    }
}

export const delCart = (product) =>{
    return {
        type: "DELITEM",
        payload: product
    }
}

export const checkCart = () =>{
    return {
        type: "CHECKCART"
    }
}

export const disableCheckCart = () =>{
    return {
        type: "DISABLECHECKCART"
    }
}