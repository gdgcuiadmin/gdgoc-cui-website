import { NextRequest, NextResponse } from "next/server";

// Proxy route to fetch PDF templates from Cloudinary (avoids browser CORS issues)
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      redirect: "follow",
    });

    if (!response.ok) {
      console.error(
        `Template fetch failed: ${response.status} ${response.statusText} for URL: ${url}`
      );
      return NextResponse.json(
        { error: `Template fetch failed: ${response.status}` },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Template proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch template" },
      { status: 500 }
    );
  }
}
