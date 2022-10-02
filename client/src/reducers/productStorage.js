const products = [];

const productStorage = (state = products,action) => {
    const productItems = action.payload;
    switch(action.type){
        case "STORAGE":
            state = productItems;
            return state;
        default:
            return state;
    }
};

export default productStorage;