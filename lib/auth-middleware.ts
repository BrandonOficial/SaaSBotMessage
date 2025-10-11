// lib/auth-middleware.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: number;
  email: string;
}

export interface AuthResult {
  success: boolean;
  userId?: number;
  error?: NextResponse;
}

/**
 * Extrai e valida o token JWT do header de autorização
 * @param request - Request object do Next.js
 * @returns Objeto com sucesso e userId ou erro
 */
export async function authenticateRequest(
  request: Request
): Promise<AuthResult> {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        success: false,
        error: NextResponse.json(
          { error: "Não autorizado. Token não fornecido." },
          { status: 401 }
        ),
      };
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as TokenPayload;

      if (!decoded.userId) {
        return {
          success: false,
          error: NextResponse.json(
            { error: "ID do usuário não encontrado no token." },
            { status: 401 }
          ),
        };
      }

      return {
        success: true,
        userId: decoded.userId,
      };
    } catch (jwtError) {
      return {
        success: false,
        error: NextResponse.json(
          { error: "Token inválido ou expirado." },
          { status: 401 }
        ),
      };
    }
  } catch (error) {
    return {
      success: false,
      error: NextResponse.json(
        { error: "Erro ao processar autenticação." },
        { status: 500 }
      ),
    };
  }
}
