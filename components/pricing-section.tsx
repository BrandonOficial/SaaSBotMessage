"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const pricingPlans = [
    {
      name: "Free",
      monthlyPrice: "$0",
      annualPrice: "$0",
      description: "Perfect for individuals starting their journey.",
      features: [
        "Real-time code suggestions",
        "Basic integration logos",
        "Single MCP server connection",
        "Up to 2 AI coding agents",
        "Vercel deployments with Pointer branding",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      monthlyPrice: "$20",
      annualPrice: "$16",
      description: "Ideal for professionals.",
      features: [
        "Enhanced real-time previews",
        "Unlimited integrations with custom logos",
        "Multiple MCP server connections",
        "Up to 10 concurrent AI coding agents",
        "Collaborative coding with team chat",
        "Advanced version control integrations",
        "Priority email and chat support",
      ],
      buttonText: "Join now",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Ultra",
      monthlyPrice: "$200",
      annualPrice: "$160",
      description: "Tailored solutions for teams.",
      features: [
        "Dedicated account support",
        "Unlimited MCP server clusters",
        "Unlimited AI coding agents",
        "Enterprise-grade security and compliance",
        "Priority deployments and SLA guarantees",
      ],
      buttonText: "Talk to Sales",
      buttonVariant: "outline" as const,
    },
  ];

  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start items-center my-0 py-8 md:py-14">
      <div className="self-stretch relative flex flex-col justify-center items-center gap-3 py-0 mb-8">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-4xl md:text-5xl font-semibold leading-tight md:leading-[56px] text-balance">
            Planos feitos sob medida para você
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-base md:text-lg font-normal leading-relaxed max-w-2xl text-pretty">
            Planos acessíveis que geram retorno desde o primeiro mês. Escolha o
            ideal para seu volume de leads.
          </p>
        </div>
        <div className="pt-6">
          <div className="relative inline-flex p-1 bg-muted/50 backdrop-blur-sm rounded-xl gap-1">
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 px-6 py-2.5 flex justify-center items-center gap-2 rounded-lg transition-all duration-300 ${
                isAnnual ? "bg-primary/10" : ""
              }`}
            >
              <span
                className={`text-sm font-semibold leading-tight transition-colors ${
                  isAnnual ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Anual
              </span>
              {isAnnual && (
                <span className="py-0.5 px-2.5 bg-primary/20 text-primary text-xs font-medium rounded-full whitespace-nowrap">
                  Economize 20%
                </span>
              )}
            </button>
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 px-6 py-2.5 flex justify-center items-center rounded-lg transition-all duration-300 ${
                !isAnnual ? "bg-primary/10" : ""
              }`}
            >
              <span
                className={`text-sm font-semibold leading-tight transition-colors ${
                  !isAnnual ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Mensal
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="self-stretch px-5 flex flex-col md:flex-row justify-start items-stretch gap-6 mt-4 max-w-[1200px] mx-auto">
        {pricingPlans.map((plan, index) => (
          <div
            key={plan.name}
            className={`group relative flex-1 p-4 md:p-6 overflow-hidden rounded-2xl flex flex-col justify-between items-start gap-6 transition-all duration-300 border opacity-100 border-muted ${
              plan.popular
                ? "bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/30 shadow-lg shadow-primary/10 scale-[1.02] md:scale-105"
                : "bg-card/50 backdrop-blur-sm border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            }`}
          >
            {plan.popular && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50" />
            )}

            <div className="relative z-10 self-stretch flex flex-col justify-start items-start gap-4 flex-1">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-xl font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary">
                        Mais Popular
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <div className="relative h-12 flex items-center">
                    <span className="invisible text-4xl font-bold">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span
                      className="absolute inset-0 flex items-center transition-all duration-500 text-4xl font-bold text-foreground"
                      style={{
                        opacity: isAnnual ? 1 : 0,
                        transform: `translateY(${isAnnual ? 0 : 10}px) scale(${
                          isAnnual ? 1 : 0.9
                        })`,
                        filter: `blur(${isAnnual ? 0 : 4}px)`,
                      }}
                      aria-hidden={!isAnnual}
                    >
                      {plan.annualPrice}
                    </span>
                    <span
                      className="absolute inset-0 flex items-center transition-all duration-500 text-4xl font-bold text-foreground"
                      style={{
                        opacity: !isAnnual ? 1 : 0,
                        transform: `translateY(${!isAnnual ? 0 : 10}px) scale(${
                          !isAnnual ? 1 : 0.9
                        })`,
                        filter: `blur(${!isAnnual ? 0 : 4}px)`,
                      }}
                      aria-hidden={isAnnual}
                    >
                      {plan.monthlyPrice}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-base font-medium">
                    /month
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <Button
                className={`w-full py-5 text-base font-semibold rounded-xl transition-all duration-300 ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    : plan.buttonVariant === "outline"
                    ? "border-2 border-border hover:border-primary/50 bg-transparent hover:bg-primary/5"
                    : "bg-secondary hover:bg-secondary/90"
                }`}
              >
                {plan.buttonText}
              </Button>

              <div className="self-stretch flex flex-col justify-start items-start gap-4 pt-2">
                <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                  {plan.name === "Free"
                    ? "Included"
                    : `Everything in ${
                        pricingPlans[index - 1]?.name || "Free"
                      } +`}
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="self-stretch flex justify-start items-start gap-3"
                    >
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 ${
                          plan.popular ? "bg-primary/20" : "bg-muted"
                        }`}
                      >
                        <Check
                          className={`w-3.5 h-3.5 ${
                            plan.popular
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                          strokeWidth={3}
                        />
                      </div>
                      <div className="text-sm leading-relaxed text-muted-foreground flex-1">
                        {feature}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
