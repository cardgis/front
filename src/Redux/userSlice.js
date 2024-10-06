import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const register = createAsyncThunk('Register user', async (body, {rejectWithValue}) => {
  const response = await fetch("http://localhost:3010/auth/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  if (response.status >= 400){
    return rejectWithValue(await response.json());
  }
  return await response.json();
});

export const login = createAsyncThunk('Login user', async (body, {rejectWithValue}) => {
  const response = await fetch("http://localhost:3010/auth/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  if (response.status >= 400){
    return rejectWithValue(await response.json());
  }
  return await response.json();
});

export const isConnected = createAsyncThunk('IsConnected user', async ( {rejectWithValue}) => {
  const response = await fetch("http://localhost:3010/auth/validate_token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("accessToken"),
    }
  });
  if (response.status >= 400){
    return rejectWithValue(await response.json());
  }
  return await response.json();
});

export const userSlice = createSlice({
  name: 'user', 
  initialState: { 
    status: 'idle', 
    error: null, 
    connected: false
  },
  reducers:{
    disconnected: (state) => {
      localStorage.setItem('accessToken',"");
      localStorage.setItem('refreshToken',"");
      state.connected = false;
      state.status = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'success';
        state.connected = true;
        localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(action.payload.refreshToken));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        state.connected = true;
        localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(action.payload.refreshToken));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(isConnected.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(isConnected.fulfilled, (state, action) => {
        state.status = 'success';
        state.connected = true;
      })
      .addCase(isConnected.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {disconnected} = userSlice.actions;

export default userSlice.reducer;
