import React, { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

import { GOOGLE_AUTH_URL } from '../config/google';
import { USER_COLLECTION } from '../config/storage';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface AuthContextProps {
  isLogged: boolean;
  userStorageLoading: boolean;
  user: User;
  signInWithApple: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User);
  const [isLogged, setIsLogged] = useState(false);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const user = await AsyncStorage.getItem(USER_COLLECTION);

    if (!user) {
      return;
    }

    const userFormated = JSON.parse(user) as User;

    setUser(userFormated);
    setIsLogged(true);
    setUserStorageLoading(false);
  }

  async function signInWithGoogle() {
    try {
      const { type, params } = (await AuthSession.startAsync({
        authUrl: GOOGLE_AUTH_URL,
      })) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();

        const user = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };

        await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(user));

        setUser(user);
        setIsLogged(true);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const user = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: `https://ui-avatars.com/api/?name=${credential.fullName!.givenName!}&length=1`,
        };

        await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(user));

        setUser(user);
        setIsLogged(true);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUserStorageLoading(true);
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser({} as User);
    setIsLogged(false);
    setUserStorageLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{ isLogged, user, signInWithGoogle, signInWithApple, signOut, userStorageLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
