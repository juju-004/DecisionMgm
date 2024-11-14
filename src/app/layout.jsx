import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import UserContextProvider from "../hooks/Context";

export const metadata = {
  title: "Next Shadcn",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"overflow-hidden"} suppressHydrationWarning={true}>
        <Providers>
          <Toaster />
          <UserContextProvider>{children}</UserContextProvider>
        </Providers>
      </body>
    </html>
  );
}
