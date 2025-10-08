import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
}

// Função para DELETAR um projeto específico
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    // 1. Autenticar o usuário
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

    // 2. Deletar o projeto, mas COM UMA CONDIÇÃO DE SEGURANÇA
    // A query só deleta o projeto se o ID do projeto E o ID do usuário baterem.
    // Isso impede que um usuário delete projetos de outro.
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *",
      [projectId, userId]
    );

    // 3. Verificar se algo foi realmente deletado
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
