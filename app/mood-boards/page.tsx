"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Footer } from "@/components/footer"
import { MoodBoard } from "@/components/mood-board"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useMoodStore } from "@/lib/store"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

export default function MoodBoardsPage() {
  const { toast } = useToast()
  const { moodBoards, addMoodBoard } = useMoodStore()
  const [newBoardName, setNewBoardName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) {
      toast({
        title: "Board name required",
        description: "Please enter a name for your mood board.",
        variant: "destructive",
      })
      return
    }

    const newBoard = {
      id: Date.now().toString(),
      name: newBoardName,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addMoodBoard(newBoard)

    toast({
      title: "Mood board created!",
      description: `Your "${newBoardName}" mood board is ready to use.`,
    })

    setNewBoardName("")
    setIsDialogOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <DashboardShell>
        <DashboardHeader heading="Mood Boards" text="Create and manage your visual mood boards.">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Board
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Mood Board</DialogTitle>
                <DialogDescription>Give your mood board a name to get started.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Board Name</Label>
                  <Input
                    id="name"
                    placeholder="My Inspiration Board"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateBoard}>Create Board</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DashboardHeader>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Mood Board</CardTitle>
              <CardDescription>Create and customize your visual mood board.</CardDescription>
            </CardHeader>
            <CardContent>
              <MoodBoard />
            </CardContent>
          </Card>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your Mood Boards</h2>
            {moodBoards.length === 0 ? (
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                    No mood boards yet. Create your first one by clicking "New Board" above!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {moodBoards.map((board) => (
                  <Card key={board.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <span className="text-4xl">✨</span>
                    </div>
                    <CardHeader>
                      <CardTitle>{board.name}</CardTitle>
                      <CardDescription>Created {new Date(board.createdAt).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Open Board</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardShell>
      <Footer />
    </div>
  )
}
