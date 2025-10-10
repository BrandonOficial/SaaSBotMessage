// components/ProjectCard.tsx
"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Settings,
  Trash2,
  Zap,
  ArrowUpRight,
  Phone,
  Loader2,
  Save,
  X, // Para o botão de cancelar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id: number;
  tool: string;
  phone_number: string;
  prompt: string;
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
  // A prop 'onConfigure' será usada para disparar a atualização da lista no pai
  onConfigure: () => void;
}

export function ProjectCard({
  project,
  onDelete,
  onConfigure,
}: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [editedProject, setEditedProject] = useState(project);

  useEffect(() => {
    // Garante que o estado de edição seja atualizado se o projeto prop mudar
    setEditedProject(project);
  }, [project]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedProject(project); // Restaura os dados originais ao cancelar
      setError("");
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tool: editedProject.tool,
          number: editedProject.phone_number,
          prompt: editedProject.prompt,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Falha ao salvar as alterações.");
      }

      setIsEditing(false);
      onConfigure(); // Sinaliza ao componente pai para recarregar os dados
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getToolIcon = () => {
    return <MessageCircle className="w-5 h-5" />;
  };

  const getToolColor = () => {
    switch (project.tool.toLowerCase()) {
      case "whatsapp":
        return {
          gradient: "from-green-500/20 to-emerald-500/20",
          iconBg: "bg-green-500/10",
          iconColor: "text-green-500",
          badge: "bg-green-500/10 text-green-500",
          glow: "shadow-green-500/10",
        };
      // ... outros casos
      default:
        return {
          gradient: "from-primary/20 to-pink-500/20",
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          badge: "bg-primary/10 text-primary",
          glow: "shadow-primary/10",
        };
    }
  };

  const colors = getToolColor();

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* Efeitos visuais (sem alterações) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div
        className={`absolute inset-0 ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div
        className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${colors.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
      />
      <div
        className={`absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr ${colors.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
      />

      <div className="relative p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div
              className={`p-3 rounded-xl ${colors.iconBg} group-hover:scale-110 transition-transform duration-300`}
            >
              <div className={colors.iconColor}>{getToolIcon()}</div>
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <Input
                  value={editedProject.phone_number}
                  onChange={(e) =>
                    setEditedProject({
                      ...editedProject,
                      phone_number: e.target.value,
                    })
                  }
                  className="mb-2 bg-background/50 h-9"
                  placeholder="Número do WhatsApp"
                />
              ) : (
                <div className="flex items-center gap-2 mb-1">
                  <Phone className={`w-3.5 h-3.5 ${colors.iconColor}`} />
                  <span className="font-bold text-base text-foreground truncate">
                    {editedProject.phone_number}
                  </span>
                </div>
              )}
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${colors.badge}`}
              >
                <Zap className="w-3 h-3" />
                {editedProject.tool}
              </span>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors opacity-0 group-hover:opacity-100">
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div>
          {isEditing ? (
            <Textarea
              value={editedProject.prompt}
              onChange={(e) =>
                setEditedProject({ ...editedProject, prompt: e.target.value })
              }
              className="bg-background/50"
              rows={3}
              placeholder="Descreva o prompt da IA..."
            />
          ) : (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {editedProject.prompt}
            </p>
          )}
        </div>

        {error && <p className="text-xs text-destructive mt-2">{error}</p>}

        <div className="flex gap-2 pt-2">
          {isEditing ? (
            <>
              <Button
                onClick={handleToggleEdit}
                variant="outline"
                className="flex-1"
                disabled={isLoading}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Salvar
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleToggleEdit}
                variant="outline"
                className="flex-1 gap-2 hover:bg-primary/5 bg-background/50 backdrop-blur-sm group/btn"
              >
                <Settings className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
                <span className="font-semibold">Configurar</span>
              </Button>
              <Button
                onClick={() => onDelete(project.id)}
                size="icon"
                className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 hover:border-destructive/30 hover:scale-110 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
