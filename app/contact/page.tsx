"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Clock,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/new-hero-section";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[900px] h-[900px] bg-primary/15 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50  bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-[1200px] mx-auto px-5 py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="group bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Resposta em até 48 horas
            </p>
            <a
              href="mailto:contato@pointerai.com"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              contato@pointerai.com
            </a>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Telefone</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Seg-Sex, 9h às 18h
            </p>
            <a
              href="tel:+5511999999999"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              +55 (11) 9999-9999
            </a>
          </div>

          <div className="group bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Escritório</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Visite-nos pessoalmente
            </p>
            <p className="text-primary font-medium">
              Av. Paulista, 1000
              <br />
              São Paulo - SP
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/5">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Envie sua Mensagem</h2>
              <p className="text-muted-foreground">
                Preencha o formulário abaixo e entraremos em contato o mais
                breve possível
              </p>
            </div>

            {submitted && (
              <div className="mb-8 p-5 bg-green-500/10 backdrop-blur-sm rounded-2xl flex items-center gap-4 border border-green-500/20">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-green-600 dark:text-green-400 font-semibold mb-1">
                    Mensagem enviada com sucesso!
                  </p>
                  <p className="text-sm text-green-600/80 dark:text-green-400/80">
                    Nossa equipe entrará em contato em breve.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-3"
                  >
                    Nome Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="João Silva"
                    className="w-full bg-background/50 h-14 text-base rounded-xl focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-3"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="joao@empresa.com"
                    className="w-full bg-background/50 h-14 text-base rounded-xl focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold mb-3"
                >
                  Assunto *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Como podemos ajudar você?"
                  className="w-full bg-background/50 h-14 text-base rounded-xl focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-3"
                >
                  Mensagem *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Conte-nos mais sobre sua dúvida ou sugestão..."
                  rows={6}
                  className="w-full bg-background/50 resize-none text-base rounded-xl focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground h-14 text-base font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Send className="w-5 h-5" />
                    Enviar Mensagem
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
