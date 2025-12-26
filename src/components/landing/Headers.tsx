import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Headers() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="DentWise Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-semibold text-base sm:text-lg text-white hidden sm:inline">
            DentWise
          </span>
        </Link>
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How it Works
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-4 shrink-0 ml-auto">
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
              Login
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="sm" className="text-xs sm:text-sm px-3 sm:px-4">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  );
}
