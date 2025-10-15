// app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-middleware";
import { validateProjectStatus } from "@/lib/validation";
import { updateProject, deleteProject } from "@/lib/services/project.service";
import { handleApiError } from "@/lib/error-handler";

/**
 * PUT - Atualizar um projeto
 */
export async function PUT(
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

    // Validar status se fornecido
    if (body.status) {
      const statusValidation = validateProjectStatus(body.status);
      if (!statusValidation.valid) {
        return NextResponse.json(
          { error: statusValidation.error },
          { status: 400 }
        );
      }
    }

    // Atualizar projeto
    const updatedProject = await updateProject(projectId, auth.userId!, {
      tool: body.tool,
      phoneNumber: body.number,
      prompt: body.prompt,
      status: body.status,
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return handleApiError(error, "update project");
  }
}

/**
 * DELETE - Deletar um projeto
 */
export async function DELETE(
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

    // Deletar projeto
    await deleteProject(projectId, auth.userId!);

    return NextResponse.json(
      { message: "Projeto deletado com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, "delete project");
  }
}
