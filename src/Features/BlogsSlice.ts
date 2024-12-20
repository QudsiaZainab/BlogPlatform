import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../Store/Store';

interface ImageFormat {
  url: string;
}

interface Image {
  formats: {
    thumbnail: ImageFormat;
  };
}

interface Category {
  id: number;
  Name: string; 
  Image: Image;
}

interface User {
  id: number;
  username: string; 
}

interface Comment {
  id: string;
  Content: string;
  createdAt: string;
  users_permissions_user: User;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  category: Category;
  users_permissions_user: User;
  createdAt: string;
  Image: Image;
  comments: Comment[]; 
}

interface BlogsState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogsState = {
  blogs: [],
  loading: false,
  error: null,
};

export const fetchAllBlogs = createAsyncThunk(
  'blogs/fetchAllBlogs',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (state.blogs.blogs.length > 0) {
      return state.blogs.blogs; 
    }
    try {
      const response = await fetch('http://localhost:1337/api/posts?populate=category&populate=users_permissions_user&populate=Image&populate=comments&populate=comments.users_permissions_user'); 
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();

      return data.data.map((blog: any) => ({
        id: blog.id,
        title: blog.Title, 
        content: blog.Content,
        category: blog.category, 
        users_permissions_user: blog.users_permissions_user,
        createdAt: new Date(blog.createdAt).toLocaleDateString('en-GB'),
        Image: blog.Image,
        comments: blog.comments.map((comment: any) => ({
          users_permissions_user: comment.users_permissions_user,
          Content: comment.Content,
          createdAt: comment.createdAt,
        })),
      }));
    } catch (error) {
      return rejectWithValue('Failed to fetch blogs');
    }
  }
);

export const postComment = createAsyncThunk<
{ blogId: number; comment: any },
{ blogId: number; content: string }, 
{ rejectValue: string } 
>(
  'blogs/postComment',
  async ({ blogId, content }: { blogId: number; content: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:1337/api/posts/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ Content: content }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const newComment = await response.json();
      return { blogId, comment: newComment }; // Return the new comment along with the blogId
    } catch (error) {
      return rejectWithValue('Failed to post comment');
    }
  }
);

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload; 
        state.loading = false;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        const { blogId, comment } = action.payload;
        const blog = state.blogs.find((b) => b.id === blogId);
        if (blog) {
          blog.comments.push(comment); // Add the new comment to the existing comments array
        }
      })
      .addCase(postComment.rejected, (state, action) => {
        state.error = action.payload as string; // Set the error message for posting comment
      });
  },
});

export default blogsSlice.reducer;
export const selectBlogs = (state: RootState) => state.blogs.blogs;
export const selectLoading = (state: RootState) => state.blogs.loading;
export const selectError = (state: RootState) => state.blogs.error;
