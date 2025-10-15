"use client";

import {
  BookOpen,
  Sparkles,
  Zap,
  Code2,
  Rocket,
  CheckCircle2,
  AlertCircle,
  Info,
  Shield,
  GitBranch,
  Share2,
  BotMessageSquare,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Logo } from "@/components/new-hero-section";
import { FooterSection } from "@/components/footer-section";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "intro",
        "tutorial",
        "installation",
        "api",
        "advanced",
        "integrations",
        "updates",
        "features",
        "troubleshooting",
        "tips",
      ];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
    setSidebarOpen(false);
  };

  const navItems = [
    { id: "intro", label: "Introdução", icon: BookOpen },
    { id: "tutorial", label: "Tutorial", icon: Rocket },
    { id: "integrations", label: "Integrações", icon: GitBranch },
    { id: "updates", label: "Atualizações", icon: Sparkles },
    { id: "features", label: "Recursos", icon: Zap },
    { id: "tips", label: "Boas Práticas", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80">
        <div className="max-w-[1400px] mx-auto px-10 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit  lg:pl-6">
            <Button asChild size="sm">
              <Link href="/login">
                <span>Login</span>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 flex-shrink-0 transition-transform duration-300 z-40 lg:z-0 overflow-y-auto`}
        >
          <div className="h-full p-6 rounded-2xl bg-card/50 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Conteúdo
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          {/* Hero Section */}
          <section id="intro" className="mb-16 scroll-mt-20">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Documentação Completa v1.0
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground  to-foreground bg-clip-text text-transparent">
                Bem-vindo ao Nuuvik AI
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                O Nuuvik AI é sua plataforma para automação inteligente de
                atendimento e geração de leads. Crie bots de mensagens que
                capturam, qualificam e engajam prospects 24/7, permitindo que
                sua equipe foque em fechar negócios.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Esta documentação é seu guia completo. Explore nossos tutoriais
                e referências de API para conectar seus fluxos de trabalho a
                ferramentas como N8N, CRMs e WhatsApp, e comece a escalar suas
                vendas de forma inteligente.
              </p>
            </div>
          </section>

          {/* Tutorial Section */}
          <section id="tutorial" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-4xl font-bold">
                Tutorial: Seus Primeiros Passos
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Este tutorial guiará você na configuração do seu primeiro bot de
              automação com o Nuuvik AI. Ao final, você terá um agente de IA
              pronto para capturar e qualificar leads.
            </p>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">
                      Crie sua conta
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      O primeiro passo é criar sua conta no Nuuvik AI. Para um
                      tour rápido, você pode usar as credenciais de demonstração
                      abaixo e explorar a plataforma com recursos completos:
                    </p>
                    <div className="p-4 rounded-lg bg-background/50 font-mono text-sm mb-4">
                      <div className="text-primary font-semibold mb-1">
                        Email:
                      </div>
                      <div className="mb-3">admin@example.com</div>
                      <div className="text-primary font-semibold mb-1">
                        Senha:
                      </div>
                      <div>123456</div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      <strong>Nota:</strong> A conta demo oferece acesso total
                      aos recursos para que você possa explorar todo o potencial
                      da plataforma. Em produção, você criará sua própria conta
                      segura.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">
                      Explore o Dashboard
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Após o login, você chegará ao dashboard, o seu centro de
                      comando no Nuuvik AI. Aqui você pode:
                    </p>
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-foreground">
                            Visão Geral dos Projetos:
                          </strong>
                          <span className="text-muted-foreground">
                            {" "}
                            Acompanhe todos os seus bots de automação ativos e
                            seu desempenho.
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-foreground">
                            Análise de Leads:
                          </strong>
                          <span className="text-muted-foreground">
                            {" "}
                            Monitore quantos leads foram capturados,
                            qualificados e as interações recentes.
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-foreground">
                            Ações Rápidas:
                          </strong>
                          <span className="text-muted-foreground">
                            {" "}
                            Crie um novo projeto ou gerencie integrações com
                            apenas um clique.
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">
                      Crie seu Primeiro Agente de IA
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Agora é hora de colocar a automação para trabalhar. Com o
                      Nuuvik AI, você pode:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <BotMessageSquare className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-foreground">
                            Configurar um Novo Projeto:
                          </strong>
                          <span className="text-muted-foreground">
                            {" "}
                            Escolha a ferramenta (WhatsApp, por exemplo) e
                            defina o número que será usado pelo bot.
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-foreground">
                            Definir o Prompt da IA:
                          </strong>
                          <span className="text-muted-foreground">
                            {" "}
                            Descreva em linguagem natural como seu agente deve
                            se comportar, qual o tom de voz e quais informações
                            ele deve coletar.
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Share2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-foreground">
                            Integrar com seu Workflow:
                          </strong>
                          <span className="text-muted-foreground">
                            {" "}
                            Conecta seu agente ao N8N para enviar os leads
                            qualificados diretamente para o seu Dashboard.
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="integrations" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-4xl font-bold">Integrações Poderosas</h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Conecte o Nuuvik AI às ferramentas que você já usa para criar um
              ecossistema de automação completo, desde a captura do lead até a
              conversão.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card N8N */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <h3 className="text-xl font-semibold mb-3">
                  Conexão Nativa com N8N
                </h3>
                <p className="text-muted-foreground mb-4">
                  Use o N8N como motor para conectar o Nuuvik AI a centenas de
                  outras aplicações. Crie workflows complexos e envie seus leads
                  para qualquer lugar, sem limites.
                </p>
              </div>

              {/* Card CRMs */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <h3 className="text-xl font-semibold mb-3">
                  Seu CRM, Supervitaminado
                </h3>
                <p className="text-muted-foreground mb-4">
                  Envie leads qualificados e aquecidos automaticamente para CRMs
                  como Salesforce, HubSpot, Pipedrive e muitos outros através da
                  nossa integração com o N8N.
                </p>
              </div>

              {/* Card Plataformas de Mensagem */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <h3 className="text-xl font-semibold mb-3">
                  WhatsApp & Outras Plataformas
                </h3>
                <p className="text-muted-foreground mb-4">
                  Nossos agentes de IA operam diretamente nos canais que seus
                  clientes preferem. Configure bots para WhatsApp, Telegram e
                  outras plataformas de chat com facilidade.
                </p>
              </div>

              {/* Card Dashboard */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <h3 className="text-xl font-semibold mb-3">
                  Dashboard com Visão de CRM
                </h3>
                <p className="text-muted-foreground mb-4">
                  Todos os leads e interações são centralizados em seu dashboard
                  do Nuuvik AI. Acompanhe o histórico, gerencie contatos e
                  visualize o funil de vendas em tempo real.
                </p>
              </div>
            </div>
          </section>

          {/* Updates Section */}
          <section id="updates" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-4xl font-bold">Atualizações Recentes</h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Acompanhe as últimas melhorias, novos recursos e otimizações
              implementadas na plataforma Nuuvik AI para turbinar sua geração de
              leads.
            </p>

            <div className="space-y-6">
              {/* Version 2.1.0 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-muted text-foreground text-sm font-semibold">
                    v1.0.0
                  </span>
                  <span className="text-muted-foreground text-sm">
                    10 de Setembro, 2025
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Lançamento da Plataforma Nuuvik AI
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Sistema de autenticação completo e seguro para múltiplos
                      usuários.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Introdução de agentes de IA com prompts personalizáveis
                      para diferentes segmentos de negócio.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Lançamento da integração nativa com N8N para automação de
                      workflows.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Version 2.0.0 
              <div className="p-6 rounded-2xl bg-muted/50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-muted text-foreground text-sm font-semibold">
                    v1.0.0
                  </span>
                  <span className="text-muted-foreground text-sm">
                    10 de Setembro, 2025
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Lançamento da Plataforma Nuuvik AI
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Sistema de autenticação completo e seguro para múltiplos
                      usuários.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Introdução de agentes de IA com prompts personalizáveis
                      para diferentes segmentos de negócio.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Lançamento da integração nativa com N8N para automação de
                      workflows.
                    </span>
                  </li>
                </ul>
              </div>*/}
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-4xl font-bold">Recursos Principais</h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Descubra as funcionalidades que fazem do Nuuvik AI a ferramenta
              essencial para escalar suas vendas e seu atendimento.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1: Agentes de IA Personalizáveis */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <BotMessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Agentes de IA Personalizáveis
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Crie bots de atendimento com personalidades e objetivos
                  únicos. Use prompts em linguagem natural para treinar sua IA a
                  qualificar leads, agendar reuniões e responder dúvidas com o
                  tom de voz da sua marca.
                </p>
              </div>

              {/* Card 2: Qualificação Automática de Leads */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Qualificação Automática 24/7
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nunca mais perca uma oportunidade. Nossos agentes de IA
                  trabalham 24 horas por dia, 7 dias por semana, para engajar
                  visitantes instantaneamente, coletar informações importantes e
                  entregar apenas os leads mais quentes para sua equipe de
                  vendas.
                </p>
              </div>

              {/* Card 3: Integração Flexível com N8N */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Integração Flexível com N8N
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conecte o Nuuvik AI a qualquer ferramenta do seu arsenal. Com
                  a integração nativa com o N8N, você pode enviar leads
                  qualificados para seu CRM, planilhas, ou qualquer outro
                  sistema, criando um fluxo de trabalho 100% automatizado.
                </p>
              </div>

              {/* Card 4: Dashboard com Visão de CRM */}
              <div className="p-6 rounded-2xl bg-muted/50">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Dashboard e CRM Integrado
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Centralize toda a sua operação em um só lugar. Nosso dashboard
                  oferece uma visão completa de todas as conversas, histórico de
                  leads e métricas de desempenho, funcionando como um CRM
                  simplificado para suas automações.
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section id="tips" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <Info className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold">Boas Práticas</h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Maximize sua conversão de leads e a eficiência do seu atendimento
              seguindo estas recomendações para criar agentes de IA de alta
              performance.
            </p>

            <div className="space-y-4">
              {/* Dica 1 */}
              <div className="p-5 rounded-xl bg-blue-500/10 border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">
                      Seja Específico nos Prompts
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      Quanto mais claro e detalhado for o prompt do seu agente,
                      mais eficaz ele será. Inclua o objetivo da conversa, o tom
                      de voz, as perguntas que devem ser feitas e o perfil do
                      cliente ideal.
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Exemplo: "Você é um consultor de vendas amigável. Seu
                      objetivo é qualificar leads para nossa agência de
                      marketing. Pergunte sobre o nome da empresa, o principal
                      desafio de marketing e o orçamento mensal."
                    </p>
                  </div>
                </div>
              </div>

              {/* Dica 2 */}
              <div className="p-5 rounded-xl bg-yellow-500/10 border-l-4 border-yellow-500">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">
                      Teste as Conversas do seu Agente
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Antes de ativar seu bot, interaja com ele como se você
                      fosse um cliente. Verifique se a conversa flui bem, se as
                      perguntas fazem sentido e se ele está capturando as
                      informações corretamente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dica 3 */}
              <div className="p-5 rounded-xl bg-green-500/10 border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">
                      Otimize Continuamente
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Analise as conversas e os leads gerados no seu dashboard.
                      Identifique pontos onde os usuários desistem e ajuste os
                      prompts para melhorar a taxa de conversão e a qualidade da
                      qualificação.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dica 4 */}
              <div className="p-5 rounded-xl bg-purple-500/10 border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">
                      Garanta uma Transição Suave
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Configure a integração com seu CRM via N8N para que os
                      leads qualificados sejam entregues à sua equipe de vendas
                      com todo o histórico da conversa. Uma transição rápida e
                      contextualizada aumenta as chances de fechamento.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dica 5 */}
              <div className="p-5 rounded-xl bg-red-500/10 border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">
                      Respeite a Privacidade
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Seja transparente sobre o uso de um bot e sempre solicite
                      apenas as informações necessárias para a qualificação.
                      Respeitar os dados do usuário constrói confiança e melhora
                      a imagem da sua marca.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para escalar suas vendas?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Junte-se a centenas de empresas que já estão usando o Nuuvik AI
              para transformar seu atendimento, automatizar a qualificação de
              leads e aumentar a produtividade do time de vendas.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Ir para o Dashboard
                </Button>
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
