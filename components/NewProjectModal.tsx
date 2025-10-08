// components/NewProjectModal.tsx
"use client";

import { useState } from "react";
import { X, Plus, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// Importe o useAuth para acessar informações do usuário logado
import { useAuth } from "@/contexts/AuthContext";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const { user } = useAuth(); // Pegamos o usuário do nosso contexto de autenticação
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    tool: "whatsapp",
    number: "",
    prompt: "",
  });

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
    // Limpa o formulário e erros ao fechar
    setError("");
    setFormData({ tool: "whatsapp", number: "", prompt: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!user) {
      setError("Você precisa estar logado para criar um projeto.");
      setIsLoading(false);
      return;
    }

    try {
      // O token JWT é necessário para autenticar a requisição na API
      const token = localStorage.getItem("authToken");

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviando o token no header
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao criar o projeto.");
      }

      console.log("Novo projeto criado com sucesso:", data);
      handleClose(); // Fecha e reseta o modal
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado."
      );
    } finally {
      setIsLoading(false);
    }
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
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Exibição de Erro */}
        {error && (
          <div className="p-3 mx-6 mt-4 text-sm bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
            {error}
          </div>
        )}

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
                disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Exemplo: "Atenda os clientes de forma cordial e profissional..."
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="flex-1 h-11"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Projeto
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
