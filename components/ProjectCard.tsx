import {
  MessageCircle,
  Settings,
  Trash2,
  Zap,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
      case "telegram":
        return {
          gradient: "from-blue-500/20 to-cyan-500/20",
          iconBg: "bg-blue-500/10",
          iconColor: "text-blue-500",
          badge: "bg-blue-500/10 text-blue-500",
          glow: "shadow-blue-500/10",
        };
      case "slack":
        return {
          gradient: "from-purple-500/20 to-pink-500/20",
          iconBg: "bg-purple-500/10",
          iconColor: "text-purple-500",
          badge: "bg-purple-500/10 text-purple-500",
          glow: "shadow-purple-500/10",
        };
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
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Glow Effect */}
      <div
        className={`absolute inset-0 ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Decorative Blobs */}
      <div
        className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${colors.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
      />
      <div
        className={`absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr ${colors.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
      />

      <div className="relative p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div
              className={`p-3 rounded-xl ${colors.iconBg} group-hover:scale-110 transition-transform duration-300`}
            >
              <div className={colors.iconColor}>{getToolIcon()}</div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Phone className={`w-3.5 h-3.5 ${colors.iconColor}`} />
                <span className="font-bold text-base text-foreground truncate">
                  {project.phone_number}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${colors.badge}`}
              >
                <Zap className="w-3 h-3" />
                {project.tool}
              </span>
            </div>
          </div>

          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors opacity-0 group-hover:opacity-100">
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Prompt Content */}
        <div>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {project.prompt}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onConfigure(project)}
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
        </div>
      </div>
    </div>
  );
}
