"use client";

import { Twitter, Github, Linkedin, Instagram } from "lucide-react";
import { Logo } from "./new-hero-section";

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <div className="text-center text-foreground text-xl font-semibold leading-4">
            <Logo />
          </div>
        </div>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">
          Programação facilitada
        </p>
        <div className="flex justify-start items-start gap-3">
          <a
            href="https://www.instagram.com/ramosbrandon_/"
            aria-label="Instagram"
            className="w-4 h-4 flex items-center justify-center"
          >
            <Instagram className="w-full h-full text-muted-foreground" />
          </a>
          <a
            href="https://github.com/BrandonOficial/SaaSBotMessage"
            target="_blank"
            aria-label="GitHub"
            className="w-4 h-4 flex items-center justify-center"
          >
            <Github className="w-full h-full text-muted-foreground" />
          </a>
          <a
            href="https://www.linkedin.com/in/brandon-ramos-73ba27206/"
            target="_blank"
            aria-label="LinkedIn"
            className="w-4 h-4 flex items-center justify-center"
          >
            <Linkedin className="w-full h-full text-muted-foreground" />
          </a>
        </div>
      </div>
      {/* Right Section: Product, Company, Resources */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto">
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">
            Produto
          </h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <a
              href="#features-section"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Ferramentas
            </a>
            <a
              href="#pricing-section"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Preços
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">
            Recursos
          </h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a
              href="/terms"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Termos de uso
            </a>
            <a
              href="/docs"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Documentação
            </a>
            <a
              href="/contact"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Suporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
