// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { createUser } from "@/lib/services/auth.service";
import { validateRegisterData } from "@/lib/validation";
import { handleApiError } from "@/lib/error-handler";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação dos dados
    const validation = validateRegisterData(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Criação do usuário
    const newUser = await createUser(body.name, body.email, body.password);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return handleApiError(error, "register");
  }
}
