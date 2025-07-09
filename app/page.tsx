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
  Sparkles,
  ArrowRight,
  Mic,
  Star,
  Zap,
  Headphones,
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
  // { code: "ko", name: "한국어", flag: "🇰🇷" },
]

// Landing Page Component
function LandingPage({ onEnterApp }: { onEnterApp: () => void }) {
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      icon: <Volume2 className="h-8 w-8" />,
      title: "อ่านออกเสียงคุณภาพสูง",
      description: "เทคโนโลยี AI ล่าสุดจาก Botnoi",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "รองรับหลายภาษา",
      description: "ไทย, อังกฤษ (English), จีน (中文), ญี่ปุ่น (日本語)",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "จัดการหนังสือ",
      description: "เพิ่มและจัดหมวดหมู่หนังสือได้",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "ปรับแต่งเสียง",
      description: "เลือกโทนเสียง ความเร็ว และระดับเสียง",
      color: "from-orange-500 to-red-500",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-white">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
                <Volume2 className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Botnoi Voice
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">แอปอ่านข้อความและหนังสือ</p>
          <p className="text-lg text-gray-400">ขับเคลื่อนด้วย AI เทคโนโลยีล่าสุด</p>
        </div>

        {/* Features Showcase */}
        <div className="mb-12 w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-2xl backdrop-blur-sm border border-white/20 transition-all duration-500 ${
                  currentFeature === index ? "scale-105 shadow-2xl bg-white/10" : "hover:scale-105 hover:bg-white/5"
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12 text-center">
          <div className="animate-bounce-slow">
            <div className="text-3xl font-bold text-blue-400">15+</div>
            <div className="text-gray-300">โทนเสียง</div>
          </div>
          <div className="animate-bounce-slow animation-delay-1000">
            <div className="text-3xl font-bold text-purple-400">4</div>
            <div className="text-gray-300">ภาษา</div>
          </div>
          <div className="animate-bounce-slow animation-delay-2000">
            <div className="text-3xl font-bold text-pink-400">∞</div>
            <div className="text-gray-300">หนังสือ</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={onEnterApp}
            size="lg"
            className="relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 border-0 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group"
          >
            <span className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 group-hover:animate-spin" />
              เริ่มใช้งานเลย
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity -z-10"></div>
          </Button>
          <p className="text-gray-400 text-sm mt-4">ฟรี ไม่มีค่าใช้จ่าย</p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-1/4 animate-float">
          <Mic className="h-8 w-8 text-blue-400 opacity-60" />
        </div>
        <div className="absolute bottom-20 right-1/4 animate-float animation-delay-2000">
          <Star className="h-6 w-6 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute top-1/3 right-10 animate-float animation-delay-4000">
          <Zap className="h-7 w-7 text-purple-400 opacity-60" />
        </div>
      </div>
    </div>
  )
}

