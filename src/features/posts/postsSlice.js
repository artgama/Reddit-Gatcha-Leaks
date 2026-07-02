import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subreddit = 'Genshin_Impact_Leaks') => {
    // Aponta direto para a nossa função serverless da Vercel
    const response = await fetch(`/api/get-leaks?subreddit=${subreddit}`);
  
    if (!response.ok) {
      throw new Error('Falha ao buscar dados através do servidor.');
    }
  
    return await response.json(); // Já vem o array limpo lá da função!
  });

const initialState = {
    items: [],
    status: 'idle',
    error: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        //Integrar funções de like e filtro aqui
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }

})

export default postsSlice.reducer;