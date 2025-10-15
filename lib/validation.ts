// lib/validation.ts

/**
 * Valida se um email tem formato válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida se uma senha atende aos requisitos mínimos
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Valida os dados de registro de usuário
 */
export function validateRegisterData(data: {
  name?: string;
  email?: string;
  password?: string;
}): { valid: boolean; error?: string } {
  if (!data.name || !data.email || !data.password) {
    return { valid: false, error: "Todos os campos são obrigatórios." };
  }

  if (data.name.trim().length < 2) {
    return { valid: false, error: "Nome deve ter pelo menos 2 caracteres." };
  }

  if (!isValidEmail(data.email)) {
    return { valid: false, error: "E-mail inválido." };
  }

  if (!isValidPassword(data.password)) {
    return { valid: false, error: "Senha deve ter pelo menos 6 caracteres." };
  }

  return { valid: true };
}

/**
 * Valida os dados de login
 */
export function validateLoginData(data: {
  email?: string;
  password?: string;
}): { valid: boolean; error?: string } {
  if (!data.email || !data.password) {
    return { valid: false, error: "E-mail e senha são obrigatórios." };
  }

  if (!isValidEmail(data.email)) {
    return { valid: false, error: "E-mail inválido." };
  }

  return { valid: true };
}

/**
 * Valida os dados de criação de projeto
 */
export function validateProjectData(data: { tool?: string; prompt?: string }): {
  valid: boolean;
  error?: string;
} {
  if (!data.tool || !data.prompt) {
    return { valid: false, error: "A ferramenta e o prompt são obrigatórios." };
  }

  if (data.prompt.trim().length < 10) {
    return {
      valid: false,
      error: "O prompt deve ter pelo menos 10 caracteres.",
    };
  }

  const validTools = ["whatsapp", "n8n", "make"];
  if (!validTools.includes(data.tool)) {
    return {
      valid: false,
      error: `Ferramenta inválida. Opções: ${validTools.join(", ")}`,
    };
  }

  return { valid: true };
}

/**
 * Valida status de projeto
 */
export function validateProjectStatus(status: string): {
  valid: boolean;
  error?: string;
} {
  const validStatuses = [
    "pendente",
    "em_andamento",
    "concluido",
    "cancelado",
    "erro",
  ];

  if (!validStatuses.includes(status)) {
    return {
      valid: false,
      error: `Status inválido. Valores aceitos: ${validStatuses.join(", ")}`,
    };
  }

  return { valid: true };
}