export default function TextToSpeechApp() {
  const [showLanding, setShowLanding] = useState(true)
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

// Show landing page first
  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-8 p-4">
        <Card className="shadow-2xl backdrop-blur-sm bg-white/90 border-0 hover-lift">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Volume2 className="h-8 w-8" />
              </div>
              แอปอ่านข้อความและหนังสือ
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg mt-2">
              ใส่ข้อความภาษาอะไรก็ได้ เพื่อให้อ่านออกเสียงด้วย Botnoi Voice API รองรับภาษาผสมในประโยคเดียวกัน
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 shadow-md animate-fade-in">
                <div className="p-1 bg-red-100 rounded-full">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <span className="text-sm flex-1">{error}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setError(null)}
                  className="h-8 w-8 p-0 text-red-700 hover:bg-red-100 rounded-full"
                >
                  ×
                </Button>
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-blue-100 to-purple-100 p-1 rounded-xl shadow-inner">
                <TabsTrigger
                  value="text"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <MessageSquare className="h-4 w-4" />
                  อ่านข้อความ
                </TabsTrigger>
                <TabsTrigger
                  value="book"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="h-4 w-4" />
                  อ่านหนังสือ
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <User className="h-4 w-4" />
                  โปรไฟล์
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <History className="h-4 w-4" />
                  ประวัติ
                </TabsTrigger>
                <TabsTrigger
                  value="manage"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <FileText className="h-4 w-4" />
                  จัดการหนังสือ
                </TabsTrigger>
              </TabsList>

              {/* Keep all TabsContent sections exactly the same, just update the main speak button */}
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
                  <p className="text-xs text-gray-500 mt-1">💡 สามารถใส่ข้อความผสมระหว่างภาษาไทยกับภาษาอังกฤษได้</p>
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
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded-lg"></div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Textarea
                      id="text-input"
                      placeholder="พิมพ์ข้อความที่นี่... สามารถใส่หลายภาษาผสมกันได้"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[120px] resize-none"
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500">รองรับ: ไทย, English, 中文, 日本語</p>
                  </div>

                  <Button
                    onClick={() => handleSpeak(text, "text")}
                    disabled={isLoading || !text.trim()}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
                  <div className="space-y-3 mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100 shadow-md">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700">เสียงที่สร้างแล้ว:</h3>
                      <Button
                        onClick={togglePlayPause}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 bg-transparent hover:bg-blue-50"
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

              {/* Keep all other TabsContent sections the same, just update the book reading button */}
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
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
                          const bookLanguage = book?.language || language
                          handleSpeak(bookContent, "book", book?.title, bookLanguage)
                        }}
                        disabled={isLoading || !bookContent.trim()}
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
                  <div className="space-y-3 mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100 shadow-md">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700">เสียงที่สร้างแล้ว:</h3>
                      <Button
                        onClick={togglePlayPause}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 bg-transparent hover:bg-blue-50"
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

              {/* Keep profile, history, and manage tabs exactly the same */}
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

        <div className="mt-8 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent h-px top-1/2"></div>
          <div className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm border border-white/50">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <p className="font-medium">ขับเคลื่อนโดย Botnoi Voice API</p>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
            </div>
            <p className="text-xs text-gray-500">รองรับการอ่านหลายภาษาและภาษาผสมในประโยคเดียวกัน</p>
          </div>
        </div>
      </div>
    </div>
  )
}





// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Volume2,
//   Loader2,
//   MessageSquare,
//   Play,
//   Pause,
//   User,
//   History,
//   BookOpen,
//   AlertCircle,
//   FileText,
//   Trash2,
//   Globe,
// } from "lucide-react"
// import VoiceSettings from "@/components/voice-settings"
// import UserProfile from "@/components/user-profile"
// import VoiceHistory from "@/components/voice-history"
// import AddBookForm from "@/components/add-book-form"

// interface BookType {
//   id: string
//   title: string
//   url?: string
//   content?: string
//   description: string
//   type: "url" | "text"
//   category: string
//   language: string
// }

// interface VoiceHistoryItem {
//   id: string
//   text: string
//   timestamp: number
//   speaker: string
//   speed: number
//   volume: number
//   language: string
//   type: "text" | "book"
//   bookTitle?: string
// }

// interface UserProfileData {
//   name: string
//   email: string
//   favoriteVoice: string
//   preferredLanguage: string
//   profileImage?: string
//   favoriteBooks: string[]
//   createdAt: number
// }

// const defaultBooks: BookType[] = [
//   {
//     id: "default_1",
//     title: "นิทานอีสป_ดาวลูกไก่",
//     url: "https://www.kalyanamitra.org/th/Aesop_detail.php?page=4010",
//     description: "เรื่องราวของดาวลูกไก่",
//     type: "url",
//     category: "นิทาน",
//     language: "th",
//   },
//   {
//     id: "default_2",
//     title: "นิทานพื้นบ้านไทย - นางสีดา",
//     url: "https://th.wikipedia.org/wiki/นางสีดา",
//     description: "เรื่องราวของนางสีดาในรามเกียรติ์",
//     type: "url",
//     category: "นิทาน",
//     language: "th",
//   },
  
// ]

// const languages = [
//   { code: "th", name: "ไทย", flag: "🇹🇭" },
//   { code: "en", name: "English", flag: "🇺🇸" },
//   { code: "zh", name: "中文", flag: "🇨🇳" },
//   { code: "ja", name: "日本語", flag: "🇯🇵" },
//   // { code: "ko", name: "한국어", flag: "🇰🇷" },
// ]

