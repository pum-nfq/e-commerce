import { createSlice } from '@reduxjs/toolkit';

const initialState = { text: '' };
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchChange: (state, action) => {
            state.text = action.payload;
        },
    },
});

export const { searchChange } = searchSlice.actions;
export default searchSlice.reducer;
