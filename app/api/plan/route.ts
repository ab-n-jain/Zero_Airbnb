import { NextResponse } from "next/server";
import { brokenReply } from "@/lib/brokenReply";
import { sampleReply } from "@/lib/sampleReply";

const MOCK_DELAY_MS = 1800;

// Mock planner: waits, then returns the same sample reply for any message.
// With "forceFail": true it returns the broken answer instead.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return NextResponse.json(body?.forceFail === true ? brokenReply : sampleReply);
}
