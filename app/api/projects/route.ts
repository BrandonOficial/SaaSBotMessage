// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-middleware";
import { validateProjectData } from "@/lib/validation";
import {
  createProject,
  getProjectsByUserId,
} from "@/lib/services/project.service";
import { handleApiError } from "@/lib/error-handler";

/**
 * POST - Criar um novo projeto
 */
export async function POST(request: Request) {
  try {
    // Autenticação
    const auth = await authenticateRequest(request);
    if (!auth.success) {
      return auth.error!;
    }

    const body = await request.json();

    // Validação
    const validation = validateProjectData(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Criação do projeto
    const newProject = await createProject(auth.userId!, {
      tool: body.tool,
      phoneNumber: body.number,
      prompt: body.prompt,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return handleApiError(error, "create project");
  }
}

/**
 * GET - Buscar todos os projetos do usuário
 */
export async function GET(request: Request) {
  try {
    // Autenticação
    const auth = await authenticateRequest(request);
    if (!auth.success) {
      return auth.error!;
    }

    // Buscar projetos
    const projects = await getProjectsByUserId(auth.userId!);

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return handleApiError(error, "get projects");
  }
}
