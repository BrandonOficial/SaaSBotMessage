// components/NewProjectModal.tsx
"use client";

import { useState } from "react";
import { X, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Lógica do Modal isolada em seu próprio componente
export function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    tool: "whatsapp",
    number: "",
    prompt: "",
  });

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo projeto criado:", formData);
    // Lógica para salvar o projeto...
    onClose();
    setFormData({ tool: "whatsapp", number: "", prompt: "" }); // Reseta o formulário
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl shadow-primary/20 animate-in zoom-in-95 duration-200">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Criar Novo Projeto
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure seu projeto de automação
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Ferramenta de Fluxo
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <select
                value={formData.tool}
                onChange={(e) =>
                  setFormData({ ...formData, tool: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
                <option value="slack">Slack</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Número do WhatsApp
            </label>
            <input
              type="tel"
              placeholder="+55 11 99999-9999"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Prompt para IA
            </label>
            <textarea
              placeholder="Descreva como a IA deve se comportar neste fluxo..."
              value={formData.prompt}
              onChange={(e) =>
                setFormData({ ...formData, prompt: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-foreground placeholder:text-muted-foreground"
              required
            />
            <p className="text-xs text-muted-foreground">
              Exemplo: "Atenda os clientes de forma cordial e profissional..."
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 h-11"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Projeto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
