"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  Lock,
  AlertCircle,
  Scale,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/new-hero-section";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="text-sm text-muted-foreground">
            Última atualização: Outubro 2025
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-transparent mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Termos de Uso
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leia atentamente estes termos antes de utilizar nossos serviços. Ao
            acessar ou usar o Nuuvik AI, você concorda com estas condições.
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">
                  1. Aceitação dos Termos
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Ao acessar e usar o Nuuvik AI ("Serviço"), você aceita e
                    concorda em ficar vinculado aos termos e condições deste
                    Acordo. Se você não concordar com qualquer parte destes
                    termos, não poderá acessar o Serviço.
                  </p>
                  <p>
                    Estes Termos de Uso aplicam-se a todos os visitantes,
                    usuários e outras pessoas que acessam ou usam o Serviço.
                    Reservamo-nos o direito de atualizar e alterar os Termos de
                    Uso periodicamente, notificando os usuários sobre mudanças
                    significativas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">
                  2. Contas de Usuário
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Para acessar os recursos do Serviço, você deve criar uma
                    conta. Ao fazê-lo, você concorda em:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Fornecer informações precisas, atuais e completas.</li>
                    <li>Manter e atualizar prontamente suas informações.</li>
                    <li>
                      Manter a segurança de sua senha e aceitar total
                      responsabilidade por atividades em sua conta.
                    </li>
                    <li>
                      Notificar-nos imediatamente sobre qualquer uso não
                      autorizado.
                    </li>
                  </ul>
                  <p>
                    Você é responsável por todas as atividades em sua conta. Não
                    compartilhe suas credenciais. Reservamo-nos o direito de
                    suspender ou encerrar contas que violem estes termos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">3. Uso Aceitável</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Você concorda em usar o Serviço apenas para fins legais.
                    Você concorda em NÃO usar o Serviço para:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Violar leis ou regulamentos locais, nacionais ou
                      internacionais.
                    </li>
                    <li>
                      Transmitir material publicitário ou promocional não
                      solicitado (spam).
                    </li>
                    <li>
                      Interferir ou interromper o Serviço, servidores ou redes
                      conectadas.
                    </li>
                    <li>
                      Usar o Serviço de forma que possa danificar, desabilitar,
                      sobrecarregar ou prejudicar a plataforma.
                    </li>
                  </ul>
                  <p>
                    Qualquer violação destas restrições pode resultar no
                    encerramento imediato de sua conta.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">
                  4. Propriedade Intelectual e Dados
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    O Serviço e seu conteúdo original, recursos e
                    funcionalidades são e permanecerão propriedade exclusiva do
                    Nuuvik AI.
                  </p>
                  <p>
                    Você retém todos os direitos sobre os dados dos seus leads,
                    os prompts que você cria e o conteúdo das conversas geradas
                    através do Serviço. Ao usar a plataforma, você nos concede
                    uma licença limitada para processar e armazenar esses dados
                    exclusivamente para fornecer e melhorar o Serviço.
                  </p>
                  <p>
                    Nossas marcas registradas não podem ser usadas sem o
                    consentimento prévio por escrito do Nuuvik AI.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">
                  5. Privacidade e Proteção de Dados
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Sua privacidade é fundamental. Nossa Política de Privacidade
                    detalha como coletamos, usamos e protegemos suas informações
                    e os dados de seus leads. Ao usar o Serviço, você concorda
                    com nossas práticas de privacidade.
                  </p>
                  <p>
                    Implementamos medidas de segurança técnicas e
                    organizacionais para proteger seus dados contra acesso não
                    autorizado. No entanto, nenhum método de transmissão pela
                    Internet é 100% seguro.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">
                  6. Limitação de Responsabilidade
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    O Serviço é fornecido "como está". Não garantimos que será
                    ininterrupto ou livre de erros. Em nenhuma circunstância o
                    Nuuvik AI será responsável por quaisquer danos indiretos,
                    incluindo perda de lucros, dados ou boa vontade.
                  </p>
                  <p>
                    Nossa responsabilidade total por todas as reivindicações não
                    excederá o valor que você nos pagou nos últimos 12 meses.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 - Rescisão (Simplificado) */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">7. Rescisão</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Podemos encerrar ou suspender sua conta imediatamente, sem
                    aviso prévio, por qualquer motivo, incluindo a violação
                    destes Termos. Após o encerramento, seu direito de usar o
                    Serviço cessará.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 - Alterações (Simplificado) */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">
                  8. Alterações aos Termos
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Reservamo-nos o direito de modificar estes Termos a qualquer
                    momento. Se uma revisão for material, avisaremos com 30 dias
                    de antecedência. Ao continuar a usar o Serviço após as
                    alterações, você concorda com os novos termos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">9. Contato</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Se você tiver alguma dúvida sobre estes Termos, entre em
                    contato conosco:
                  </p>
                  <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                    <p className="font-medium text-foreground">Nuuvik AI</p>
                    <p>Email: legal@nuuvik.ai</p>
                    <p>Telefone: +55 (11) 1234-5678</p>
                    <p>Endereço: Av. Paulista, 1000 - São Paulo, SP</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <h3 className="text-2xl font-bold mb-4">
            Tem dúvidas sobre nossos termos?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nossa equipe está pronta para esclarecer qualquer questão sobre os
            Termos de Uso.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              <Mail className="w-4 h-4" />
              Entre em Contato
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
