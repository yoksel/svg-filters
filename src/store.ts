import { configureStore } from '@reduxjs/toolkit';
import playgroundSlice from './store/playgroundSlice';
import presetControlsSlice from './store/presetControlsSlice';
import primitivesSlice from './store/primitivesSlice';

export const store = configureStore({
  reducer: {
    playground: playgroundSlice,
    presetControls: presetControlsSlice,
    primitives: primitivesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
