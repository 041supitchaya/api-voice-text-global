// // "use client"

// // import { Slider } from "@/components/ui/slider"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Settings, Volume2, Gauge, User, Play, Loader2 } from "lucide-react"

// // interface VoiceSettingsProps {
// //   speed: number
// //   volume: number
// //   speaker: string
// //   language: string // Add this line
// //   onSpeedChange: (speed: number) => void
// //   onVolumeChange: (volume: number) => void
// //   onSpeakerChange: (speaker: string) => void
// //   onPlaySample?: (speakerId: string, speakerName: string) => void
// //   isLoadingSample?: string | null
// // }

// // export default function VoiceSettings({
// //   speed,
// //   volume,
// //   speaker,
// //   language, // Add this line
// //   onSpeedChange,
// //   onVolumeChange,
// //   onSpeakerChange,
// //   onPlaySample,
// //   isLoadingSample,
// // }: VoiceSettingsProps) {
// //   const speakerOptions = [
// //     { value: "1", label: "เสียงผู้หญิง 1", description: "นุ่มนวล อ่อนโยน", name: "คุณนิดา" },
// //     { value: "2", label: "เสียงผู้หญิง 2", description: "สดใส มีชีวิตชีวา", name: "คุณสุดา" },
// //     { value: "3", label: "เสียงผู้ชาย 1", description: "เข้มแข็ง มั่นคง", name: "คุณสมชาย" },
// //     { value: "4", label: "เสียงผู้ชาย 2", description: "อ่อนโยน เป็นมิตร", name: "คุณวิชัย" },
// //     { value: "5", label: "เสียงเด็ก", description: "น่ารัก ใสใส", name: "น้องมินิ" },
// //     { value: "6", label: "เสียงผู้สูงอายุ", description: "อบอุ่น มีประสบการณ์", name: "คุณยาย" },
// //   ]

// //   return (
// //     <Card className="mb-6">
// //       <CardHeader>
// //         <CardTitle className="flex items-center gap-2 text-lg">
// //           <Settings className="h-5 w-5 text-blue-600" />
// //           การตั้งค่าเสียง
// //         </CardTitle>
// //         <CardDescription>ปรับแต่งโทนเสียง ความเร็ว และระดับเสียงตามความต้องการ</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Speaker Selection with Samples */}
// //           <div className="space-y-3 lg:col-span-2">
// //             <div className="flex items-center gap-2">
// //               <User className="h-4 w-4 text-gray-600" />
// //               <label className="text-sm font-medium text-gray-700">โทนเสียง</label>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //               {speakerOptions.map((option) => (
// //                 <div
// //                   key={option.value}
// //                   className={`p-3 border rounded-lg cursor-pointer transition-all ${
// //                     speaker === option.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
// //                   }`}
// //                   onClick={() => onSpeakerChange(option.value)}
// //                 >
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex-1">
// //                       <div className="flex items-center gap-2">
// //                         <div
// //                           className={`w-3 h-3 rounded-full ${speaker === option.value ? "bg-blue-500" : "bg-gray-300"}`}
// //                         />
// //                         <span className="font-medium text-sm">{option.label}</span>
// //                       </div>
// //                       <p className="text-xs text-gray-500 mt-1">{option.description}</p>
// //                       <p className="text-xs text-blue-600 mt-1 font-medium">{option.name}</p>
// //                     </div>

// //                     <Button
// //                       size="sm"
// //                       variant="outline"
// //                       className="ml-2 h-8 w-8 p-0 bg-transparent"
// //                       onClick={(e) => {
// //                         e.stopPropagation()
// //                         onPlaySample?.(option.value, option.name)
// //                       }}
// //                       disabled={isLoadingSample === option.value}
// //                     >
// //                       {isLoadingSample === option.value ? (
// //                         <Loader2 className="h-3 w-3 animate-spin" />
// //                       ) : (
// //                         <Play className="h-3 w-3" />
// //                       )}
// //                     </Button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Speed and Volume Controls */}
// //           <div className="space-y-6">
// //             {/* Speed Control */}
// //             <div className="space-y-3">
// //               <div className="flex items-center gap-2">
// //                 <Gauge className="h-4 w-4 text-gray-600" />
// //                 <label className="text-sm font-medium text-gray-700">
// //                   ความเร็ว: <span className="font-bold text-blue-600">{speed.toFixed(1)}x</span>
// //                 </label>
// //               </div>
// //               <Slider
// //                 value={[speed]}
// //                 onValueChange={(value) => onSpeedChange(value[0])}
// //                 max={2.0}
// //                 min={0.5}
// //                 step={0.1}
// //                 className="w-full"
// //               />
// //               <div className="flex justify-between text-xs text-gray-500">
// //                 <span>ช้า</span>
// //                 <span>ปกติ</span>
// //                 <span>เร็ว</span>
// //               </div>
// //             </div>

