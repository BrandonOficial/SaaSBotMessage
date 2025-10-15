// lib/error-handler.ts
import { NextResponse } from "next/server";

/**
 * Classe para erros customizados da API
 */
export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Manipula erros do PostgreSQL
 */
export function handleDatabaseError(error: any): NextResponse {
  console.error("Database error:", error);

  // Violação de unique constraint (email duplicado)
  if (error.code === "23505") {
    return NextResponse.json(
      { error: "Este e-mail já está em uso." },
      { status: 409 }
    );
  }

  // Violação de foreign key
  if (error.code === "23503") {
    return NextResponse.json(
      { error: "Referência inválida no banco de dados." },
      { status: 400 }
    );
  }

  // Violação de check constraint
  if (error.code === "23514") {
    return NextResponse.json(
      { error: "Dados inválidos fornecidos." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { error: "Erro interno do servidor." },
    { status: 500 }
  );
}

/**
 * Manipulador genérico de erros
 */
export function handleApiError(error: unknown, context: string): NextResponse {
  console.error(`Error in ${context}:`, error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error && "code" in error) {
    return handleDatabaseError(error);
  }

  return NextResponse.json(
    { error: "Erro interno do servidor." },
    { status: 500 }
  );
}