// export default function TextToSpeechApp() {
//   const [activeTab, setActiveTab] = useState("text")
//   const [text, setText] = useState("")
//   const [selectedBook, setSelectedBook] = useState<string>("")
//   const [bookContent, setBookContent] = useState<string>("")
//   const [availableBooks, setAvailableBooks] = useState<BookType[]>(defaultBooks)
//   const [isLoading, setIsLoading] = useState(false)
//   const [isLoadingBook, setIsLoadingBook] = useState(false)
//   const [audioUrl, setAudioUrl] = useState<string | null>(null)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
//   const [speed, setSpeed] = useState(1.0)
//   const [volume, setVolume] = useState(1.0)
//   const [speaker, setSpeaker] = useState("1")
//   const [language, setLanguage] = useState("th")
//   const [error, setError] = useState<string | null>(null)

//   const [sampleAudioUrl, setSampleAudioUrl] = useState<string | null>(null)
//   const [isLoadingSample, setIsLoadingSample] = useState<string | null>(null)
//   const [sampleAudio, setSampleAudio] = useState<HTMLAudioElement | null>(null)

//   const [userProfile, setUserProfile] = useState<UserProfileData | null>(null)
//   const [voiceHistory, setVoiceHistory] = useState<VoiceHistoryItem[]>([])

//   const [selectedCategory, setSelectedCategory] = useState<string>("all")
//   const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string>("all")

//   // Load data from localStorage on component mount
//   useEffect(() => {
//     try {
//       const savedProfile = localStorage.getItem("userProfile")
//       const savedHistory = localStorage.getItem("voiceHistory")
//       const savedBooks = localStorage.getItem("customBooks")
//       const deletedDefaults = localStorage.getItem("deletedDefaultBooks")

//       if (savedProfile) {
//         setUserProfile(JSON.parse(savedProfile))
//       }

//       if (savedHistory) {
//         setVoiceHistory(JSON.parse(savedHistory))
//       }

//       // Load books
//       let booksToShow = [...defaultBooks]

//       // Remove deleted default books
//       if (deletedDefaults) {
//         const deletedIds = JSON.parse(deletedDefaults)
//         booksToShow = booksToShow.filter((book) => !deletedIds.includes(book.id))
//       }

//       // Add custom books
//       if (savedBooks) {
//         const customBooks = JSON.parse(savedBooks)
//         booksToShow = [...booksToShow, ...customBooks]
//       }

//       setAvailableBooks(booksToShow)
//     } catch (error) {
//       console.error("Error loading saved data:", error)
//     }
//   }, [])

//   const saveToHistory = (text: string, type: "text" | "book", bookTitle?: string) => {
//     try {
//       const historyItem: VoiceHistoryItem = {
//         id: Date.now().toString(),
//         text: text.substring(0, 100) + (text.length > 100 ? "..." : ""),
//         timestamp: Date.now(),
//         speaker,
//         speed,
//         volume,
//         language,
//         type,
//         bookTitle,
//       }

//       const newHistory = [historyItem, ...voiceHistory].slice(0, 50)
//       setVoiceHistory(newHistory)
//       localStorage.setItem("voiceHistory", JSON.stringify(newHistory))
//     } catch (error) {
//       console.error("Error saving to history:", error)
//     }
//   }

//   const handlePlaySample = async (speakerId: string, speakerName: string) => {
//     setIsLoadingSample(speakerId)
//     setError(null)

//     if (sampleAudio) {
//       sampleAudio.pause()
//       setSampleAudio(null)
//     }

// // ตั้งค่าคำพูดทดลอง
//     try {
//       const sampleTexts = {
//         th: `สวัสดีฉันคือ${speakerName} ยินดีที่ได้รู้จัก`,
//         en: `Hello, I'm ${speakerName}. Nice to meet you.`,
//         zh: `你好，我是${speakerName}，很高兴认识你。`,
//         ja: `こんにちは、私は${speakerName}です。よろしくお願いします。`,
//         // ko: `안녕하세요, 저는 ${speakerName}입니다. 만나서 반갑습니다.`,
//       }

//       const response = await fetch("/api/sample-voice", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           text: sampleTexts[language as keyof typeof sampleTexts] || sampleTexts.th,
//           speaker: speakerId,
//           speed: 1.0,
//           volume: 1.0,
//           language: language,
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || `HTTP error! status: ${response.status}`)
//       }

