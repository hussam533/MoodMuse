import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} MoodMuse. Created by{" "}
          <span className="font-medium text-foreground">Hussam Jabar</span>
        </p>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <a
            href="https://github.com/hussamjabar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
