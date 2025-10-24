import type { Metadata } from "next";
import "../styles/globals.css";
import { AppProvider } from "@/contexts/AppContext";
import { BuilderProvider } from "@/contexts/BuilderContext";
import { UserProvider } from "@/contexts/UserContext";

export const metadata: Metadata = {
  title: "Frontend Builder - SaaS Website & App Builder",
  description: "A powerful drag-and-drop SaaS website and app builder with AI integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <AppProvider>
            <BuilderProvider>
              {children}
            </BuilderProvider>
          </AppProvider>
        </UserProvider>
      </body>
    </html>
  );
}
