import { Footer } from "@/components/footer"
import { MoodTracker } from "@/components/mood-tracker"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container px-4 py-12 md:py-24 max-w-6xl mx-auto flex-grow">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-primary">MoodMuse</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Track your emotions, create visual mood boards, and journal your thoughts in one beautiful space
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get Started <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 p-6 border rounded-xl bg-card shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center">How are you feeling today?</h2>
          <MoodTracker />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="p-6 border rounded-xl bg-card shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

const features = [
  {
    icon: <span className="text-2xl">🧠</span>,
    title: "Mood Tracking",
    description: "Track your daily emotions with interactive sliders and visualize your mood patterns over time.",
  },
  {
    icon: <span className="text-2xl">🖼️</span>,
    title: "Visual Mood Boards",
    description: "Create beautiful collages with images, stickers, and notes to express your feelings visually.",
  },
  {
    icon: <span className="text-2xl">📓</span>,
    title: "Animated Journal",
    description: "Write daily entries with mood-based animations and backgrounds that reflect your emotions.",
  },
]