//       if (data.audioUrl) {
//         setSampleAudioUrl(data.audioUrl)
//         const audio = new Audio(data.audioUrl)
//         setSampleAudio(audio)

//         audio.onerror = () => {
//           setError("ไม่สามารถเล่นไฟล์เสียงได้")
//         }

//         audio.play().catch((error) => {
//           console.error("Error playing audio:", error)
//           setError("ไม่สามารถเล่นเสียงได้")
//         })
//       } else {
//         throw new Error("ไม่ได้รับ URL ของไฟล์เสียง")
//       }
//     } catch (error) {
//       console.error("Error:", error)
//       setError(error instanceof Error ? error.message : "ไม่สามารถเล่นเสียงตัวอย่างได้")
//     } finally {
//       setIsLoadingSample(null)
//     }
//   }

//   const handleSpeak = async (
//     textToSpeak: string,
//     type: "text" | "book" = "text",
//     bookTitle?: string,
//     bookLanguage?: string,
//   ) => {
//     if (!textToSpeak.trim()) {
//       setError("กรุณาใส่ข้อความที่ต้องการให้อ่าน")
//       return
//     }

//     setIsLoading(true)
//     setAudioUrl(null)
//     setError(null)

//     try {
//       const response = await fetch("/api/speak", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           text: textToSpeak,
//           speed: speed,
//           volume: volume,
//           speaker: speaker,
//           language: bookLanguage || language, // ใช้ภาษาของหนังสือถ้ามี
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || `HTTP error! status: ${response.status}`)
//       }

//       if (data.audioUrl) {
//         setAudioUrl(data.audioUrl)
//         const audio = new Audio(data.audioUrl)
//         setCurrentAudio(audio)

//         audio.onerror = () => {
//           setError("ไม่สามารถเล่นไฟล์เสียงได้")
//         }

//         audio.play().catch((error) => {
//           console.error("Error playing audio:", error)
//           setError("ไม่สามารถเล่นเสียงได้")
//         })

//         setIsPlaying(true)

//         audio.onended = () => {
//           setIsPlaying(false)
//         }

//         // Save to history
//         saveToHistory(textToSpeak, type, bookTitle)
//       } else {
//         throw new Error("ไม่ได้รับ URL ของไฟล์เสียง")
//       }
//     } catch (error) {
//       console.error("Error:", error)
//       setError(error instanceof Error ? error.message : "ไม่สามารถสร้างเสียงได้")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleLoadBook = async () => {
//     if (!selectedBook) {
//       setError("กรุณาเลือกหนังสือที่ต้องการอ่าน")
//       return
//     }

//     const book = availableBooks.find((b) => b.id === selectedBook)
//     if (!book) return

//     // If it's a text-based book, use the content directly
//     if (book.type === "text" && book.content) {
//       setBookContent(book.content)
//       return
//     }

//     // If it's a URL-based book, fetch the content
//     if (book.type === "url" && book.url) {
//       setIsLoadingBook(true)
//       setBookContent("")
//       setError(null)

//       try {
//         const response = await fetch("/api/fetch-book", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ url: book.url }),
//         })

//         const data = await response.json()

//         if (!response.ok) {
//           throw new Error(data.error || `HTTP error! status: ${response.status}`)
//         }

//         setBookContent(data.content)
//       } catch (error) {
//         console.error("Error:", error)
//         setError(error instanceof Error ? error.message : "ไม่สามารถโหลดเนื้อหาหนังสือได้")
//       } finally {
//         setIsLoadingBook(false)
//       }
//     }
//   }

//   const handleDeleteBook = (bookId: string) => {
//     if (confirm("คุณต้องการลบหนังสือนี้หรือไม่?")) {
//       try {
//         const updatedBooks = availableBooks.filter((book) => book.id !== bookId)
//         setAvailableBooks(updatedBooks)

//         // Update localStorage - save all books except the deleted one
//         const customBooks = updatedBooks.filter((book) => !book.id.startsWith("default_"))
//         localStorage.setItem("customBooks", JSON.stringify(customBooks))

