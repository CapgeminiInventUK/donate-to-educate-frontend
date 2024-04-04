import { CustomAttributes } from '@/types/data';
import {
  FetchUserAttributesOutput,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signIn,
  signOut,
} from 'aws-amplify/auth';
import { StateCreator } from 'zustand';

interface User {
  userId: string;
  username: string;
  email: string;
  type: string;
  name: string;
  id: string;
  token: string;
}

export interface UserSlice {
  user?: User;
  error?: Error;
  isLoading: boolean;
  getCurrentUser(): Promise<void>;
  logout(): Promise<void>;
  login(username: string, password: string): Promise<void>;
}

export const userSlice: StateCreator<UserSlice> = (set) => ({
  user: undefined,
  isLoading: true,
  getCurrentUser: async (): Promise<void> => {
    try {
      set({
        user: await getUser(),
        isLoading: false,
      });
    } catch (error) {
      set({ user: undefined, isLoading: false });
    }
  },
  logout: async (): Promise<void> => {
    await signOut();
    set({ user: undefined });
  },
  login: async (username: string, password: string): Promise<void> => {
    try {
      await signIn({ username, password });
      set({
        user: await getUser(),
        isLoading: false,
        error: undefined,
      });
    } catch (error) {
      set({ user: undefined, isLoading: false, error: error as Error });
    }
  },
});

const getUser = async (): Promise<User> => {
  const { userId, username } = await getCurrentUser();
  const {
    email,
    'custom:type': type,
    'custom:institution': name,
    'custom:institutionId': id,
  } = (await fetchUserAttributes()) as FetchUserAttributesOutput & CustomAttributes;
  const session = await fetchAuthSession();
  return {
    userId,
    username,
    email: email ?? '',
    type,
    name,
    id,
    token: session.tokens?.idToken?.toString() ?? '',
  };
};
