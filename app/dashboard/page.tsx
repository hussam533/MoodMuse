"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Footer } from "@/components/footer"
import { MoodAnalytics } from "@/components/mood-analytics"
import { MoodBoard } from "@/components/mood-board"
import { MoodTracker } from "@/components/mood-tracker"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useMoodStore } from "@/lib/store"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const { toast } = useToast()
  const { moods, loadMoods, journalEntries, addJournalEntry } = useMoodStore()
  const [journalContent, setJournalContent] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadMoods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSaveJournal = () => {
    if (!journalContent.trim()) {
      toast({
        title: "Entry cannot be empty",
        description: "Please write something in your journal entry.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    // Simulate saving delay
    setTimeout(() => {
      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        content: journalContent,
      }

      addJournalEntry(newEntry)

      toast({
        title: "Journal entry saved!",
        description: "Your thoughts have been recorded.",
      })

      setJournalContent("")
      setSaving(false)
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <DashboardShell>
        <DashboardHeader heading="Dashboard" text="Track your mood, create mood boards, and journal your thoughts.">
          <Button onClick={() => toast({ title: "Feature coming soon!" })}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </DashboardHeader>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{moods.length}</div>
              <p className="text-xs text-muted-foreground">+{Math.min(moods.length, 3)} since last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {moods.length ? (moods.reduce((acc, mood) => acc + mood.value, 0) / moods.length).toFixed(1) : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">+0.2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mood Boards</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">+1 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{journalEntries.length}</div>
              <p className="text-xs text-muted-foreground">+{Math.min(journalEntries.length, 2)} since last week</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="tracker" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tracker">Mood Tracker</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="moodboard">Mood Board</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
          </TabsList>
          <TabsContent value="tracker" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Mood Tracker</CardTitle>
                <CardDescription>How are you feeling today? Track your mood using the slider below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <MoodTracker />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mood Analytics</CardTitle>
                <CardDescription>View your mood patterns and trends over time.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <MoodAnalytics />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="moodboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mood Board Creator</CardTitle>
                <CardDescription>Create visual mood boards with images, stickers, and notes.</CardDescription>
              </CardHeader>
              <CardContent>
                <MoodBoard />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="journal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Journal</CardTitle>
                <CardDescription>Write your thoughts and feelings in your personal journal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Today I felt..."
                    className="min-h-[200px] resize-none"
                    value={journalContent}
                    onChange={(e) => setJournalContent(e.target.value)}
                  />
                  <Button onClick={handleSaveJournal} disabled={saving || !journalContent.trim()}>
                    {saving ? "Saving..." : "Save Entry"}
                  </Button>
                </div>

                {journalEntries.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-medium">Recent Entries</h3>
                    <div className="space-y-4">
                      {journalEntries
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 3)
                        .map((entry) => (
                          <div key={entry.id} className="p-4 border rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">
                                {new Date(entry.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {new Date(entry.date).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="whitespace-pre-wrap text-sm">{entry.content}</p>
                          </div>
                        ))}
                    </div>
                    <div className="text-center">
                      <Button variant="outline" asChild>
                        <Link href="/journal">View All Entries</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
      <Footer />
    </div>
  )
}
