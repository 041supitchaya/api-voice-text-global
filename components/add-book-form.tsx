"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, BookOpen, Link, FileText, Save, Globe, Tag } from "lucide-react"

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

interface AddBookFormProps {
  onAddBook: (book: BookType) => void
}

const bookCategories = [
  "นิทาน",
  "วรรณกรรม",
  "ประวัติศาสตร์",
  "วิทยาศาสตร์",
  "เทคโนโลยี",
  "การศึกษา",
  "ข่าว",
  "บทความ",
  "เรื่องสั้น",
  "บทกวี",
  "คู่มือ",
  "อื่นๆ",
]

const languages = [
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
]

export default function AddBookForm({ onAddBook }: AddBookFormProps) {
  const [activeTab, setActiveTab] = useState("url")
  const [urlFormData, setUrlFormData] = useState({
    title: "",
    url: "",
    description: "",
    category: "",
    language: "th",
  })

  const [textFormData, setTextFormData] = useState({
    title: "",
    content: "",
    description: "",
    category: "",
    language: "th",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!urlFormData.title.trim() || !urlFormData.url.trim() || !urlFormData.category || !urlFormData.language) {
      alert("กรุณาใส่ข้อมูลให้ครบถ้วน")
      return
    }

    // Validate URL
    try {
      new URL(urlFormData.url)
    } catch {
      alert("กรุณาใส่ URL ที่ถูกต้อง")
      return
    }

    setIsSubmitting(true)

    try {
      const newBook: BookType = {
        id: `custom_${Date.now()}`,
        title: urlFormData.title.trim(),
        url: urlFormData.url.trim(),
        description: urlFormData.description.trim() || "หนังสือจากเว็บไซต์",
        type: "url",
        category: urlFormData.category,
        language: urlFormData.language,
      }

      onAddBook(newBook)

      // Reset form
      setUrlFormData({
        title: "",
        url: "",
        description: "",
        category: "",
        language: "th",
      })

      alert("เพิ่มหนังสือเรียบร้อยแล้ว!")
    } catch (error) {
      console.error("Error adding book:", error)
      alert("เกิดข้อผิดพลาดในการเพิ่มหนังสือ")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !textFormData.title.trim() ||
      !textFormData.content.trim() ||
      !textFormData.category ||
      !textFormData.language
    ) {
      alert("กรุณาใส่ข้อมูลให้ครบถ้วน")
      return
    }

    setIsSubmitting(true)

    try {
      const newBook: BookType = {
        id: `custom_${Date.now()}`,
        title: textFormData.title.trim(),
        content: textFormData.content.trim(),
        description: textFormData.description.trim() || "หนังสือที่สร้างจากข้อความ",
        type: "text",
        category: textFormData.category,
        language: textFormData.language,
      }

      onAddBook(newBook)

      // Reset form
      setTextFormData({
        title: "",
        content: "",
        description: "",
        category: "",
        language: "th",
      })

      alert("สร้างหนังสือเรียบร้อยแล้ว!")
    } catch (error) {
      console.error("Error creating book:", error)
      alert("เกิดข้อผิดพลาดในการสร้างหนังสือ")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            จัดการหนังสือ
          </CardTitle>
          <CardDescription>เพิ่มหนังสือจากเว็บไซต์หรือสร้างหนังสือจากข้อความ พร้อมระบุประเภทและภาษา</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                เพิ่มจากเว็บไซต์
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                สร้างจากข้อความ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4 mt-6">
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      ชื่อหนังสือ/บทความ *
                    </label>
                    <Input
                      value={urlFormData.title}
                      onChange={(e) => setUrlFormData({ ...urlFormData, title: e.target.value })}
                      placeholder="เช่น นิทานพื้นบ้านไทย - กบเจ้าชาย"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      ประเภทหนังสือ *
                    </label>
                    <Select
                      value={urlFormData.category}
                      onValueChange={(value) => setUrlFormData({ ...urlFormData, category: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภท..." />
                      </SelectTrigger>
                      <SelectContent>
                        {bookCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      URL ของเว็บไซต์ *
                    </label>
                    <Input
                      type="url"
                      value={urlFormData.url}
                      onChange={(e) => setUrlFormData({ ...urlFormData, url: e.target.value })}
                      placeholder="https://example.com/article"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      ภาษาหลัก *
                    </label>
                    <Select
                      value={urlFormData.language}
                      onValueChange={(value) => setUrlFormData({ ...urlFormData, language: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
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
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    คำอธิบาย
                  </label>
                  <Textarea
                    value={urlFormData.description}
                    onChange={(e) => setUrlFormData({ ...urlFormData, description: e.target.value })}
                    placeholder="คำอธิบายสั้นๆ เกี่ยวกับหนังสือ/บทความนี้"
                    className="min-h-[80px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !urlFormData.title.trim() ||
                    !urlFormData.url.trim() ||
                    !urlFormData.category ||
                    !urlFormData.language
                  }
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Save className="mr-2 h-4 w-4 animate-spin" />
                      กำลังเพิ่ม...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      เพิ่มหนังสือจากเว็บไซต์
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="text" className="space-y-4 mt-6">
              <form onSubmit={handleTextSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      ชื่อหนังสือ *
                    </label>
                    <Input
                      value={textFormData.title}
                      onChange={(e) => setTextFormData({ ...textFormData, title: e.target.value })}
                      placeholder="เช่น เรื่องสั้นของฉัน, บทกวีที่ชื่นชอบ"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      ประเภทหนังสือ *
                    </label>
                    <Select
                      value={textFormData.category}
                      onValueChange={(value) => setTextFormData({ ...textFormData, category: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภท..." />
                      </SelectTrigger>
                      <SelectContent>
                        {bookCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    ภาษาหลัก *
                  </label>
                  <Select
                    value={textFormData.language}
                    onValueChange={(value) => setTextFormData({ ...textFormData, language: value })}
                    required
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
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
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    เนื้อหาหนังสือ *
                  </label>
                  <Textarea
                    value={textFormData.content}
                    onChange={(e) => setTextFormData({ ...textFormData, content: e.target.value })}
                    placeholder="พิมพ์เนื้อหาหนังสือ เรื่องสั้น บทกวี หรือข้อความที่ต้องการให้อ่านออกเสียง..."
                    className="min-h-[200px] resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500">เขียนเรื่องราว บทกวี หรือข้อความใดๆ ที่ต้องการให้อ่านออกเสียง</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    คำอธิบาย
                  </label>
                  <Textarea
                    value={textFormData.description}
                    onChange={(e) => setTextFormData({ ...textFormData, description: e.target.value })}
                    placeholder="คำอธิบายสั้นๆ เกี่ยวกับเนื้อหานี้"
                    className="min-h-[80px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !textFormData.title.trim() ||
                    !textFormData.content.trim() ||
                    !textFormData.category ||
                    !textFormData.language
                  }
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Save className="mr-2 h-4 w-4 animate-spin" />
                      กำลังสร้าง...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      สร้างหนังสือจากข้อความ
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">💡 เคล็ดลับการจัดการหนังสือ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">📚 เพิ่มจากเว็บไซต์:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-medium">📖 Wikipedia:</span>
                  <span>ใช้ได้ดีที่สุด เนื่องจากมีโครงสร้างที่ชัดเจน</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">📰 บทความข่าว:</span>
                  <span>เลือกเว็บไซต์ที่มีเนื้อหาชัดเจน</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">⚠️ ข้อจำกัด:</span>
                  <span>เนื้อหาจะถูกจำกัดไม่เกิน 3,000 ตัวอักษร</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">✍️ สร้างจากข้อความ:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-medium">📝 เรื่องสั้น:</span>
                  <span>เขียนเรื่องราวของคุณเอง</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">🎭 บทกวี:</span>
                  <span>บทกวีที่ชื่นชอบหรือแต่งเอง</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">📚 บทเรียน:</span>
                  <span>เนื้อหาการเรียนรู้ต่างๆ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">🏷️ ประเภทหนังสือที่รองรับ:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {bookCategories.map((category) => (
                <span key={category} className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">🌍 ภาษาที่รองรับ:</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang.code}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center gap-1"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
