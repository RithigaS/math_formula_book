"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";

// Header component with navigation and user info
export default function Header() {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          📐 Math Formulae Notebook
        </Link>

        <nav className={styles.nav}>
          {session ? (
            <>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
              <Link href="/add" className={styles.navLink}>
                Add Formula
              </Link>
              <Link href="/myformulas" className={styles.navLink}>
                MyFormula
              </Link>
              <div className={styles.userInfo}>
                <img
                  src={session.user.image}
                  alt="Profile"
                  className={styles.avatar}
                />
                <span className={styles.userName}>{session.user.name}</span>
                <button onClick={() => signOut()} className={styles.signOutBtn}>
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
