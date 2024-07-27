import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ui/ThemeToggler";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center space-x-2"
      >
        <div className="bg-[#0160FE] w-fit">
          <Image
            src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
            alt="Logo"
            className="invert"
            height={50}
            width={50}
          />
        </div>
        <h1 className="font-bold text-xl">DropBox 📦</h1>
      </Link>

      <div className="px-2 flex space-x-2 items-center">
        {/* theme BTN */}
        <ThemeToggle />

        {/* Sign in BTN */}
        <UserButton afterSwitchSessionUrl="/" />

        <SignedOut>
          <SignInButton
            fallbackRedirectUrl="/dashboard"
            mode="modal"
          >
            <Button variant="outline">Sign in</Button>
          </SignInButton>
        </SignedOut>
        {/* Sign in BTN */}
      </div>
    </header>
  );
}

export default Header;