// //             {/* Volume Control */}
// //             <div className="space-y-3">
// //               <div className="flex items-center gap-2">
// //                 <Volume2 className="h-4 w-4 text-gray-600" />
// //                 <label className="text-sm font-medium text-gray-700">
// //                   ระดับเสียง: <span className="font-bold text-blue-600">{Math.round(volume * 100)}%</span>
// //                 </label>
// //               </div>
// //               <Slider
// //                 value={[volume]}
// //                 onValueChange={(value) => onVolumeChange(value[0])}
// //                 max={1.0}
// //                 min={0.1}
// //                 step={0.1}
// //                 className="w-full"
// //               />
// //               <div className="flex justify-between text-xs text-gray-500">
// //                 <span>เบา</span>
// //                 <span>ปกติ</span>
// //                 <span>ดัง</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Preview Settings */}
// //         <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
// //           <div className="flex items-center gap-2 text-sm text-blue-800">
// //             <Settings className="h-4 w-4" />
// //             <span className="font-medium">การตั้งค่าปัจจุบัน:</span>
// //             <span>
// //               {speakerOptions.find((s) => s.value === speaker)?.name} | ความเร็ว {speed.toFixed(1)}x | ระดับเสียง{" "}
// //               {Math.round(volume * 100)}%
// //             </span>
// //           </div>
// //           <p className="text-xs text-blue-600 mt-2">
// //             💡 คลิกปุ่ม <Play className="inline h-3 w-3" /> เพื่อฟังเสียงตัวอย่างของแต่ละโทนเสียง
// //           </p>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   )
// // }

// "use client"

// import { Slider } from "@/components/ui/slider"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Settings, Volume2, Gauge, User, Play, Loader2 } from "lucide-react"

// interface VoiceSettingsProps {
//   speed: number
//   volume: number
//   speaker: string
//   language: string
//   onSpeedChange: (speed: number) => void
//   onVolumeChange: (volume: number) => void
//   onSpeakerChange: (speaker: string) => void
//   onPlaySample?: (speakerId: string, speakerName: string) => void
//   isLoadingSample?: string | null
// }

// export default function VoiceSettings({
//   speed,
//   volume,
//   speaker,
//   language,
//   onSpeedChange,
//   onVolumeChange,
//   onSpeakerChange,
//   onPlaySample,
//   isLoadingSample,
// }: VoiceSettingsProps) {
//   const speakerOptions = [
//     { value: "1", label: "อวา (วัยรุ่น)", description: "เล่าเรื่อง, อ่านข่าว", name: "อวา", language: "th" },
//     { value: "2", label: "โบ (วัยเด็ก)", description: "เล่าเรื่อง, นิทาน", name: "โบ", language: "th" },
//     { value: "3", label: "คุณงาม (วัยผู้ใหญ่)", description: "เล่าเรื่อง, บรรยาย", name: "คุณงาม", language: "th" },
//     { value: "4", label: "แม็กซ์ (ผู้ชาย)", description: "เล่าเรื่อง, อ่านข่าว", name: "แม็กซ์", language: "th" },
//     { value: "5", label: "อลัน (ผู้ชาย)", description: "เล่าเรื่อง, อ่านข่าว", name: "อลัน", language: "th" },
//     { value: "6", label: "ไซเรน (วัยรุ่น)", description: "เล่าเรื่อง, อ่านข่าว", name: "ไซเรน", language: "th" },
//     { value: "7", label: "อลิสา (วัยรุ่น)", description: "เล่าเรื่อง, บรรยาย", name: "อลิสา", language: "th" },
//     { value: "8", label: "เลโอ (ผู้ชาย)", description: "อ่านข่าว, สารคดี", name: "เลโอ", language: "th" },
//     { value: "9", label: "นาเดียร์ (วัยรุ่น)", description: "เล่าเรื่อง, บรรยาย", name: "นาเดียร์", language: "en" },
//     { value: "11", label: "วนิลา (วัยรุ่น)", description: "เล่าเรื่อง, สารคดี", name: "วนิลา", language: "th" },
//     { value: "13", label: "อนันดา (วัยเด็ก)", description: "เล่านิทาน, อนิเมะ", name: "อนันดา", language: "th" },
//     { value: "14", label: "ไอลีน (วัยรุ่น)", description: "บรรยาย, อนิเมะ", name: "ไอลีน", language: "th" },
//     { value: "15", label: "ฮิโระ (วัยรุ่น)", description: "เล่าเรื่อง, อนิเมะ", name: "ฮิโระ", language: "th" },
//     { value: "16", label: "ครูดีดี๊ (วัยผู้ใหญ่)", description: "เล่าเรื่อง, บรรยาย", name: "ครูดีดี๊", language: "th" },
//     { value: "17", label: "เจ้าเนิร์ด (วัยรุ่น)", description: "เล่าเรื่อง, บรรยาย", name: "เจ้าเนิร์ด", language: "th" },
//   ]

