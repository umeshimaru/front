'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, UserPlus, LogIn, LogOut } from 'lucide-react';
import { Modal } from '@/app/user/components/modal';
import type { AuthMode } from '@/app/types/modal';
import { getCookie, deleteCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import { isLoginAtom } from '@/app/atoms/isLoginState';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const router = useRouter();

  useEffect(() => {
    const accessToken = getCookie('_access_token');
    if (accessToken) setIsLogin(true);
  });

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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAuthClick = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const logout = async () => {
    const accessToken = getCookie('_access_token');
    const client = getCookie('_client');
    const uid = getCookie('_uid');

    if (!accessToken || !client || !uid) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_out`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'access-token': String(accessToken),
          client: String(client),
          uid: String(uid),
        },
      });
      deleteCookie('_access_token');
      deleteCookie('_client');
      deleteCookie('_uid');
      setIsLogin(false);
      console.log(res)
      toast.warn('👋 ログアウトしました', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
      router.push('/');
    } catch {
    } finally {
    }
  };
  return (
    <>
      <header className="border-b bg-[#f5f9fa]">
        <ToastContainer />
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
              {!isLogin && (
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="text-[#2d7f98] text-base font-bold hover:underline transition-colors flex items-center gap-1.5"
                >
                  <UserPlus size={18} />
                  <span>サインアップ</span>
                </button>
              )}
              {!isLogin && (
                <button
                  onClick={() => handleAuthClick('login')}
                  className="text-[#2d7f98] text-base font-bold hover:underline transition-colors flex items-center gap-1.5"
                >
                  <LogIn size={18} />
                  <span>ログイン</span>
                </button>
              )}

              {isLogin && (
                <button
                  onClick={logout}
                  className="text-[#2d7f98] text-base font-bold hover:underline transition-colors flex items-center gap-1.5 hover:text-[#236b7e]"
                >
                  <LogOut size={18} />
                  <span>ログアウト</span>
                </button>
              )}
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
                    {!isLogin && (
                      <button
                        onClick={() => handleAuthClick('signup')}
                        className="text-[#2d7f98] text-base font-bold hover:bg-gray-100 px-4 py-3 transition-colors flex items-center gap-1.5 w-full text-left"
                      >
                        <UserPlus size={18} />
                        <span>サインアップ</span>
                      </button>
                    )}
                    {!isLogin && (
                      <button
                        onClick={() => handleAuthClick('login')}
                        className="text-[#2d7f98] text-base font-bold hover:bg-gray-100 px-4 py-3 transition-colors flex items-center gap-1.5 w-full text-left"
                      >
                        <LogIn size={18} />
                        <span>ログイン</span>
                      </button>
                    )}
                    {isLogin && (
                      <button
                        onClick={logout}
                        className="text-[#2d7f98] text-base font-bold hover:bg-gray-100 px-4 py-3 transition-colors flex items-center gap-1.5 w-full text-left"
                      >
                        <LogOut size={18} />
                        <span>ログアウト</span>
                      </button>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </>
  );
}
