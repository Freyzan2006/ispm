import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../../services/api/axiosConfig";

import { IPublicType } from "./IpublicType";


export const publicTypeFetch = createAsyncThunk<IPublicType[], void, { rejectValue: string }>(
    'table/publicTypeFetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosConfig.get<IPublicType[]>('table/publicType/');
            return response.data;
        } catch (error) {
            console.error("Error fetching publicType:", error);
            throw rejectWithValue("Failed to fetch public types"); 
        }
    }
);