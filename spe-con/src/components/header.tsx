"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, UserPlus, LogIn } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b bg-[#f5f9fa]">
      <div className="container mx-auto px-0 md:px-8 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-2 pl-2 md:pl-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-03-07%2013.40.50-Sh3mxumoyZlU8mgCnbkW1Up6MqnUYV.png"
              alt="SPECON Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <Link href="/" className="text-[#2d7f98] text-xl font-bold">
              SPECON
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6 pr-2 md:pr-0">
            <Link
              href="/signup"
              className="text-[#2d7f98] text-base font-bold hover:underline transition-colors flex items-center gap-1.5"
            >
              <UserPlus size={18} />
              <span>サインアップ</span>
            </Link>
            <Link
              href="/login"
              className="text-[#2d7f98] text-base font-bold hover:underline transition-colors flex items-center gap-1.5"
            >
              <LogIn size={18} />
              <span>ログイン</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="relative md:hidden pr-2">
            <button
              ref={menuButtonRef}
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Mobile menu dropdown */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 top-full mt-2 w-44 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-100"
              >
                <nav className="flex flex-col">
                  <Link
                    href="/signup"
                    className="text-[#2d7f98] text-base font-bold hover:bg-gray-100 px-4 py-3 transition-colors flex items-center gap-1.5"
                  >
                    <UserPlus size={18} />
                    <span>サインアップ</span>
                  </Link>
                  <Link
                    href="/login"
                    className="text-[#2d7f98] text-base font-bold hover:bg-gray-100 px-4 py-3 transition-colors flex items-center gap-1.5"
                  >
                    <LogIn size={18} />
                    <span>ログイン</span>
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
