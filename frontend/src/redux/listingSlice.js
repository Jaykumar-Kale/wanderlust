import { createSlice } from '@reduxjs/toolkit';

const listingSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    currentListing: null,
    loading: false,
    error: null,
  },
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
    setCurrentListing: (state, action) => {
      state.currentListing = action.payload;
    },
    addListing: (state, action) => {
      state.listings.push(action.payload);
    },
    updateListing: (state, action) => {
      const index = state.listings.findIndex(l => l._id === action.payload._id);
      if (index >= 0) {
        state.listings[index] = action.payload;
      }
    },
    removeListing: (state, action) => {
      state.listings = state.listings.filter(l => l._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  setListings, 
  setCurrentListing, 
  addListing, 
  updateListing, 
  removeListing, 
  setLoading, 
  setError,
  clearError 
} = listingSlice.actions;

export default listingSlice.reducer;
