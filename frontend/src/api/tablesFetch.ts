import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { TablesAPI } from './api';
import { ITable } from '../reduxToolkit/tables/Itables';

export const tablesFetch: AsyncThunk<ITable[], void, {}> = createAsyncThunk<ITable[], void>(
    "tables/tablesFetch", 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<ITable[]>(TablesAPI);
            
            if (response.status != 200) 
                throw new Error("Server Error !")
            
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);


export default tablesFetch;
