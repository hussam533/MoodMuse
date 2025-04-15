import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="pt-16 flex-grow">
        <div className="container px-4 py-12 md:py-24 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About MoodMuse</h1>
              <p className="text-xl text-muted-foreground">
                Your personal space for emotional well-being and creative expression
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <img src="/chromatic-emotions.png" alt="Mood visualization" className="rounded-lg shadow-lg" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Our Mission</h2>
                <p>
                  MoodMuse was created to help you track, understand, and express your emotions in a creative and
                  meaningful way. We believe that emotional awareness is key to personal growth and well-being.
                </p>
                <p>
                  By combining mood tracking with visual expression and journaling, MoodMuse offers a holistic approach
                  to emotional wellness that's both fun and insightful.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Key Features</h2>
              <div className="grid gap-6 md:grid-cols-3">
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

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Privacy First</h2>
              <p>
                Your privacy matters to us. All your data is stored locally on your device, giving you complete control
                over your personal information. We don't collect or store any of your mood data or journal entries on
                our servers.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Created by Hussam Jabar</h2>
              <p>
                MoodMuse was designed and developed by Hussam Jabar, a passionate developer focused on creating
                intuitive and helpful applications that improve people's lives. This project combines modern web
                technologies with thoughtful design to create a seamless experience for tracking and expressing
                emotions.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Get Started Today</h2>
              <p>
                Ready to begin your journey of emotional awareness and creative expression? Start using MoodMuse today
                and discover new insights about yourself.
              </p>
              <div className="flex justify-center pt-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
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
    title: "Journaling",
    description: "Write daily entries to reflect on your thoughts and feelings with a beautiful, intuitive interface.",
  },
]
