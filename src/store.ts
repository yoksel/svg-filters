import { configureStore } from '@reduxjs/toolkit';
import previewSlice from './store/previewSlice';
import dataSlice from './store/dataSlice';
import primitivesSlice from './store/primitivesSlice';
import dragDropSlice from './store/dragDropSlice';

export const store = configureStore({
  reducer: {
    // playground state/props: code to show, type
    preview: previewSlice,
    // list of all presets
    data: dataSlice,
    // main app state: control primitives states in different sections
    primitives: primitivesSlice,
    dragDrop: dragDropSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
