import {createStore} from "redux";


const initialState = {
    user:{
        email: null,
        id: null,
        token: null
    },
    products: [],
    newProduct:[],
    collection:[],
    cart:  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    selected: JSON.parse(localStorage.getItem("selected")) || []
}

const reducer = (state = initialState, action) => {


    switch (action.type) {
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.products
            }
        case "GET_NEWPRODUCTS":
            return {
                ...state,
                newProduct: action.newProduct
            }
        case "UPDATE_SELECTED":
            return {
                ...state,
                selected: [...state.selected, action.selected]
            }
        case "UPDATE_CART":
            return {
                ...state,
                cart: [...state.cart, ...action.cart]
            }
        case  "GET_COLL" :
            return  {
                ...state,
                collection: action.collection
            }
        case "SIGN_UP" :
            return {
                ...state,
                user: {...action.user}
            }
        case "LOG_OUT" :
            return {
                ...state,
                user: {
                    email: null,
                    id: null,
                    token: null
                }
            }

        default:
            return state
    }
}

export const store = createStore(reducer)
