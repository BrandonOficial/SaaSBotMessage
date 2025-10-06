"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User, AuthContextType, LoginResult } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    setIsLoading(true);

    try {
      // SIMULAÇÃO - Substitua pela chamada real da API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validação simulada
      if (email === "admin@example.com" && password === "123456") {
        const userData: User = {
          id: 1,
          name: "Usuário Teste",
          email: email,
        };

        setUser(userData);
        setIsAuthenticated(true);

        // Redirecionar para dashboard
        router.push("/dashboard");
        return { success: true };
      } else {
        throw new Error("Email ou senha inválidos");
      }
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
