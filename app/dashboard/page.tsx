"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LogOut,
  User,
  Activity,
  TrendingUp,
  Users,
  Zap,
  Plus,
  FileText,
  Settings,
  Bell,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Logo } from "@/components/new-hero-section";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      icon: Activity,
      label: "Active Projects",
      value: "12",
      change: "+2 this week",
      trend: "up",
      color: "from-red-500/20 to-orange-500/20",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500",
    },
    {
      icon: Users,
      label: "Team Members",
      value: "8",
      change: "+1 this month",
      trend: "up",
      color: "from-primary/20 to-pink-500/20",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Performance",
      value: "94%",
      change: "+5% from last month",
      trend: "up",
      color: "from-orange-500/20 to-red-500/20",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: Zap,
      label: "API Calls",
      value: "2.4k",
      change: "+12% this week",
      trend: "up",
      color: "from-pink-500/20 to-primary/20",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-500",
    },
  ];

  const quickActions = [
    {
      icon: Plus,
      label: "New Project",
      color: "bg-primary hover:bg-primary/90",
    },
    {
      icon: FileText,
      label: "View Reports",
      color: "bg-muted hover:bg-muted/80",
    },
    { icon: Settings, label: "Settings", color: "bg-muted hover:bg-muted/80" },
  ];

  const recentActivities = [
    {
      icon: Plus,
      action: "Novo projeto criado",
      time: "2 horas atrás",
      color: "text-green-500",
    },
    {
      icon: Users,
      action: "Membro adicionado à equipe",
      time: "5 horas atrás",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      action: "API integrada com sucesso",
      time: "1 dia atrás",
      color: "text-primary",
    },
    {
      icon: FileText,
      action: "Relatório gerado",
      time: "2 dias atrás",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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
                <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 text-xs sm:text-sm h-9 sm:h-10">
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Novo Projeto
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 hover:bg-primary/5 bg-background/50 backdrop-blur-sm text-xs sm:text-sm h-9 sm:h-10"
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Ver Relatórios
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-pink-500/20 rounded-3xl blur-2xl" />

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-pink-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-orange-500 to-primary rounded-2xl blur-xl opacity-50 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.label}
                className="group p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl bg-card backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 text-left"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div
                    className={`p-2 sm:p-2.5 lg:p-3 rounded-lg lg:rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 ${stat.iconColor}`}
                    />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full w-3/4 transition-all duration-500`}
                      />
                    </div>
                  </div>
                  <p className={`text-xs font-medium ${stat.iconColor}`}>
                    {stat.change}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
              Ações Rápidas
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    className={`w-full justify-start gap-2 sm:gap-3 h-auto py-3 sm:py-3.5 lg:py-4 ${action.color} shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <div className="text-left">
                      <p className="font-semibold text-xs sm:text-sm lg:text-base">
                        {action.label}
                      </p>
                      <p className="text-xs opacity-90">
                        Criar um novo projeto
                      </p>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
