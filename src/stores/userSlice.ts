import { hasCharityProfile, hasSchoolProfile } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import { HasCharityProfileQuery, HasSchoolProfileQuery } from '@/types/api';
import { CustomAttributes } from '@/types/data';
import { GraphQLQuery } from 'aws-amplify/api';
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
  hasProfile: boolean;
  getCurrentUser(): Promise<void>;
  logout(): Promise<void>;
  login(username: string, password: string): Promise<void>;
}

export const userSlice: StateCreator<UserSlice> = (set) => ({
  user: undefined,
  isLoading: true,
  hasProfile: false,
  getCurrentUser: async (): Promise<void> => {
    const user = await getUser();
    const { type, id, name } = user;
    try {
      set({
        user,
        isLoading: false,
        hasProfile:
          type === 'school' || type === 'charity' ? await hasProfile(type, name, id) : false,
      });
    } catch (error) {
      set({ user: undefined, isLoading: false, hasProfile: false });
    }
  },
  logout: async (): Promise<void> => {
    await signOut();
    set({ user: undefined, hasProfile: false });
  },
  login: async (username: string, password: string): Promise<void> => {
    try {
      await signIn({ username, password });
      const user = await getUser();
      const { type, id, name } = user;
      set({
        user,
        isLoading: false,
        error: undefined,
        hasProfile:
          type === 'school' || type === 'charity' ? await hasProfile(type, name, id) : false,
      });
    } catch (error) {
      set({ user: undefined, isLoading: false, error: error as Error, hasProfile: false });
    }
  },
});

const hasProfile = async (
  type: 'school' | 'charity',
  name: string,
  id: string
): Promise<boolean> => {
  if (type === 'school') {
    const { data } = await client.graphql<GraphQLQuery<HasSchoolProfileQuery>>({
      query: hasSchoolProfile,
      variables: {
        name,
        id,
      },
    });

    return !!data?.hasSchoolProfile;
  }

  const { data } = await client.graphql<GraphQLQuery<HasCharityProfileQuery>>({
    query: hasCharityProfile,
    variables: {
      name,
      id,
    },
  });

  return !!data?.hasCharityProfile;
};

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
