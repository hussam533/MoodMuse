"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useMoodStore } from "@/lib/store"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

export default function JournalPage() {
  const { toast } = useToast()
  const { journalEntries, addJournalEntry } = useMoodStore()
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSaveEntry = () => {
    if (!content.trim()) {
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
        content: content,
      }

      addJournalEntry(newEntry)

      toast({
        title: "Journal entry saved!",
        description: "Your thoughts have been recorded.",
      })

      setContent("")
      setSaving(false)
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <DashboardShell>
        <DashboardHeader heading="Journal" text="Record your thoughts, feelings, and experiences.">
          <Button onClick={handleSaveEntry} disabled={saving || !content.trim()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Entry"}
          </Button>
        </DashboardHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>New Journal Entry</CardTitle>
              <CardDescription>Write about your day, thoughts, or feelings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Today I felt..."
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Previous Entries</h2>
          {journalEntries.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">No journal entries yet. Start writing today!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {journalEntries
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((entry) => (
                  <Card key={entry.id}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{entry.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </DashboardShell>
      <Footer />
    </div>
  )
}
