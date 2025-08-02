import "./globals.css";
import Providers from "@/components/Providers"; // adjust the path if needed

export const metadata = {
  title: "Your App",
  description: "Math Formula App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
