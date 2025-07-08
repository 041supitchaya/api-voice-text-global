"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, Volume2, Loader2 } from "lucide-react"

interface SampleVoicePlayerProps {
  speakers: Array<{
    id: string
    name: string
    description: string
    sampleText: string
  }>
  onSpeakerSelect: (speakerId: string) => void
  selectedSpeaker: string
}

export default function SampleVoicePlayer({ speakers, onSpeakerSelect, selectedSpeaker }: SampleVoicePlayerProps) {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

  const handlePlaySample = async (speaker: any) => {
    // หยุดเสียงเดิมถ้ามี
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setPlayingId(null)
    }

    setLoadingId(speaker.id)

    try {
      const response = await fetch("/api/sample-voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: speaker.sampleText,
          speaker: speaker.id,
          speed: 1.0,
          volume: 1.0,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate sample")
      }

      const data = await response.json()

      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl)
        setCurrentAudio(audio)
        setPlayingId(speaker.id)

        audio.onended = () => {
          setPlayingId(null)
          setCurrentAudio(null)
        }

        audio.play().catch(console.error)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("ไม่สามารถเล่นเสียงตัวอย่างได้")
    } finally {
      setLoadingId(null)
    }
  }

  const handlePause = () => {
    if (currentAudio) {
      currentAudio.pause()
      setPlayingId(null)
      setCurrentAudio(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-blue-600" />
          ทดสอบเสียงตัวอย่าง
        </CardTitle>
        <CardDescription>คลิกเพื่อฟังเสียงตัวอย่างของแต่ละโทนเสียง</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className={`p-4 border rounded-lg transition-all cursor-pointer ${
                selectedSpeaker === speaker.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onSpeakerSelect(speaker.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{speaker.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{speaker.description}</p>
                  <p className="text-xs text-gray-400 mt-2 italic">"{speaker.sampleText}"</p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 h-8 w-8 p-0 bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (playingId === speaker.id) {
                      handlePause()
                    } else {
                      handlePlaySample(speaker)
                    }
                  }}
                  disabled={loadingId === speaker.id}
                >
                  {loadingId === speaker.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : playingId === speaker.id ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
