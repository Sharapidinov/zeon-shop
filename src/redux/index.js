import {createStore} from "redux";


const initialState = {
    products: [],
    newProduct:[],
    collection:[],
    // summerCol:[],
    // fallCol:[],
    // winterCol:[],
    // springCol:[],
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
        // case "GET_SUMMER":
        //     return {
        //         ...state,
        //         summerCol: [...state.summerCol, action.summerCol]
        //     }
        // case "GET_FALL":
        //     return {
        //         ...state,
        //         fallCol: [...state.fallCol, action.fallCol]
        //     }
        // case "GET_WINTER":
        //     return {
        //         ...state,
        //         winterCol: [...state.winterCol, action.winterCol]
        //     }
        // case "GET_SPRING":
        //     return {
        //         ...state,
        //         springCol: [...state.springCol, action.springCol]
        //     }
        default:
            return state
    }
}

export const store = createStore(reducer)
