import { NextResponse } from "next/server";
import { sampleReply } from "@/lib/sampleReply";

const MOCK_DELAY_MS = 1800;

// Mock planner: waits, then returns the same sample reply for any message.
export async function POST(request: Request) {
  await request.json().catch(() => null);
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return NextResponse.json(sampleReply);
}