//   return (
//     <Card className="mb-6">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-lg">
//           <Settings className="h-5 w-5 text-blue-600" />
//           การตั้งค่าเสียง
//         </CardTitle>
//         <CardDescription>ปรับแต่งโทนเสียง ความเร็ว และระดับเสียงตามความต้องการ</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Speaker Selection */}
//           <div className="space-y-3 lg:col-span-2">
//             <div className="flex items-center gap-2">
//               <User className="h-4 w-4 text-gray-600" />
//               <label className="text-sm font-medium text-gray-700">โทนเสียง</label>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {speakerOptions.map((option) => (
//                 <div
//                   key={option.value}
//                   className={`p-3 border rounded-lg cursor-pointer transition-all ${
//                     speaker === option.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   onClick={() => onSpeakerChange(option.value)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-3 h-3 rounded-full ${
//                             speaker === option.value ? "bg-blue-500" : "bg-gray-300"
//                           }`}
//                         />
//                         <span className="font-medium text-sm">{option.label}</span>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">{option.description}</p>
//                       <p className="text-xs text-blue-600 mt-1 font-medium">{option.name}</p>
//                     </div>

//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="ml-2 h-8 w-8 p-0 bg-transparent"
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         onPlaySample?.(option.value, option.name)
//                       }}
//                       disabled={isLoadingSample === option.value}
//                     >
//                       {isLoadingSample === option.value ? (
//                         <Loader2 className="h-3 w-3 animate-spin" />
//                       ) : (
//                         <Play className="h-3 w-3" />
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Speed & Volume Controls */}
//           <div className="space-y-6">
//             {/* Speed */}
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <Gauge className="h-4 w-4 text-gray-600" />
//                 <label className="text-sm font-medium text-gray-700">
//                   ความเร็ว: <span className="font-bold text-blue-600">{speed.toFixed(1)}x</span>
//                 </label>
//               </div>
//               <Slider
//                 value={[speed]}
//                 onValueChange={(value) => onSpeedChange(value[0])}
//                 max={2.0}
//                 min={0.5}
//                 step={0.1}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-xs text-gray-500">
//                 <span>ช้า</span>
//                 <span>ปกติ</span>
//                 <span>เร็ว</span>
//               </div>
//             </div>

//             {/* Volume */}
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <Volume2 className="h-4 w-4 text-gray-600" />
//                 <label className="text-sm font-medium text-gray-700">
//                   ระดับเสียง: <span className="font-bold text-blue-600">{Math.round(volume * 100)}%</span>
//                 </label>
//               </div>
//               <Slider
//                 value={[volume]}
//                 onValueChange={(value) => onVolumeChange(value[0])}
//                 max={1.0}
//                 min={0.1}
//                 step={0.1}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-xs text-gray-500">
//                 <span>เบา</span>
//                 <span>ปกติ</span>
//                 <span>ดัง</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Preview */}
//         <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
//           <div className="flex items-center gap-2 text-sm text-blue-800">
//             <Settings className="h-4 w-4" />
//             <span className="font-medium">การตั้งค่าปัจจุบัน:</span>
//             <span>
//               {speakerOptions.find((s) => s.value === speaker)?.name} | ความเร็ว {speed.toFixed(1)}x | ระดับเสียง{" "}
//               {Math.round(volume * 100)}%
//             </span>
//           </div>
//           <p className="text-xs text-blue-600 mt-2">
//             💡 คลิกปุ่ม <Play className="inline h-3 w-3" /> เพื่อฟังเสียงตัวอย่างของแต่ละโทนเสียง
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }


"use client"

import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Volume2, Gauge, User, Play, Loader2 } from "lucide-react"

interface VoiceSettingsProps {
  speed: number
  volume: number
  speaker: string
  language: string
  onSpeedChange: (speed: number) => void
  onVolumeChange: (volume: number) => void
  onSpeakerChange: (speaker: string) => void
  onPlaySample?: (speakerId: string, speakerName: string) => void
  isLoadingSample?: string | null
}

