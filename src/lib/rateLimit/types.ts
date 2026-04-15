import { NextRequest, NextResponse } from 'next/server';

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetSec: number;
};

export type EnforceArgs = {
  req: NextRequest;
  pathname?: string;
  identifier: string;
};

export type EnforceResultSuccess = {
  ok: true;
  result: RateLimitResult;
};

export type EnforceResultFailure = {
  ok: false;
  response: NextResponse;
};

export type EnforceResult = EnforceResultSuccess | EnforceResultFailure;
