// app/dashboard/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, User, Plus, Bell, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/new-hero-section";
import { NewProjectModal } from "@/components/NewProjectModal"; // Importe o novo componente

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-tr from-primary/15 via-pink-500/10 to-transparent rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-[50px] sm:blur-[60px] lg:blur-[80px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/">
              <Logo />
            </Link>
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
              <button className="p-1.5 sm:p-2 rounded-lg hover:bg-muted transition-colors relative">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <div className="hidden sm:flex items-center gap-2 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 rounded-lg bg-muted/50 backdrop-blur-sm">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                <span className="text-xs sm:text-sm text-foreground font-medium truncate max-w-[100px] sm:max-w-[150px] lg:max-w-none">
                  {user?.email}
                </span>
              </div>
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 sm:gap-2 text-primary hover:bg-primary/10 text-xs sm:text-sm px-2 sm:px-3"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="relative overflow-hidden p-6 sm:p-8 lg:p-12 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent backdrop-blur-sm shadow-2xl shadow-primary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-pink-500/5" />
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl lg:blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-xl lg:blur-2xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 backdrop-blur-sm">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">
                  Dashboard
                </span>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-foreground leading-tight">
                  Bem-vindo de volta
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Gerencie seus projetos, acompanhe o desempenho da equipe e
                  impulsione seu crescimento com insights em tempo real.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 text-xs sm:text-sm h-9 sm:h-10"
                >
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Novo Projeto
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              {/* Conteúdo visual... */}
            </div>
          </div>
        </div>
      </main>

      {/* Renderiza o modal condicionalmente */}
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
