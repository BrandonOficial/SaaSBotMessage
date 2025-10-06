"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);

    if (!result.success && result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo</h1>
          <p className="text-muted-foreground">
            Entre na sua conta para continuar
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground-light" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground placeholder:text-muted-foreground-light"
                placeholder="seu@email.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground-light" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground placeholder:text-muted-foreground-light"
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground-light hover:text-foreground transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary bg-muted"
              />
              <span className="ml-2 text-sm text-muted-foreground">
                Lembrar-me
              </span>
            </label>
            <button className="text-sm text-primary hover:text-primary-light font-medium transition">
              Esqueci a senha
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-primary-foreground py-3 rounded-lg font-semibold hover:from-primary-dark hover:to-primary transform hover:scale-[1.02] transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>💡 Use: admin@example.com / 123456</p>
        </div>
      </div>
    </div>
  );
}
