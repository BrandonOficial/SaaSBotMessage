// components/ProjectCard.tsx
"use client";

import { MessageCircle, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Tipagem para as propriedades do projeto
interface Project {
  id: number;
  tool: string;
  phone_number: string;
  prompt: string;
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
  onConfigure: (project: Project) => void;
}

export function ProjectCard({
  project,
  onDelete,
  onConfigure,
}: ProjectCardProps) {
  const getToolIcon = () => {
    // Futuramente, você pode adicionar ícones para Telegram, Slack, etc.
    return <MessageCircle className="w-5 h-5 text-green-500" />;
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-2xl p-6 flex flex-col justify-between gap-4 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {getToolIcon()}
            <span className="font-bold text-lg text-foreground">
              {project.phone_number}
            </span>
          </div>
          <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full capitalize">
            {project.tool}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.prompt}
        </p>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => onConfigure(project)}
          variant="outline"
          className="w-full"
        >
          <Settings className="w-4 h-4 mr-2" />
          Configurar
        </Button>
        <Button
          onClick={() => onDelete(project.id)}
          variant="destructive"
          size="icon"
          className="bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/20"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
