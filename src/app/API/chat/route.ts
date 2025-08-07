import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.BACKEND_API_URL || "http://localhost:3000/api";

export async function POST(request: NextRequest) {
  // console.log("Chat API route called");

  try {
    const body = await request.json();
    // console.log("API Route - Request body:", body);
    // console.log("API Route - Sending request to:", `${API_BASE_URL}/chat`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    // console.log("API Route - Backend response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      // console.log("API Route - Error response body:", errorText);
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text();
      // console.log(
      //   "API Route - Non-JSON response:",
      //   responseText.substring(0, 200)
      // );
      throw new Error("Backend did not return JSON");
    }

    const data = await response.json();
    // console.log("API Route - Backend response data:", data);

    return NextResponse.json(data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API Route - Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          message: `Backend connection failed: ${error.message}`,
          details:
            error.name === "AbortError" ? "Request timed out" : error.message,
        },
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
