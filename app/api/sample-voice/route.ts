import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, speaker = "1", speed = 1.0, volume = 1.0, language = "th" } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required and must be a string" }, { status: 400 })
    }

    // ใส่ API key ของ botnoi (ถ้า points หมด api จะใช้ไม่ได้)
    const API_KEY = "VTgzYTYwOTE1ZmNiOTQ4ZTZhYWJiOTA4ODcyOWUxMzFkNTYxODk0"

    const response = await fetch("https://api-voice.botnoi.ai/openapi/v1/generate_audio", {
      method: "POST",
      headers: {
        "Botnoi-Token": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        speaker,
        volume,
        speed,
        type_media: "m4a",
        save_file: "true",
        language,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Botnoi API error: ${response.status} - ${errorText}`)
      throw new Error(`Botnoi API error: ${response.status}`)
    }

    const data = await response.json()

    // รองรับหลายๆ รูปแบบ URL จาก API
    const audioUrl = data.audio_url || data.url || data.file_url || (data.data?.audio_url ?? null)

    if (!audioUrl) {
      return NextResponse.json({ error: "No audio URL returned from API" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      audioUrl,
      data,
      settings: { speaker, speed, volume, language },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate sample voice",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
