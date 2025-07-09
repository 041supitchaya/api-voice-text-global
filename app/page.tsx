"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Volume2,
  Loader2,
  MessageSquare,
  Play,
  Pause,
  User,
  History,
  BookOpen,
  AlertCircle,
  FileText,
  Trash2,
  Globe,
} from "lucide-react"
import VoiceSettings from "@/components/voice-settings"
import UserProfile from "@/components/user-profile"
import VoiceHistory from "@/components/voice-history"
import AddBookForm from "@/components/add-book-form"

interface BookType {
  id: string
  title: string
  url?: string
  content?: string
  description: string
  type: "url" | "text"
  category: string
  language: string
}

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

interface UserProfileData {
  name: string
  email: string
  favoriteVoice: string
  preferredLanguage: string
  profileImage?: string
  favoriteBooks: string[]
  createdAt: number
}

const defaultBooks: BookType[] = [
  {
    id: "default_1",
    title: "นิทานอีสป_ดาวลูกไก่",
    url: "https://www.kalyanamitra.org/th/Aesop_detail.php?page=4010",
    description: "เรื่องราวของดาวลูกไก่",
    type: "url",
    category: "นิทาน",
    language: "th",
  },
  {
    id: "default_2",
    title: "นิทานพื้นบ้านไทย - นางสีดา",
    url: "https://th.wikipedia.org/wiki/นางสีดา",
    description: "เรื่องราวของนางสีดาในรามเกียรติ์",
    type: "url",
    category: "นิทาน",
    language: "th",
  },
  
]

const languages = [
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
]

