import { create } from 'zustand';
import { type UserSlice, userSlice } from './userSlice';

export const useStore = create<UserSlice>()((...parameters) => ({
  ...userSlice(...parameters),
}));
