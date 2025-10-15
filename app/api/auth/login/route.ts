// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/services/auth.service";
import { validateLoginData } from "@/lib/validation";
import { handleApiError } from "@/lib/error-handler";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação dos dados
    const validation = validateLoginData(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Autenticação
    const result = await authenticateUser(body.email, body.password);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleApiError(error, "login");
  }
}
