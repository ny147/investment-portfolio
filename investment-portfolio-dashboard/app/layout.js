import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <header className="bg-cyan-100 dark:bg-cyan-900 p-4 flex justify-between items-center">
            <span className="text-lg font-semibold">
              Investment Portfolio Dashboard
            </span>
            <ThemeToggle />
          </header>

          <main className="p-6">{children}</main>

          <footer className="bg-cyan-100 dark:bg-cyan-900 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
            © 2025 Investment Portfolio
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}


// hello world