//         // Also save which default books were deleted
//         const deletedDefaults = defaultBooks
//           .filter((book) => !updatedBooks.find((b) => b.id === book.id))
//           .map((b) => b.id)
//         localStorage.setItem("deletedDefaultBooks", JSON.stringify(deletedDefaults))

//         // Reset selection if deleted book was selected
//         if (selectedBook === bookId) {
//           setSelectedBook("")
//           setBookContent("")
//         }
//       } catch (error) {
//         console.error("Error deleting book:", error)
//         setError("ไม่สามารถลบหนังสือได้")
//       }
//     }
//   }

//   const handleAddBook = (newBook: BookType) => {
//     try {
//       const updatedBooks = [...availableBooks, newBook]
//       setAvailableBooks(updatedBooks)

//       // Save custom books to localStorage
//       const customBooks = updatedBooks.filter((book) => !defaultBooks.find((db) => db.id === book.id))
//       localStorage.setItem("customBooks", JSON.stringify(customBooks))
//     } catch (error) {
//       console.error("Error adding book:", error)
//       setError("ไม่สามารถเพิ่มหนังสือได้")
//     }
//   }

//   const handleDeleteHistory = (id: string) => {
//     try {
//       const newHistory = voiceHistory.filter((item) => item.id !== id)
//       setVoiceHistory(newHistory)
//       localStorage.setItem("voiceHistory", JSON.stringify(newHistory))
//     } catch (error) {
//       console.error("Error deleting history:", error)
//       setError("ไม่สามารถลบประวัติได้")
//     }
//   }

//   const handleClearAllHistory = () => {
//     try {
//       setVoiceHistory([])
//       localStorage.removeItem("voiceHistory")
//     } catch (error) {
//       console.error("Error clearing history:", error)
//       setError("ไม่สามารถลบประวัติทั้งหมดได้")
//     }
//   }

//   const togglePlayPause = () => {
//     if (currentAudio) {
//       if (isPlaying) {
//         currentAudio.pause()
//         setIsPlaying(false)
//       } else {
//         currentAudio.play().catch((error) => {
//           console.error("Error playing audio:", error)
//           setError("ไม่สามารถเล่นเสียงได้")
//         })
//         setIsPlaying(true)
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-6xl mx-auto pt-8">
//         <Card className="shadow-lg">
//           <CardHeader className="text-center">
//             <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
//               <Volume2 className="h-8 w-8 text-blue-600" />
//               แอปอ่านข้อความและหนังสือ
//             </CardTitle>
//             <CardDescription className="text-lg text-gray-600">
//               ใส่ข้อความภาษาอะไรก็ได้ เพื่อให้อ่านออกเสียงด้วย Botnoi Voice API รองรับภาษาผสมในประโยคเดียวกัน
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
//                 <AlertCircle className="h-4 w-4" />
//                 <span className="text-sm">{error}</span>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setError(null)}
//                   className="ml-auto h-6 w-6 p-0 text-red-700 hover:bg-red-100"
//                 >
//                   ×
//                 </Button>
//               </div>
//             )}

//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-5">
//                 <TabsTrigger value="text" className="flex items-center gap-2">
//                   <MessageSquare className="h-4 w-4" />
//                   อ่านข้อความ
//                 </TabsTrigger>
//                 <TabsTrigger value="book" className="flex items-center gap-2">
//                   <BookOpen className="h-4 w-4" />
//                   อ่านหนังสือ
//                 </TabsTrigger>
//                 <TabsTrigger value="profile" className="flex items-center gap-2">
//                   <User className="h-4 w-4" />
//                   โปรไฟล์
//                 </TabsTrigger>
//                 <TabsTrigger value="history" className="flex items-center gap-2">
//                   <History className="h-4 w-4" />
//                   ประวัติ
//                 </TabsTrigger>
//                 <TabsTrigger value="manage" className="flex items-center gap-2">
//                   <FileText className="h-4 w-4" />
//                   จัดการหนังสือ
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="text" className="space-y-6 mt-6">
//                 <div className="mb-4">
//                   <label className="text-sm font-medium text-gray-700 mb-2 block">เลือกภาษาหลักสำหรับอ่านออกเสียง:</label>
//                   <Select value={language} onValueChange={setLanguage}>
//                     <SelectTrigger className="w-full max-w-xs">
//                       <SelectValue placeholder="เลือกภาษา..." />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {languages.map((lang) => (
//                         <SelectItem key={lang.code} value={lang.code}>
//                           <div className="flex items-center gap-2">
//                             <span>{lang.flag}</span>
//                             <span>{lang.name}</span>
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <p className="text-xs text-gray-500 mt-1">
//                     💡 สามารถใส่ข้อความผสมระหว่างภาษาไทยกับภาษาอังกฤษได้
//                   </p>
//                 </div>

