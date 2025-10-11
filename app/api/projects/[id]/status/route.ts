// app/api/projects/[id]/status/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
}

// Rota específica para atualizar APENAS o status de um projeto
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    const { status } = await request.json();

    // 1. Validação do status
    const validStatuses = [
      "pendente",
      "em_andamento",
      "concluido",
      "cancelado",
      "erro",
    ];

    if (!status) {
      return NextResponse.json(
        { error: "O campo 'status' é obrigatório." },
        { status: 400 }
      );
    }

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Status inválido. Valores aceitos: ${validStatuses.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // 2. Autenticação do usuário
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

    // 3. Atualizar apenas o status
    const result = await pool.query(
      "UPDATE projects SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *",
      [status, projectId, userId]
    );

    // 4. Verificação do resultado
    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          error:
            "Projeto não encontrado ou você não tem permissão para editá-lo.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Status atualizado com sucesso.",
        project: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar status do projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
