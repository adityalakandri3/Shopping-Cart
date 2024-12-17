import { createSlice } from "@reduxjs/toolkit";



const counterSlice = createSlice({
  name:'counter',
  initialState:{
    searchTerm:'',
    cartItem : []
  },
  reducers:{
    addToCart:(state,action)=>{
      const itemExist = state.cartItem.find((item)=>
        item.id===action.payload.id
      )
      if(itemExist){
        state.cartItem = state.cartItem.map((item)=>
          item.id===action.payload.id 
          ?{...item,qty:item.qty + 1}
          :item
        );
      }
      else{
        state.cartItem = [...state.cartItem, { ...action.payload, qty: 1 }];
      }
      // console.log(state)
      // console.log(action)
      // console.log(state.cartItem);
      // console.log(action.payload)
      
      
    },
    removeFromCart:(state,action)=>{
      state.cartItem=state.cartItem.filter((item) => item.id !== action.payload);
      
    },
    updateCart:(state,action)=>{
      state.cartItem= state.cartItem.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty }
          : item
      )
      
    },
    searchCart:(state,action)=>{
      state.searchTerm =action.payload;
    }
    

    }
  }

)


export const {state, addToCart ,removeFromCart,updateCart,searchCart} = counterSlice.actions

export default counterSlice.reducer