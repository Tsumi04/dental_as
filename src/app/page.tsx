import { Button } from "@/src/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <SignUpButton>
        <Button>Sign Up</Button>
      </SignUpButton>
    </div>
  )
}