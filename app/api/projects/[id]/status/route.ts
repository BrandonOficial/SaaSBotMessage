// app/api/projects/[id]/status/route.ts
import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-middleware";
import { validateProjectStatus } from "@/lib/validation";
import { updateProjectStatus } from "@/lib/services/project.service";
import { handleApiError } from "@/lib/error-handler";

/**
 * PATCH - Atualizar apenas o status de um projeto
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    // Autenticação
    const auth = await authenticateRequest(request);
    if (!auth.success) {
      return auth.error!;
    }

    const body = await request.json();

    // Validação do status
    if (!body.status) {
      return NextResponse.json(
        { error: "O campo 'status' é obrigatório." },
        { status: 400 }
      );
    }

    const validation = validateProjectStatus(body.status);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Atualizar status
    const updatedProject = await updateProjectStatus(
      projectId,
      auth.userId!,
      body.status
    );

    return NextResponse.json(
      {
        message: "Status atualizado com sucesso.",
        project: updatedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, "update project status");
  }
}
