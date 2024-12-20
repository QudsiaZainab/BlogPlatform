import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store/Store'; // Import RootState type for typed selector

// User interface for authenticated user data
interface User {
  id: number;
  username: string;
  token: string;
}

// Auth state interface
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Initial auth state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};


export const hydrateUser = createAsyncThunk<User | null>('auth/hydrateUser', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await fetch('http://localhost:1337/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      return { id: data.id, username: data.username, token };
    }
  }
  return null;
});

// Login User
export const loginUser = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: username, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');

    localStorage.setItem('token', data.jwt); // Save token in local storage
    return { id: data.user.id, username: data.user.username, token: data.jwt };
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Login failed');
  }
});

// Signup User
export const signupUser = createAsyncThunk<
  User,
  { username: string; email: string; password: string },
  { rejectValue: string }
>('auth/signupUser', async ({ username, email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:1337/api/auth/local/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');

    localStorage.setItem('token', data.jwt); // Save token in local storage
    return { id: data.user.id, username: data.user.username, token: data.jwt };
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Signup failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token'); // Remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateUser.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;

// Typed selector for selecting auth state
export const selectAuth = (state: RootState): AuthState => state.auth;
