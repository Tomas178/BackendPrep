import { NextResponse } from 'next/server';
import type { StatusCodes } from 'http-status-codes';

export function errorResponse(error: string, status: StatusCodes) {
  return NextResponse.json({ error }, { status });
}
