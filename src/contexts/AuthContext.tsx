import React, { createContext, ReactNode, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextProps {
  isLogged: boolean;
  user: User;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User);
  const [isLogged, setIsLogged] = useState(false);

  return <AuthContext.Provider value={{ isLogged, user }}>{children}</AuthContext.Provider>;
}
