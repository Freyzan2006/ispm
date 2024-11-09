import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
    searchName: string;
    searchTitle: string;
    searchPublicType: string;
    searchUser: string;
    searchDate: string;
    searchCoauthorFirstName: string;
    searchCoauthorLastName: string;
    searchCoauthorPatronymic: string;
} 

const initialState: IState = {
    searchName: "",
    searchTitle: "",
    searchPublicType: "",
    searchUser: "",
    searchDate: "",
    searchCoauthorFirstName: "",
    searchCoauthorLastName: "",
    searchCoauthorPatronymic: ""
}
  

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: { 
        setSearchName: ( state, action: PayloadAction<string> ) => {
            state.searchName = action.payload;
        },

        setSearchPublicType: (state, action: PayloadAction<string>) => {
            state.searchPublicType = action.payload;
        },

        setSearchUser: (state, action: PayloadAction<string>) => {
            state.searchUser =  action.payload;
        },

        setSearchDate: (state, action: PayloadAction<string>) => {
            state.searchDate = action.payload;
        },

        setSearchCoauthorFirstName: (state, action: PayloadAction<string>) => {
            state.searchCoauthorFirstName = action.payload;
        },
        
        setSearchCoauthorLastName: (state, action: PayloadAction<string>) => {
            state.searchCoauthorLastName = action.payload;
        },

        setSearchCoauthorPatronymic: (state, action: PayloadAction<string>) => {
            state.searchCoauthorPatronymic = action.payload;
        },

        setSearchTitle: (state, action: PayloadAction<string>) => {
            state.searchTitle = action.payload;
        }
    },
});
  
export const { setSearchName, setSearchPublicType, 
    setSearchUser, setSearchDate, setSearchCoauthorFirstName,
    setSearchCoauthorLastName, setSearchCoauthorPatronymic,
    setSearchTitle
} = searchSlice.actions;


export default searchSlice;