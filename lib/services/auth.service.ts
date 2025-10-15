// lib/services/auth.service.ts
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "@/lib/error-handler";

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = "24h";

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

/**
 * Cria um novo usuário no banco de dados
 */
export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<UserResponse> {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await pool.query(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name",
    [name, email, passwordHash]
  );

  return result.rows[0];
}

/**
 * Busca um usuário por email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0] || null;
}

/**
 * Verifica se a senha está correta
 */
export async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

/**
 * Gera um token JWT para o usuário
 */
export function generateToken(userId: number, email: string): string {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET!, {
    expiresIn: TOKEN_EXPIRY,
  });
}

/**
 * Autentica um usuário e retorna token
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Credenciais inválidas.");
  }

  const isPasswordValid = await verifyPassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw new ApiError(401, "Credenciais inválidas.");
  }

  const token = generateToken(user.id, user.email);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
