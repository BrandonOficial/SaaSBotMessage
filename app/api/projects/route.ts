// app/api/projects/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

// Definição do tipo para o payload do token para segurança de tipos
interface TokenPayload {
  userId: number;
  email: string;
}

export async function POST(request: Request) {
  try {
    const { tool, number, prompt } = await request.json();

    // 1. Obter o token do header da requisição
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Acesso não autorizado." },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];

    // 2. Verificar o token e extrair o ID do usuário
    let userId: number;
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as TokenPayload;
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json(
        { error: "Token inválido ou expirado." },
        { status: 401 }
      );
    }

    // 3. Validar os dados recebidos
    if (!tool || !number || !prompt) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // 4. Inserir o novo projeto no banco de dados, associado ao usuário
    const result = await pool.query(
      "INSERT INTO projects (user_id, tool, phone_number, prompt) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, tool, number, prompt]
    );

    const newProject = result.rows[0];

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar o projeto." },
      { status: 500 }
    );
  }
}
