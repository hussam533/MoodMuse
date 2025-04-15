import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="pt-16 flex-grow">
        <div className="container px-4 py-12 md:py-24 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground">How MoodMuse protects your data and respects your privacy</p>
            </div>

            <div className="space-y-6 prose dark:prose-invert max-w-none">
              <p>
                <strong>Last Updated:</strong> April 15, 2025
              </p>

              <h2>Introduction</h2>
              <p>
                MoodMuse ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
                how your personal information is collected, used, and disclosed by MoodMuse.
              </p>
              <p>
                This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service")
                alongside our application, MoodMuse. By accessing or using our Service, you signify that you have read,
                understood, and agree to our collection, storage, use, and disclosure of your personal information as
                described in this Privacy Policy.
              </p>

              <h2>Local Storage of Data</h2>
              <p>
                MoodMuse is designed with your privacy in mind. All your data, including mood entries, journal entries,
                and mood boards, are stored locally on your device using browser local storage. This means:
              </p>
              <ul>
                <li>Your data never leaves your device</li>
                <li>We do not collect, store, or have access to any of your personal data</li>
                <li>You have complete control over your information</li>
              </ul>
              <p>
                Please note that clearing your browser data or local storage will result in the loss of your saved
                information. We recommend periodically exporting your data if you wish to preserve it.
              </p>

              <h2>Information We Do Not Collect</h2>
              <p>MoodMuse does not collect:</p>
              <ul>
                <li>Personal identifiers (name, email address, phone number, etc.)</li>
                <li>Your mood entries or journal content</li>
                <li>Images or media you upload to mood boards</li>
                <li>Usage statistics or analytics data</li>
              </ul>

              <h2>Third-Party Services</h2>
              <p>
                MoodMuse does not integrate with third-party services that would collect your data. We do not use
                analytics tools, advertising networks, or other tracking technologies.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:hussam@example.com">hussam@example.com</a>.
              </p>

              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground">
                  Created by Hussam Jabar © {new Date().getFullYear()} MoodMuse
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
