const cartClick = (state = false,action) => {
    switch(action.type){
        case "CHECKCART":
            return !state;
        default:
            return state;
    }
}
export default cartClick;