export default function TextToSpeechApp() {
  const [activeTab, setActiveTab] = useState("text")
  const [text, setText] = useState("")
  const [selectedBook, setSelectedBook] = useState<string>("")
  const [bookContent, setBookContent] = useState<string>("")
  const [availableBooks, setAvailableBooks] = useState<BookType[]>(defaultBooks)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingBook, setIsLoadingBook] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [speed, setSpeed] = useState(1.0)
  const [volume, setVolume] = useState(1.0)
  const [speaker, setSpeaker] = useState("1")
  const [language, setLanguage] = useState("th")
  const [error, setError] = useState<string | null>(null)

  const [sampleAudioUrl, setSampleAudioUrl] = useState<string | null>(null)
  const [isLoadingSample, setIsLoadingSample] = useState<string | null>(null)
  const [sampleAudio, setSampleAudio] = useState<HTMLAudioElement | null>(null)

  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null)
  const [voiceHistory, setVoiceHistory] = useState<VoiceHistoryItem[]>([])

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string>("all")

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("userProfile")
      const savedHistory = localStorage.getItem("voiceHistory")
      const savedBooks = localStorage.getItem("customBooks")
      const deletedDefaults = localStorage.getItem("deletedDefaultBooks")

      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile))
      }

      if (savedHistory) {
        setVoiceHistory(JSON.parse(savedHistory))
      }

      // Load books
      let booksToShow = [...defaultBooks]

      // Remove deleted default books
      if (deletedDefaults) {
        const deletedIds = JSON.parse(deletedDefaults)
        booksToShow = booksToShow.filter((book) => !deletedIds.includes(book.id))
      }

      // Add custom books
      if (savedBooks) {
        const customBooks = JSON.parse(savedBooks)
        booksToShow = [...booksToShow, ...customBooks]
      }

      setAvailableBooks(booksToShow)
    } catch (error) {
      console.error("Error loading saved data:", error)
    }
  }, [])

  const saveToHistory = (text: string, type: "text" | "book", bookTitle?: string) => {
    try {
      const historyItem: VoiceHistoryItem = {
        id: Date.now().toString(),
        text: text.substring(0, 100) + (text.length > 100 ? "..." : ""),
        timestamp: Date.now(),
        speaker,
        speed,
        volume,
        language,
        type,
        bookTitle,
      }

      const newHistory = [historyItem, ...voiceHistory].slice(0, 50)
      setVoiceHistory(newHistory)
      localStorage.setItem("voiceHistory", JSON.stringify(newHistory))
    } catch (error) {
      console.error("Error saving to history:", error)
    }
  }

  const handlePlaySample = async (speakerId: string, speakerName: string) => {
    setIsLoadingSample(speakerId)
    setError(null)

    if (sampleAudio) {
      sampleAudio.pause()
      setSampleAudio(null)
    }

// ตั้งค่าคำพูดทดลอง
    try {
      const sampleTexts = {
        th: `สวัสดีฉันคือ${speakerName} ยินดีที่ได้รู้จัก`,
        en: `Hello, I'm ${speakerName}. Nice to meet you.`,
        zh: `你好，我是${speakerName}，很高兴认识你。`,
        ja: `こんにちは、私は${speakerName}です。よろしくお願いします。`,
        // ko: `안녕하세요, 저는 ${speakerName}입니다. 만나서 반갑습니다.`,
      }

      const response = await fetch("/api/sample-voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sampleTexts[language as keyof typeof sampleTexts] || sampleTexts.th,
          speaker: speakerId,
          speed: 1.0,
          volume: 1.0,
          language: language,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (data.audioUrl) {
        setSampleAudioUrl(data.audioUrl)
        const audio = new Audio(data.audioUrl)
        setSampleAudio(audio)

        audio.onerror = () => {
          setError("ไม่สามารถเล่นไฟล์เสียงได้")
        }

        audio.play().catch((error) => {
          console.error("Error playing audio:", error)
          setError("ไม่สามารถเล่นเสียงได้")
        })
      } else {
        throw new Error("ไม่ได้รับ URL ของไฟล์เสียง")
      }
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "ไม่สามารถเล่นเสียงตัวอย่างได้")
    } finally {
      setIsLoadingSample(null)
    }
  }

  const handleSpeak = async (
    textToSpeak: string,
    type: "text" | "book" = "text",
    bookTitle?: string,
    bookLanguage?: string,
  ) => {
    if (!textToSpeak.trim()) {
      setError("กรุณาใส่ข้อความที่ต้องการให้อ่าน")
      return
    }

    setIsLoading(true)
    setAudioUrl(null)
    setError(null)

    try {
      const response = await fetch("/api/speak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textToSpeak,
          speed: speed,
          volume: volume,
          speaker: speaker,
          language: bookLanguage || language, // ใช้ภาษาของหนังสือถ้ามี
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (data.audioUrl) {
        setAudioUrl(data.audioUrl)
        const audio = new Audio(data.audioUrl)
        setCurrentAudio(audio)

        audio.onerror = () => {
          setError("ไม่สามารถเล่นไฟล์เสียงได้")
        }

        audio.play().catch((error) => {
          console.error("Error playing audio:", error)
          setError("ไม่สามารถเล่นเสียงได้")
        })

        setIsPlaying(true)

        audio.onended = () => {
          setIsPlaying(false)
        }

        // Save to history
        saveToHistory(textToSpeak, type, bookTitle)
      } else {
        throw new Error("ไม่ได้รับ URL ของไฟล์เสียง")
      }
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "ไม่สามารถสร้างเสียงได้")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadBook = async () => {
    if (!selectedBook) {
      setError("กรุณาเลือกหนังสือที่ต้องการอ่าน")
      return
    }

    const book = availableBooks.find((b) => b.id === selectedBook)
    if (!book) return

    // If it's a text-based book, use the content directly
    if (book.type === "text" && book.content) {
      setBookContent(book.content)
      return
    }

    // If it's a URL-based book, fetch the content
    if (book.type === "url" && book.url) {
      setIsLoadingBook(true)
      setBookContent("")
      setError(null)

      try {
        const response = await fetch("/api/fetch-book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: book.url }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }

        setBookContent(data.content)
      } catch (error) {
        console.error("Error:", error)
        setError(error instanceof Error ? error.message : "ไม่สามารถโหลดเนื้อหาหนังสือได้")
      } finally {
        setIsLoadingBook(false)
      }
    }
  }

  const handleDeleteBook = (bookId: string) => {
    if (confirm("คุณต้องการลบหนังสือนี้หรือไม่?")) {
      try {
        const updatedBooks = availableBooks.filter((book) => book.id !== bookId)
        setAvailableBooks(updatedBooks)

        // Update localStorage - save all books except the deleted one
        const customBooks = updatedBooks.filter((book) => !book.id.startsWith("default_"))
        localStorage.setItem("customBooks", JSON.stringify(customBooks))

        // Also save which default books were deleted
        const deletedDefaults = defaultBooks
          .filter((book) => !updatedBooks.find((b) => b.id === book.id))
          .map((b) => b.id)
        localStorage.setItem("deletedDefaultBooks", JSON.stringify(deletedDefaults))

        // Reset selection if deleted book was selected
        if (selectedBook === bookId) {
          setSelectedBook("")
          setBookContent("")
        }
      } catch (error) {
        console.error("Error deleting book:", error)
        setError("ไม่สามารถลบหนังสือได้")
      }
    }
  }

  const handleAddBook = (newBook: BookType) => {
    try {
      const updatedBooks = [...availableBooks, newBook]
      setAvailableBooks(updatedBooks)

      // Save custom books to localStorage
      const customBooks = updatedBooks.filter((book) => !defaultBooks.find((db) => db.id === book.id))
      localStorage.setItem("customBooks", JSON.stringify(customBooks))
    } catch (error) {
      console.error("Error adding book:", error)
      setError("ไม่สามารถเพิ่มหนังสือได้")
    }
  }

  const handleDeleteHistory = (id: string) => {
    try {
      const newHistory = voiceHistory.filter((item) => item.id !== id)
      setVoiceHistory(newHistory)
      localStorage.setItem("voiceHistory", JSON.stringify(newHistory))
    } catch (error) {
      console.error("Error deleting history:", error)
      setError("ไม่สามารถลบประวัติได้")
    }
  }

  const handleClearAllHistory = () => {
    try {
      setVoiceHistory([])
      localStorage.removeItem("voiceHistory")
    } catch (error) {
      console.error("Error clearing history:", error)
      setError("ไม่สามารถลบประวัติทั้งหมดได้")
    }
  }

  const togglePlayPause = () => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause()
        setIsPlaying(false)
      } else {
        currentAudio.play().catch((error) => {
          console.error("Error playing audio:", error)
          setError("ไม่สามารถเล่นเสียงได้")
        })
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <Volume2 className="h-8 w-8 text-blue-600" />
              แอปอ่านข้อความและหนังสือ
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              ใส่ข้อความภาษาอะไรก็ได้ เพื่อให้อ่านออกเสียงด้วย Botnoi Voice API รองรับภาษาผสมในประโยคเดียวกัน
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setError(null)}
                  className="ml-auto h-6 w-6 p-0 text-red-700 hover:bg-red-100"
                >
                  ×
                </Button>
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  อ่านข้อความ
                </TabsTrigger>
                <TabsTrigger value="book" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  อ่านหนังสือ
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  โปรไฟล์
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  ประวัติ
                </TabsTrigger>
                <TabsTrigger value="manage" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  จัดการหนังสือ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-6 mt-6">
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">เลือกภาษาหลักสำหรับอ่านออกเสียง:</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue placeholder="เลือกภาษา..." />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    💡 สามารถใส่ข้อความผสมระหว่างภาษาไทยกับภาษาอังกฤษได้
                  </p>
                </div>

                <VoiceSettings
                  speed={speed}
                  volume={volume}
                  speaker={speaker}
                  language={language}
                  onSpeedChange={setSpeed}
                  onVolumeChange={setVolume}
                  onSpeakerChange={setSpeaker}
                  onPlaySample={handlePlaySample}
                  isLoadingSample={isLoadingSample}
                />

                {/* Multi-language Support Info */}
                <Card className="border-2 border-dashed border-green-200 bg-green-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Globe className="h-5 w-5 text-green-600" />
                      รองรับหลายภาษา
                    </CardTitle>
                    <CardDescription>ใส่ข้อความภาษาอะไรก็ได้ ระบบจะอ่านออกเสียงให้อัตโนมัติ</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-800">🌍 ภาษาที่รองรับ:</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span>🇹🇭</span>
                            <span>ไทย - สวัสดีครับ</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>🇺🇸</span>
                            <span>English - Hello World</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>🇨🇳</span>
                            <span>中文 - 你好世界</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>🇯🇵</span>
                            <span>日本語 - こんにちは</span>
                          </div>
                          {/* <div className="flex items-center gap-2">
                            <span>🇰🇷</span>
                            <span>한국어 - 안녕하세요</span>
                          </div> */}
                        </div>
                      </div>
                      {/* <div className="space-y-2">
                        <h4 className="font-medium text-green-800">✨ ตัวอย่างภาษาผสม:</h4>
                        <div className="space-y-1 text-gray-600">
                          <p>"สวัสดี Hello 你好"</p>
                          <p>"I love กิน sushi 寿司"</p>
                          <p>"Today วันนี้ is beautiful"</p>
                          <p>"Thank you ขอบคุณ 谢谢"</p>
                        </div>
                      </div> */}
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded-lg">
                      {/* <p className="text-sm text-green-800">
                        <strong>💡 เคล็ดลับ:</strong> เลือกภาษาหลักที่ใช้มากที่สุดในข้อความ ระบบจะปรับการออกเสียงให้เหมาะสมโดยอัตโนมัติ
                      </p> */}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="space-y-2">
                    {/* <label htmlFor="text-input" className="text-sm font-medium text-gray-700">
                      ใส่ข้อความที่ต้องการให้อ่าน (รองรับหลายภาษา):
                    </label> */}
                    <Textarea
                      id="text-input"
                      // placeholder="พิมพ์ข้อความที่นี่... สามารถใส่หลายภาษาผสมกันได้ เช่น สวัสดี Hello 你好 こんにちは 안녕하세요"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[120px] resize-none"
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500">
                      รองรับ: ไทย, English, 中文, 日本語
                    </p>
                  </div>

                  <Button
                    onClick={() => handleSpeak(text, "text")}
                    disabled={isLoading || !text.trim()}
                    className="w-full h-12 text-lg font-semibold"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        กำลังสร้างเสียง...
                      </>
                    ) : (
                      <>
                        <Volume2 className="mr-2 h-5 w-5" />
                        อ่านข้อความออกเสียง
                      </>
                    )}
                  </Button>
                </div>

                {audioUrl && (
                  <div className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700">เสียงที่สร้างแล้ว:</h3>
                      <Button
                        onClick={togglePlayPause}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 bg-transparent"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="h-4 w-4" />
                            หยุด
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            เล่น
                          </>
                        )}
                      </Button>
                    </div>
                    <audio controls src={audioUrl} className="w-full" preload="auto">
                      เบราว์เซอร์ของคุณไม่รองรับการเล่นเสียง
                    </audio>
                    <p className="text-xs text-gray-500">เสียงจะเล่นอัตโนมัติเมื่อสร้างเสร็จ</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="book" className="space-y-6 mt-6">
                <VoiceSettings
                  speed={speed}
                  volume={volume}
                  speaker={speaker}
                  language={language}
                  onSpeedChange={setSpeed}
                  onVolumeChange={setVolume}
                  onSpeakerChange={setSpeaker}
                  onPlaySample={handlePlaySample}
                  isLoadingSample={isLoadingSample}
                />

                {/* Book Filtering */}
                <Card className="border-2 border-dashed border-purple-200 bg-purple-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                      เลือกหนังสือตามหมวดหมู่
                    </CardTitle>
                    <CardDescription>กรองหนังสือตามประเภทและภาษาที่ต้องการ</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ประเภทหนังสือ:</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภท..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">ทุกประเภท</SelectItem>
                            {Array.from(new Set(availableBooks.map((book) => book.category))).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ภาษา:</label>
                        <Select value={selectedLanguageFilter} onValueChange={setSelectedLanguageFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกภาษา..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">ทุกภาษา</SelectItem>
                            {languages.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                <div className="flex items-center gap-2">
                                  <span>{lang.flag}</span>
                                  <span>{lang.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">เลือกหนังสือที่ต้องการอ่าน:</label>
                    <div className="flex gap-2">
                      <Select value={selectedBook} onValueChange={setSelectedBook}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="เลือกหนังสือ..." />
                        </SelectTrigger>
                        <SelectContent>
                          {availableBooks
                            .filter(
                              (book) =>
                                (selectedCategory === "all" || book.category === selectedCategory) &&
                                (selectedLanguageFilter === "all" || book.language === selectedLanguageFilter),
                            )
                            .map((book) => (
                              <SelectItem key={book.id} value={book.id}>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{book.title}</span>
                                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                      {book.type === "url" ? "เว็บไซต์" : "ข้อความ"}
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                                      {book.category}
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
                                      {languages.find((l) => l.code === book.language)?.flag}{" "}
                                      {languages.find((l) => l.code === book.language)?.name}
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">{book.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      {selectedBook && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBook(selectedBook)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      แสดง{" "}
                      {
                        availableBooks.filter(
                          (book) =>
                            (selectedCategory === "all" || book.category === selectedCategory) &&
                            (selectedLanguageFilter === "all" || book.language === selectedLanguageFilter),
                        ).length
                      }{" "}
                      หนังสือจากทั้งหมด {availableBooks.length} เล่ม
                    </p>
                  </div>

                  <Button
                    onClick={handleLoadBook}
                    disabled={isLoadingBook || !selectedBook}
                    className="w-full bg-transparent"
                    variant="outline"
                  >
                    {isLoadingBook ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        กำลังโหลดเนื้อหา...
                      </>
                    ) : (
                      <>
                        <BookOpen className="mr-2 h-4 w-4" />
                        โหลดเนื้อหาหนังสือ
                      </>
                    )}
                  </Button>

                  {bookContent && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">เนื้อหาหนังสือ:</label>
                        <Textarea
                          value={bookContent}
                          onChange={(e) => setBookContent(e.target.value)}
                          className="min-h-[200px] resize-none"
                          placeholder="เนื้อหาหนังสือจะแสดงที่นี่..."
                        />
                        <p className="text-xs text-gray-500">สามารถแก้ไขเนื้อหาได้</p>
                      </div>

                      <Button
                        onClick={() => {
                          const book = availableBooks.find((b) => b.id === selectedBook)
                          // ใช้ภาษาของหนังสือที่เลือก
                          const bookLanguage = book?.language || language
                          handleSpeak(bookContent, "book", book?.title, bookLanguage)
                        }}
                        disabled={isLoading || !bookContent.trim()}
                        className="w-full h-12 text-lg font-semibold"
                        size="lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            กำลังสร้างเสียง...
                          </>
                        ) : (
                          <>
                            <Volume2 className="mr-2 h-5 w-5" />
                            อ่านหนังสือออกเสียง
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {audioUrl && (
                  <div className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700">เสียงที่สร้างแล้ว:</h3>
                      <Button
                        onClick={togglePlayPause}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 bg-transparent"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="h-4 w-4" />
                            หยุด
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            เล่น
                          </>
                        )}
                      </Button>
                    </div>
                    <audio controls src={audioUrl} className="w-full" preload="auto">
                      เบราว์เซอร์ของคุณไม่รองรับการเล่นเสียง
                    </audio>
                    <p className="text-xs text-gray-500">เสียงจะเล่นอัตโนมัติเมื่อสร้างเสร็จ</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <UserProfile
                  userProfile={userProfile}
                  availableBooks={availableBooks}
                  onUpdateProfile={(profile) => {
                    setUserProfile(profile)
                    try {
                      localStorage.setItem("userProfile", JSON.stringify(profile))
                    } catch (error) {
                      console.error("Error saving profile:", error)
                      setError("ไม่สามารถบันทึกโปรไฟล์ได้")
                    }
                  }}
                />
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <VoiceHistory
                  history={voiceHistory}
                  onDeleteItem={handleDeleteHistory}
                  onClearAll={handleClearAllHistory}
                  onReplay={(item) => {
                    setSpeaker(item.speaker)
                    setSpeed(item.speed)
                    setVolume(item.volume)
                    setLanguage(item.language)
                    setText(item.text)
                    setActiveTab("text")
                  }}
                />
              </TabsContent>

              <TabsContent value="manage" className="mt-6">
                <AddBookForm onAddBook={handleAddBook} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>ขับเคลื่อนโดย Botnoi Voice API</p>
          <p className="mt-1">รองรับการอ่านหลายภาษาและภาษาผสมในประโยคเดียวกัน</p>
        </div>
      </div>
    </div>
  )
}
