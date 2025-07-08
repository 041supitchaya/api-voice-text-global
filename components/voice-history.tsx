"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, Trash2, RotateCcw, MessageSquare, BookOpen, Calendar } from "lucide-react"

interface VoiceHistoryItem {
  id: string
  text: string
  timestamp: number
  speaker: string
  speed: number
  volume: number
  language: string
  type: "text" | "book"
  bookTitle?: string
}

interface VoiceHistoryProps {
  history: VoiceHistoryItem[]
  onDeleteItem: (id: string) => void
  onClearAll: () => void
  onReplay: (item: VoiceHistoryItem) => void
}

const voiceNames = {
  "1": "อวา (วัยรุ่น)",
  "2": "โบ (วัยเด็ก)",
  "3": "คุณงาม (วัยผู้ใหญ่)",
  "4": "แม็กซ์ (ผู้ชาย)",
  "5": "อลัน (ผู้ชาย)",
  "6": "ไซเรน (วัยรุ่น)",
  "7": "อลิสา (วัยรุ่น)",
  "8": "เลโอ (ผู้ชาย)",
  "9": "นาเดียร์ (วัยรุ่น)",
  "11": "วนิลา (วัยรุ่น)",
  "13": "อนันดา (วัยเด็ก)",
  "14": "ไอลีน (วัยรุ่น)",
  "15": "ฮิโระ (วัยรุ่น)",
  "16": "ครูดีดี๊ (วัยผู้ใหญ่)",
  "17": "เจ้าเนิร์ด (วัยรุ่น)",
}

const languageNames = {
  th: "ไทย",
  en: "English",
  zh: "中文",
  ja: "日本語",
  // ko: "한국어",
}

export default function VoiceHistory({ history, onDeleteItem, onClearAll, onReplay }: VoiceHistoryProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60)
      return `${diffInMinutes} นาทีที่แล้ว`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} ชั่วโมงที่แล้ว`
    } else {
      return date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-blue-600" />
                ประวัติการใช้เสียง
              </CardTitle>
              <CardDescription>ดูประวัติการใช้งานและเล่นซ้ำได้ (เก็บไว้ล่าสุด 50 รายการ)</CardDescription>
            </div>
            {history.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm("คุณต้องการลบประวัติทั้งหมดหรือไม่?")) {
                    onClearAll()
                  }
                }}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                ลบทั้งหมด
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-8">
              <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีประวัติการใช้งาน</h3>
              <p className="text-gray-500">เมื่อคุณใช้งานแอปแล้ว ประวัติจะแสดงที่นี่</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <Card key={item.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {item.type === "book" ? (
                            <BookOpen className="h-4 w-4 text-green-600" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          )}
                          <Badge variant={item.type === "book" ? "default" : "secondary"}>
                            {item.type === "book" ? "หนังสือ" : "ข้อความ"}
                          </Badge>
                          {item.bookTitle && (
                            <Badge variant="outline" className="text-xs">
                              {item.bookTitle}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-gray-800 mb-3 line-clamp-2">{item.text}</p>

                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.timestamp)}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {voiceNames[item.speaker as keyof typeof voiceNames]}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {languageNames[item.language as keyof typeof languageNames]}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            ความเร็ว {item.speed}x
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            เสียง {Math.round(item.volume * 100)}%
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => onReplay(item)} className="bg-transparent">
                          <RotateCcw className="h-4 w-4 mr-1" />
                          เล่นซ้ำ
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (confirm("คุณต้องการลบรายการนี้หรือไม่?")) {
                              onDeleteItem(item.id)
                            }
                          }}
                          className="text-red-600 hover:text-red-700 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
