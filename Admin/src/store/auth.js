import { createSlice } from "@reduxjs/toolkit";

const authSlice =createSlice({
    name:"auth",
    initialState:{isLoggrdIn:false, role:"user"},
    reducers:{
        login(state){
            state.isLoggrdIn=true;

        },
        logout(state){
            state.isLoggrdIn=false;

        },
        changeRole(state,action) {
            const role = action.payload;
            state.role=role;
        }
    }

});
export const authActions =authSlice.actions;
export default authSlice.reducer;