//                 <VoiceSettings
//                   speed={speed}
//                   volume={volume}
//                   speaker={speaker}
//                   language={language}
//                   onSpeedChange={setSpeed}
//                   onVolumeChange={setVolume}
//                   onSpeakerChange={setSpeaker}
//                   onPlaySample={handlePlaySample}
//                   isLoadingSample={isLoadingSample}
//                 />

//                 {/* Multi-language Support Info */}
//                 <Card className="border-2 border-dashed border-green-200 bg-green-50/30">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2 text-lg">
//                       <Globe className="h-5 w-5 text-green-600" />
//                       รองรับหลายภาษา
//                     </CardTitle>
//                     <CardDescription>ใส่ข้อความภาษาอะไรก็ได้ ระบบจะอ่านออกเสียงให้อัตโนมัติ</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                       <div className="space-y-2">
//                         <h4 className="font-medium text-green-800">🌍 ภาษาที่รองรับ:</h4>
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-2">
//                             <span>🇹🇭</span>
//                             <span>ไทย - สวัสดีครับ</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <span>🇺🇸</span>
//                             <span>English - Hello World</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <span>🇨🇳</span>
//                             <span>中文 - 你好世界</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <span>🇯🇵</span>
//                             <span>日本語 - こんにちは</span>
//                           </div>
//                           {/* <div className="flex items-center gap-2">
//                             <span>🇰🇷</span>
//                             <span>한국어 - 안녕하세요</span>
//                           </div> */}
//                         </div>
//                       </div>
//                       {/* <div className="space-y-2">
//                         <h4 className="font-medium text-green-800">✨ ตัวอย่างภาษาผสม:</h4>
//                         <div className="space-y-1 text-gray-600">
//                           <p>"สวัสดี Hello 你好"</p>
//                           <p>"I love กิน sushi 寿司"</p>
//                           <p>"Today วันนี้ is beautiful"</p>
//                           <p>"Thank you ขอบคุณ 谢谢"</p>
//                         </div>
//                       </div> */}
//                     </div>
//                     <div className="mt-4 p-3 bg-green-100 rounded-lg">
//                       {/* <p className="text-sm text-green-800">
//                         <strong>💡 เคล็ดลับ:</strong> เลือกภาษาหลักที่ใช้มากที่สุดในข้อความ ระบบจะปรับการออกเสียงให้เหมาะสมโดยอัตโนมัติ
//                       </p> */}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     {/* <label htmlFor="text-input" className="text-sm font-medium text-gray-700">
//                       ใส่ข้อความที่ต้องการให้อ่าน (รองรับหลายภาษา):
//                     </label> */}
//                     <Textarea
//                       id="text-input"
//                       // placeholder="พิมพ์ข้อความที่นี่... สามารถใส่หลายภาษาผสมกันได้ เช่น สวัสดี Hello 你好 こんにちは 안녕하세요"
//                       value={text}
//                       onChange={(e) => setText(e.target.value)}
//                       className="min-h-[120px] resize-none"
//                       disabled={isLoading}
//                     />
//                     <p className="text-xs text-gray-500">
//                       รองรับ: ไทย, English, 中文, 日本語
//                     </p>
//                   </div>

//                   <Button
//                     onClick={() => handleSpeak(text, "text")}
//                     disabled={isLoading || !text.trim()}
//                     className="w-full h-12 text-lg font-semibold"
//                     size="lg"
//                   >
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                         กำลังสร้างเสียง...
//                       </>
//                     ) : (
//                       <>
//                         <Volume2 className="mr-2 h-5 w-5" />
//                         อ่านข้อความออกเสียง
//                       </>
//                     )}
//                   </Button>
//                 </div>

