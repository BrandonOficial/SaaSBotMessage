import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
}

// Rota para ATUALIZAR um projeto específico
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // CORREÇÃO AQUI: Adicione 'await' para resolver a Promise
    const { id: projectId } = await params;
    const { tool, number: phoneNumber, prompt } = await request.json();

    // 1. Autenticação do usuário
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "ID do usuário não encontrado no token." },
        { status: 401 }
      );
    }

    // 2. Execução da query de atualização
    const result = await pool.query(
      "UPDATE projects SET tool = $1, phone_number = $2, prompt = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [tool, phoneNumber, prompt, projectId, userId]
    );

    // 3. Verificação do resultado
    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          error:
            "Projeto não encontrado ou você não tem permissão para editá-lo.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

// Rota para DELETAR um projeto específico
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Aguarda o params antes de acessar suas propriedades
    const { id: projectId } = await params;

    // 1. Autenticação do usuário
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
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
      // Retorna erro se o token for inválido ou expirado
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

    // 2. Execução da query de deleção com verificação de segurança
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *",
      [projectId, userId]
    );

    // 3. Verificação do resultado
    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          error:
            "Projeto não encontrado ou você não tem permissão para deletá-lo.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Projeto deletado com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
