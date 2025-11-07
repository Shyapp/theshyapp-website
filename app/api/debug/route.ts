import { NextResponse } from "next/server";

export async function GET() {
  const hasKey = !!(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY);
  const keyPrefix = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || '').substring(0, 10);
  
  return NextResponse.json({
    hasGoogleMapsKey: hasKey,
    keyPrefix: keyPrefix || 'NO KEY',
    envVars: {
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'SET' : 'NOT SET',
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY ? 'SET' : 'NOT SET',
    }
  });
}