//                 {audioUrl && (
//                   <div className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-sm font-medium text-gray-700">เสียงที่สร้างแล้ว:</h3>
//                       <Button
//                         onClick={togglePlayPause}
//                         variant="outline"
//                         size="sm"
//                         className="flex items-center gap-2 bg-transparent"
//                       >
//                         {isPlaying ? (
//                           <>
//                             <Pause className="h-4 w-4" />
//                             หยุด
//                           </>
//                         ) : (
//                           <>
//                             <Play className="h-4 w-4" />
//                             เล่น
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                     <audio controls src={audioUrl} className="w-full" preload="auto">
//                       เบราว์เซอร์ของคุณไม่รองรับการเล่นเสียง
//                     </audio>
//                     <p className="text-xs text-gray-500">เสียงจะเล่นอัตโนมัติเมื่อสร้างเสร็จ</p>
//                   </div>
//                 )}
//               </TabsContent>

//               <TabsContent value="book" className="space-y-6 mt-6">
//                 <VoiceSettings
//                   speed={speed}
//                   volume={volume}
//                   speaker={speaker}
//                   language={language}
//                   onSpeedChange={setSpeed}
//                   onVolumeChange={setVolume}
//                   onSpeakerChange={setSpeaker}
//                   onPlaySample={handlePlaySample}
//                   isLoadingSample={isLoadingSample}
//                 />

//                 {/* Book Filtering */}
//                 <Card className="border-2 border-dashed border-purple-200 bg-purple-50/30">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2 text-lg">
//                       <BookOpen className="h-5 w-5 text-purple-600" />
//                       เลือกหนังสือตามหมวดหมู่
//                     </CardTitle>
//                     <CardDescription>กรองหนังสือตามประเภทและภาษาที่ต้องการ</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">ประเภทหนังสือ:</label>
//                         <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="เลือกประเภท..." />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="all">ทุกประเภท</SelectItem>
//                             {Array.from(new Set(availableBooks.map((book) => book.category))).map((category) => (
//                               <SelectItem key={category} value={category}>
//                                 {category}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>

//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">ภาษา:</label>
//                         <Select value={selectedLanguageFilter} onValueChange={setSelectedLanguageFilter}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="เลือกภาษา..." />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="all">ทุกภาษา</SelectItem>
//                             {languages.map((lang) => (
//                               <SelectItem key={lang.code} value={lang.code}>
//                                 <div className="flex items-center gap-2">
//                                   <span>{lang.flag}</span>
//                                   <span>{lang.name}</span>
//                                 </div>
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">เลือกหนังสือที่ต้องการอ่าน:</label>
//                     <div className="flex gap-2">
//                       <Select value={selectedBook} onValueChange={setSelectedBook}>
//                         <SelectTrigger className="flex-1">
//                           <SelectValue placeholder="เลือกหนังสือ..." />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {availableBooks
//                             .filter(
//                               (book) =>
//                                 (selectedCategory === "all" || book.category === selectedCategory) &&
//                                 (selectedLanguageFilter === "all" || book.language === selectedLanguageFilter),
//                             )
//                             .map((book) => (
//                               <SelectItem key={book.id} value={book.id}>
//                                 <div className="flex flex-col">
//                                   <div className="flex items-center gap-2">
//                                     <span className="font-medium">{book.title}</span>
//                                     <span className="text-xs px-2 py-1 bg-gray-100 rounded">
//                                       {book.type === "url" ? "เว็บไซต์" : "ข้อความ"}
//                                     </span>
//                                     <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
//                                       {book.category}
//                                     </span>
//                                     <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
//                                       {languages.find((l) => l.code === book.language)?.flag}{" "}
//                                       {languages.find((l) => l.code === book.language)?.name}
//                                     </span>
//                                   </div>
//                                   <span className="text-xs text-gray-500">{book.description}</span>
//                                 </div>
//                               </SelectItem>
//                             ))}
//                         </SelectContent>
//                       </Select>
//                       {selectedBook && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleDeleteBook(selectedBook)}
//                           className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       แสดง{" "}
//                       {
//                         availableBooks.filter(
//                           (book) =>
//                             (selectedCategory === "all" || book.category === selectedCategory) &&
//                             (selectedLanguageFilter === "all" || book.language === selectedLanguageFilter),
//                         ).length
//                       }{" "}
//                       หนังสือจากทั้งหมด {availableBooks.length} เล่ม
//                     </p>
//                   </div>

