import LoginForm from "@/components/loginForm";
import Link from "next/link";
import { Logo } from "@/components/new-hero-section";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background effects matching landing page */}
      <div
        aria-hidden
        className="z-[1] absolute inset-0 pointer-events-none isolate opacity-20"
      >
        <div className="w-[35rem] h-[80rem] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,85%,60%,.12)_0,hsla(0,85%,60%,.04)_50%,hsla(0,85%,60%,0)_80%)]" />
        <div className="h-[80rem] absolute right-0 top-0 w-56 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,85%,60%,.08)_0,hsla(0,85%,60%,.03)_80%,transparent_100%)]" />
      </div>

      {/* Logo at top */}
      <div className="absolute top-8 left-8 z-10">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {/* Login form */}
      <div className="relative z-10">
        <LoginForm />
      </div>

      {/* Back to home link */}
      <div className="relative z-10 mt-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
