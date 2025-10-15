// lib/services/project.service.ts
import pool from "@/lib/db";
import { ApiError } from "@/lib/error-handler";

export interface Project {
  id: number;
  user_id: number;
  tool: string;
  phone_number?: string;
  prompt: string;
  status: string;
  created_at: Date;
  updated_at?: Date;
}

export interface CreateProjectData {
  tool: string;
  phoneNumber?: string;
  prompt: string;
}

export interface UpdateProjectData {
  tool?: string;
  phoneNumber?: string;
  prompt?: string;
  status?: string;
}

/**
 * Cria um novo projeto
 */
export async function createProject(
  userId: number,
  data: CreateProjectData
): Promise<Project> {
  const result = await pool.query(
    "INSERT INTO projects (user_id, tool, phone_number, prompt, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, data.tool, data.phoneNumber, data.prompt, "pendente"]
  );

  return result.rows[0];
}

/**
 * Busca todos os projetos de um usuário
 */
export async function getProjectsByUserId(userId: number): Promise<Project[]> {
  const result = await pool.query(
    "SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );

  return result.rows;
}

/**
 * Busca um projeto específico verificando permissão do usuário
 */
export async function getProjectByIdAndUserId(
  projectId: string,
  userId: number
): Promise<Project | null> {
  const result = await pool.query(
    "SELECT * FROM projects WHERE id = $1 AND user_id = $2",
    [projectId, userId]
  );

  return result.rows[0] || null;
}

/**
 * Atualiza um projeto
 */
export async function updateProject(
  projectId: string,
  userId: number,
  data: UpdateProjectData
): Promise<Project> {
  const project = await getProjectByIdAndUserId(projectId, userId);

  if (!project) {
    throw new ApiError(
      404,
      "Projeto não encontrado ou você não tem permissão para editá-lo."
    );
  }

  // Construir query dinamicamente apenas com campos fornecidos
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.tool !== undefined) {
    updates.push(`tool = $${paramCount++}`);
    values.push(data.tool);
  }

  if (data.phoneNumber !== undefined) {
    updates.push(`phone_number = $${paramCount++}`);
    values.push(data.phoneNumber);
  }

  if (data.prompt !== undefined) {
    updates.push(`prompt = $${paramCount++}`);
    values.push(data.prompt);
  }

  if (data.status !== undefined) {
    updates.push(`status = $${paramCount++}`);
    values.push(data.status);
  }

  // Sempre atualiza o timestamp
  updates.push(`updated_at = CURRENT_TIMESTAMP`);

  values.push(projectId, userId);

  const query = `
    UPDATE projects 
    SET ${updates.join(", ")} 
    WHERE id = $${paramCount++} AND user_id = $${paramCount++} 
    RETURNING *
  `;

  const result = await pool.query(query, values);

  return result.rows[0];
}

/**
 * Atualiza apenas o status de um projeto
 */
export async function updateProjectStatus(
  projectId: string,
  userId: number,
  status: string
): Promise<Project> {
  const project = await getProjectByIdAndUserId(projectId, userId);

  if (!project) {
    throw new ApiError(
      404,
      "Projeto não encontrado ou você não tem permissão para editá-lo."
    );
  }

  const result = await pool.query(
    "UPDATE projects SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *",
    [status, projectId, userId]
  );

  return result.rows[0];
}

/**
 * Deleta um projeto
 */
export async function deleteProject(
  projectId: string,
  userId: number
): Promise<void> {
  const result = await pool.query(
    "DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *",
    [projectId, userId]
  );

  if (result.rowCount === 0) {
    throw new ApiError(
      404,
      "Projeto não encontrado ou você não tem permissão para deletá-lo."
    );
  }
}
