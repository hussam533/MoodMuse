"use client"

import { useMoodStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"

export function MoodTracker() {
  const { addMood } = useMoodStore()
  const { toast } = useToast()
  const [moodValue, setMoodValue] = useState(5)
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)

  const getMoodEmoji = (value: number) => {
    if (value <= 2) return "😢"
    if (value <= 4) return "😕"
    if (value <= 6) return "😐"
    if (value <= 8) return "😊"
    return "😁"
  }

  const getMoodLabel = (value: number) => {
    if (value <= 2) return "Sad"
    if (value <= 4) return "Down"
    if (value <= 6) return "Neutral"
    if (value <= 8) return "Good"
    return "Great"
  }

  const getMoodColor = (value: number) => {
    if (value <= 2) return "from-blue-500 to-indigo-600"
    if (value <= 4) return "from-indigo-400 to-purple-500"
    if (value <= 6) return "from-purple-400 to-pink-500"
    if (value <= 8) return "from-pink-400 to-orange-500"
    return "from-orange-400 to-amber-500"
  }

  const handleSave = () => {
    setSaving(true)

    // Simulate saving delay
    setTimeout(() => {
      addMood({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        value: moodValue,
        notes: notes,
      })

      toast({
        title: "Mood saved!",
        description: `You're feeling ${getMoodLabel(moodValue).toLowerCase()} today.`,
      })

      setNotes("")
      setSaving(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <motion.div
          className={cn(
            "w-24 h-24 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-4xl",
            getMoodColor(moodValue),
          )}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {getMoodEmoji(moodValue)}
        </motion.div>
        <div className="text-center">
          <h3 className="text-2xl font-bold">{getMoodLabel(moodValue)}</h3>
          <p className="text-muted-foreground">{moodValue} / 10</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>😢 Sad</span>
          <span>😁 Great</span>
        </div>
        <Slider
          value={[moodValue]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => setMoodValue(value[0])}
          className="py-4"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium">
          Notes (optional)
        </label>
        <Textarea
          id="notes"
          placeholder="How are you feeling today? What's on your mind?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>

      <Button onClick={handleSave} className="w-full" disabled={saving}>
        {saving ? "Saving..." : "Save Mood"}
      </Button>
    </div>
  )
}
