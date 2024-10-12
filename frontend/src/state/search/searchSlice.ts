import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { searchTablesThunk, tablesThunk, tablesUserThunk } from "./tablesThunk";

// import { ITablesApiResponse, ITablesState } from "./Itables";
import { EStatus } from "../api/EAPI";


// const initialState: ITablesState  = {
//   tables: [],
//   nextPage: null,
//   previousPage: null,
//   count: 0,
//   status: null,
//   error: null,
// };

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
            state.searchUser = action.payload;
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

//   extraReducers: (builder) => {
//     builder
//       .addCase(tablesThunk.pending, (state) => {
//         state.status = EStatus.LOADING;
//         state.error = null;
//       })
//       .addCase(tablesThunk.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
//         state.status = EStatus.SUCCEEDED;
//         state.tables = action.payload.results;
//         state.nextPage = action.payload.next;
//         state.previousPage = action.payload.previous;
//         state.count = action.payload.count;
//       })
//       .addCase(tablesThunk.rejected, (state, action) => {
//         state.status = EStatus.FAILED;
//         state.error = action.error.message || 'Unknown error';
//       })


//       .addCase(tablesUserThunk.pending, (state) => {
//         state.status = EStatus.LOADING;
//         state.error = null;
//       })
//       .addCase(tablesUserThunk.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
//         state.status = EStatus.SUCCEEDED;
//         state.tables = action.payload.results;
//         state.nextPage = action.payload.next;
//         state.previousPage = action.payload.previous;
//         state.count = action.payload.count;
//       })
//       .addCase(tablesUserThunk.rejected, (state, action) => {
//         state.status = EStatus.FAILED;
//         state.error = action.error.message || 'Unknown error';
//       })


//       .addCase(searchTablesThunk.pending, (state) => {
//         state.status = EStatus.LOADING;
//         state.error = null;
//       })
//       .addCase(searchTablesThunk.fulfilled, (state, action: PayloadAction<ITablesApiResponse>) => {
//         state.status = EStatus.SUCCEEDED;
//         state.tables = action.payload.results;
//         state.nextPage = action.payload.next;
//         state.previousPage = action.payload.previous;
//         state.count = action.payload.count;
//       })
//       .addCase(searchTablesThunk.rejected, (state, action) => {
//         state.status = EStatus.FAILED;
//         state.error = action.error.message || 'Unknown error';
//       });
     
//   }
});
  
export const { setSearchName, setSearchPublicType, 
    setSearchUser, setSearchDate, setSearchCoauthorFirstName,
    setSearchCoauthorLastName, setSearchCoauthorPatronymic,
    setSearchTitle
} = searchSlice.actions;


export default searchSlice;