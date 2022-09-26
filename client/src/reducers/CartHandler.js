 const cart = []
 const handleCart = (state = cart,action) =>{
    const product = action.payload;
    switch (action.type){
        case "ADDITEM":
            const existed = state.find((x)=> x.id === product.id);
            if(existed){
                return state.map((x)=> x.id ===product.id ? {...x,qty: x.qty +1}:x);
            }
            else{
                const product = action.payload;
                return[...state,{...product,qty:1,}]
            }
        case "DELITEM":
            const existed1 = state.find((x) => x.id === product.id);
            if(existed1.qty === 1){
                return state.filter((x)=>x.id !== existed1.id)
            }
            else{
                return state.map((x)=> x.id === product.id? {...x,qty: x.qty-1}:x);
            }
        default:
            return state;
    }
 }

 export default handleCart;