import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../Store/Store'; // Import RootState

interface ImageFormat {
  url: string;
}

interface Image {
  formats: {
    thumbnail: ImageFormat;
  };
  url: string;
}


interface Category {
  id: number;
  Name: string; 
  Image: Image ;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[], void>(
  'categories/fetch',
  async () => {
    const response = await fetch('http://localhost:1337/api/categories?populate=Image');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    console.log(data.data);
    
    return data.data; 
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Assign the fetched categories
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});


export const selectCategories = (state: RootState): Category[] => state.categories.categories;

export default categorySlice.reducer;
