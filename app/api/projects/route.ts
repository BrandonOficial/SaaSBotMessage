// app/api/projects/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
// A importação de 'headers' não é mais necessária aqui!

// Tipagem para o payload do token JWT
interface TokenPayload {
  userId: number;
}

// ROTA PARA CRIAR UM NOVO PROJETO
export async function POST(request: Request) {
  try {
    const { tool, number: phoneNumber, prompt } = await request.json();

    if (!tool || !prompt) {
      return NextResponse.json(
        { error: "A ferramenta e o prompt são obrigatórios." },
        { status: 400 }
      );
    }

    // --- CORREÇÃO AQUI ---
    // Pegando o cabeçalho diretamente do objeto 'request'
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Não autorizado. Token não fornecido." },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    let userId;

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

    if (!userId) {
      return NextResponse.json(
        { error: "ID do usuário não encontrado no token." },
        { status: 401 }
      );
    }

    const result = await pool.query(
      "INSERT INTO projects (user_id, tool, phone_number, prompt) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, tool, phoneNumber, prompt]
    );

    const newProject = result.rows[0];

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao criar o projeto." },
      { status: 500 }
    );
  }
}

// ROTA PARA BUSCAR OS PROJETOS (JÁ CORRIGIDA TAMBÉM)
export async function GET(request: Request) {
  try {
    // --- CORREÇÃO AQUI ---
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ error: "Token inválido." }, { status: 401 });
    }

    const result = await pool.query(
      "SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Token inválido ou expirado." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "Erro interno ao buscar os projetos." },
      { status: 500 }
    );
  }
}
