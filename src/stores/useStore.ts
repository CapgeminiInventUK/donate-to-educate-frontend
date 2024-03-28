import { create } from 'zustand';
import { UserSlice, userSlice } from './userSlice';

export const useStore = create<UserSlice>()((...parameters) => ({
  ...userSlice(...parameters),
}));
