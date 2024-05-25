import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IUserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface ISupport {
    url: string;
    text: string;
}

export interface IUser {
    data: IUserData;
    support: ISupport;
}

interface UserState {
    users: IUserData[];
    user: IUser | null;
    loading: boolean;
    error: string | null;
    perPage: number;
    total: number;
}

const initialState: UserState = {
    users: [],
    user: null,
    loading: false,
    error: null,
    perPage: 8,
    total: 0
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (perPage: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?per_page=${perPage}`);
            return {
                data: response.data.data,
                total: response.data.total
            };
        } catch (err) {
            return rejectWithValue('Failed to fetch users');
        }
    }
);

export const fetchUserDetails = createAsyncThunk(
    'users/fetchUserDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue('Failed to fetch user details');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default userSlice.reducer;