export default function VoiceSettings({
  speed,
  volume,
  speaker,
  language,
  onSpeedChange,
  onVolumeChange,
  onSpeakerChange,
  onPlaySample,
  isLoadingSample,
}: VoiceSettingsProps) {

  // เพิ่มเสียง ด้วย api id จาก botnoi
  const speakerOptions = [
    { value: "1", label: "อวา (วัยรุ่น)", description: "เล่าเรื่อง, อ่านข่าว", name: "อวา", language: "th" },
    { value: "2", label: "โบ (วัยเด็ก)", description: "เล่าเรื่อง, นิทาน", name: "โบ", language: "th" },
    { value: "3", label: "คุณงาม (วัยผู้ใหญ่)", description: "เล่าเรื่อง, บรรยาย", name: "คุณงาม", language: "th" },
    { value: "4", label: "แม็กซ์ (ผู้ชาย)", description: "เล่าเรื่อง, อ่านข่าว", name: "แม็กซ์", language: "th" },
    { value: "5", label: "อลัน (ผู้ชาย)", description: "เล่าเรื่อง, อ่านข่าว", name: "อลัน", language: "th" },
    { value: "6", label: "ไซเรน (วัยรุ่น)", description: "เล่าเรื่อง, อ่านข่าว", name: "ไซเรน", language: "th" },
    { value: "7", label: "อลิสา (วัยรุ่น)", description: "เล่าเรื่อง, บรรยาย", name: "อลิสา", language: "th" },
    { value: "8", label: "เลโอ (ผู้ชาย)", description: "อ่านข่าว, สารคดี", name: "เลโอ", language: "th" },
    { value: "9", label: "นาเดียร์ (วัยรุ่น)", description: "เล่าเรื่อง, บรรยาย", name: "นาเดียร์", language: "en" },
    { value: "11", label: "วนิลา (วัยรุ่น)", description: "เล่าเรื่อง, สารคดี", name: "วนิลา", language: "th" },
    { value: "13", label: "อนันดา (วัยเด็ก)", description: "เล่านิทาน, อนิเมะ", name: "อนันดา", language: "th" },
    { value: "14", label: "ไอลีน (วัยรุ่น)", description: "บรรยาย, อนิเมะ", name: "ไอลีน", language: "th" },
    { value: "15", label: "ฮิโระ (วัยรุ่น)", description: "เล่าเรื่อง, อนิเมะ", name: "ฮิโระ", language: "th" },
    { value: "16", label: "ครูดีดี๊ (วัยผู้ใหญ่)", description: "เล่าเรื่อง, บรรยาย", name: "ครูดีดี๊", language: "th" },
    { value: "17", label: "เจ้าเนิร์ด (วัยรุ่น)", description: "เล่าเรื่อง, บรรยาย", name: "เจ้าเนิร์ด", language: "th" },
  ]

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings className="h-5 w-5 text-blue-600" />
          การตั้งค่าเสียง
        </CardTitle>
        <CardDescription>ปรับแต่งโทนเสียง ความเร็ว และระดับเสียงตามความต้องการ</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Speaker Selection */}
          <div className="space-y-3 lg:col-span-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">โทนเสียง</label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {speakerOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    speaker === option.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => onSpeakerChange(option.value)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            speaker === option.value ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        />
                        <span className="font-medium text-sm">{option.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                      <p className="text-xs text-blue-600 mt-1 font-medium">{option.name}</p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-2 h-8 w-8 p-0 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        onPlaySample?.(option.value, option.name)
                      }}
                      disabled={isLoadingSample === option.value}
                    >
                      {isLoadingSample === option.value ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Speed & Volume Controls */}
          <div className="space-y-6">
            {/* Speed */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">
                  ความเร็ว: <span className="font-bold text-blue-600">{speed.toFixed(1)}x</span>
                </label>
              </div>
              <Slider
                value={[speed]}
                onValueChange={(value) => onSpeedChange(value[0])}
                max={2.0}
                min={0.5}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>ช้า</span>
                <span>ปกติ</span>
                <span>เร็ว</span>
              </div>
            </div>

            {/* Volume */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">
                  ระดับเสียง: <span className="font-bold text-blue-600">{Math.round(volume * 100)}%</span>
                </label>
              </div>
              <Slider
                value={[volume]}
                onValueChange={(value) => onVolumeChange(value[0])}
                max={1.0}
                min={0.1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>เบา</span>
                <span>ปกติ</span>
                <span>ดัง</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <Settings className="h-4 w-4" />
            <span className="font-medium">การตั้งค่าปัจจุบัน:</span>
            <span>
              {speakerOptions.find((s) => s.value === speaker)?.name} | ความเร็ว {speed.toFixed(1)}x | ระดับเสียง{" "}
              {Math.round(volume * 100)}%
            </span>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            💡 คลิกปุ่ม <Play className="inline h-3 w-3" /> เพื่อฟังเสียงตัวอย่างของแต่ละโทนเสียง
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
