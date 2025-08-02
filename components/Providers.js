"use client";

import { SessionProvider } from "next-auth/react"; // if using next-auth

export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
