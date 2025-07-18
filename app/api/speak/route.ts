//  สร้างเสียงจากข้อความ 
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    //  เป็นคำสั่งที่ใช้ใน Next.js เพื่อแปลง body ของ HTTP request ให้กลายเป็น JavaScript object
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

      // เรียก API generate_audio ของ Botnoi
      body: JSON.stringify({
        text, //ข้อความที่ต้องการพูด
        speaker, //รหัสเสียง
        volume,
        speed, //การตั้งค่าระดับเสียงและความเร็ว
        type_media: "m4a",
        save_file: "true",
        language, //ภาษาของเสียงพูด 
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Botnoi API error: ${response.status} - ${errorText}`)
      throw new Error(`Botnoi API error: ${response.status}`)
    }

    const data = await response.json()

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
        error: "Failed to generate speech",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

