// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // AQUI ESTÁ O INSERT CORRETO PARA REGISTRO
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name",
      [name, email, passwordHash]
    );

    const newUser = result.rows[0];

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Este e-mail já está em uso." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Erro interno ao registrar o usuário." },
      { status: 500 }
    );
  }
}