//                   <Button
//                     onClick={handleLoadBook}
//                     disabled={isLoadingBook || !selectedBook}
//                     className="w-full bg-transparent"
//                     variant="outline"
//                   >
//                     {isLoadingBook ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         กำลังโหลดเนื้อหา...
//                       </>
//                     ) : (
//                       <>
//                         <BookOpen className="mr-2 h-4 w-4" />
//                         โหลดเนื้อหาหนังสือ
//                       </>
//                     )}
//                   </Button>

//                   {bookContent && (
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">เนื้อหาหนังสือ:</label>
//                         <Textarea
//                           value={bookContent}
//                           onChange={(e) => setBookContent(e.target.value)}
//                           className="min-h-[200px] resize-none"
//                           placeholder="เนื้อหาหนังสือจะแสดงที่นี่..."
//                         />
//                         <p className="text-xs text-gray-500">สามารถแก้ไขเนื้อหาได้</p>
//                       </div>

//                       <Button
//                         onClick={() => {
//                           const book = availableBooks.find((b) => b.id === selectedBook)
//                           // ใช้ภาษาของหนังสือที่เลือก
//                           const bookLanguage = book?.language || language
//                           handleSpeak(bookContent, "book", book?.title, bookLanguage)
//                         }}
//                         disabled={isLoading || !bookContent.trim()}
//                         className="w-full h-12 text-lg font-semibold"
//                         size="lg"
//                       >
//                         {isLoading ? (
//                           <>
//                             <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                             กำลังสร้างเสียง...
//                           </>
//                         ) : (
//                           <>
//                             <Volume2 className="mr-2 h-5 w-5" />
//                             อ่านหนังสือออกเสียง
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                   )}
//                 </div>

//                 {audioUrl && (
//                   <div className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-sm font-medium text-gray-700">เสียงที่สร้างแล้ว:</h3>
//                       <Button
//                         onClick={togglePlayPause}
//                         variant="outline"
//                         size="sm"
//                         className="flex items-center gap-2 bg-transparent"
//                       >
//                         {isPlaying ? (
//                           <>
//                             <Pause className="h-4 w-4" />
//                             หยุด
//                           </>
//                         ) : (
//                           <>
//                             <Play className="h-4 w-4" />
//                             เล่น
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                     <audio controls src={audioUrl} className="w-full" preload="auto">
//                       เบราว์เซอร์ของคุณไม่รองรับการเล่นเสียง
//                     </audio>
//                     <p className="text-xs text-gray-500">เสียงจะเล่นอัตโนมัติเมื่อสร้างเสร็จ</p>
//                   </div>
//                 )}
//               </TabsContent>

//               <TabsContent value="profile" className="mt-6">
//                 <UserProfile
//                   userProfile={userProfile}
//                   availableBooks={availableBooks}
//                   onUpdateProfile={(profile) => {
//                     setUserProfile(profile)
//                     try {
//                       localStorage.setItem("userProfile", JSON.stringify(profile))
//                     } catch (error) {
//                       console.error("Error saving profile:", error)
//                       setError("ไม่สามารถบันทึกโปรไฟล์ได้")
//                     }
//                   }}
//                 />
//               </TabsContent>

//               <TabsContent value="history" className="mt-6">
//                 <VoiceHistory
//                   history={voiceHistory}
//                   onDeleteItem={handleDeleteHistory}
//                   onClearAll={handleClearAllHistory}
//                   onReplay={(item) => {
//                     setSpeaker(item.speaker)
//                     setSpeed(item.speed)
//                     setVolume(item.volume)
//                     setLanguage(item.language)
//                     setText(item.text)
//                     setActiveTab("text")
//                   }}
//                 />
//               </TabsContent>

//               <TabsContent value="manage" className="mt-6">
//                 <AddBookForm onAddBook={handleAddBook} />
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>

//         <div className="mt-8 text-center text-sm text-gray-600">
//           <p>ขับเคลื่อนโดย Botnoi Voice API</p>
//           <p className="mt-1">รองรับการอ่านหลายภาษาและภาษาผสมในประโยคเดียวกัน</p>
//         </div>
//       </div>
//     </div>
//   )
// }
