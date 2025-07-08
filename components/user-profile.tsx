"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Heart, Globe, Calendar, Save, Camera, BookOpen, X } from "lucide-react"

interface BookType {
  id: string
  title: string
  url?: string
  content?: string
  description: string
  type: "url" | "text"
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

interface UserProfileProps {
  userProfile: UserProfileData | null
  availableBooks: BookType[]
  onUpdateProfile: (profile: UserProfileData) => void
}

const voiceOptions = [
  { value: "1", label: "เสียงผู้หญิง 1 (นุ่มนวล)" },
  { value: "2", label: "เสียงผู้หญิง 2 (สดใส)" },
  { value: "3", label: "เสียงผู้ชาย 1 (เข้มแข็ง)" },
  { value: "4", label: "เสียงผู้ชาย 2 (อ่อนโยน)" },
  { value: "5", label: "เสียงเด็ก" },
  { value: "6", label: "เสียงผู้สูงอายุ" },
]

const languages = [
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
]

export default function UserProfile({ userProfile, availableBooks, onUpdateProfile }: UserProfileProps) {
  const [formData, setFormData] = useState<UserProfileData>({
    name: "",
    email: "",
    favoriteVoice: "1",
    preferredLanguage: "th",
    profileImage: "",
    favoriteBooks: [],
    createdAt: Date.now(),
  })

  const [isEditing, setIsEditing] = useState(false)
  const [selectedBook, setSelectedBook] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 👇 NEW: guarantee arrays are always defined
  const safeAvailableBooks = availableBooks ?? []
  const safeFavoriteBooks = formData.favoriteBooks ?? []

  useEffect(() => {
    if (userProfile) {
      // Ensure favoriteBooks is always an array
      const safeProfile = {
        ...userProfile,
        favoriteBooks: userProfile.favoriteBooks || [],
      }
      setFormData(safeProfile)
    } else {
      setIsEditing(true)
    }
  }, [userProfile])

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("กรุณาใส่ชื่อ")
      return
    }

    const profileToSave = {
      ...formData,
      createdAt: userProfile?.createdAt || Date.now(),
    }

    onUpdateProfile(profileToSave)
    setIsEditing(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFormData({ ...formData, profileImage: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddFavoriteBook = () => {
    if (selectedBook && !safeFavoriteBooks.includes(selectedBook)) {
      setFormData({
        ...formData,
        favoriteBooks: [...safeFavoriteBooks, selectedBook],
      })
      setSelectedBook("")
    }
  }

  const handleRemoveFavoriteBook = (bookId: string) => {
    setFormData({
      ...formData,
      favoriteBooks: formData.favoriteBooks.filter((id) => id !== bookId),
    })
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            โปรไฟล์ผู้ใช้
          </CardTitle>
          <CardDescription>จัดการข้อมูลส่วนตัว รูปโปรไฟล์ และหนังสือที่ชื่นชอบ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!userProfile && !isEditing ? (
            <div className="text-center py-8">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีโปรไฟล์</h3>
              <p className="text-gray-500 mb-4">สร้างโปรไฟล์เพื่อบันทึกการตั้งค่าที่ชื่นชอบ</p>
              <Button onClick={() => setIsEditing(true)}>
                <User className="mr-2 h-4 w-4" />
                สร้างโปรไฟล์
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full bg-white"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {isEditing && <p className="text-xs text-gray-500 text-center">คลิกปุ่มกล้องเพื่อเปลี่ยนรูปโปรไฟล์</p>}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    ชื่อ
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ใส่ชื่อของคุณ"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-md">{formData.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    อีเมล
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ใส่อีเมลของคุณ"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-md">{formData.email || "ไม่ได้ระบุ"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    เสียงที่ชื่นชอบ
                  </label>
                  {isEditing ? (
                    <Select
                      value={formData.favoriteVoice}
                      onValueChange={(value) => setFormData({ ...formData, favoriteVoice: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {voiceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-md">
                      {voiceOptions.find((v) => v.value === formData.favoriteVoice)?.label}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    ภาษาที่ชื่นชอบ
                  </label>
                  {isEditing ? (
                    <Select
                      value={formData.preferredLanguage}
                      onValueChange={(value) => setFormData({ ...formData, preferredLanguage: value })}
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
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-md flex items-center gap-2">
                      <span>{languages.find((l) => l.code === formData.preferredLanguage)?.flag}</span>
                      <span>{languages.find((l) => l.code === formData.preferredLanguage)?.name}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Favorite Books Section */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  หนังสือที่ชื่นชอบ
                </label>

                {isEditing && (
                  <div className="flex gap-2">
                    <Select value={selectedBook} onValueChange={setSelectedBook}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="เลือกหนังสือที่ชื่นชอบ..." />
                      </SelectTrigger>
                      <SelectContent>
                        {safeAvailableBooks
                          .filter((book) => !safeFavoriteBooks.includes(book.id))
                          .map((book) => (
                            <SelectItem key={book.id} value={book.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{book.title}</span>
                                <span className="text-xs text-gray-500">{book.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddFavoriteBook} disabled={!selectedBook} variant="outline">
                      เพิ่ม
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {safeFavoriteBooks.map((bookId) => {
                    const book = safeAvailableBooks.find((b) => b.id === bookId)
                    if (!book) return null
                    return (
                      <Badge key={bookId} variant="secondary" className="flex items-center gap-2">
                        <BookOpen className="h-3 w-3" />
                        <span>{book.title}</span>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 hover:bg-red-100"
                            onClick={() => handleRemoveFavoriteBook(bookId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </Badge>
                    )
                  })}
                  {safeFavoriteBooks.length === 0 && <p className="text-sm text-gray-500">ยังไม่มีหนังสือที่ชื่นชอบ</p>}
                </div>
              </div>

              {userProfile && (
                <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t">
                  <Calendar className="h-4 w-4" />
                  <span>สร้างเมื่อ: {formatDate(formData.createdAt)}</span>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      บันทึก
                    </Button>
                    {userProfile && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFormData(userProfile)
                          setIsEditing(false)
                        }}
                      >
                        ยกเลิก
                      </Button>
                    )}
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    แก้ไขโปรไฟล์
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
