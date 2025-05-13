"use client"
import type { ReactNode } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/common/components/layouts/ui/dialog"
import { type AuthMode, AUTH_MODAL_CONFIG } from "@/app/types/modal"
import { SignupModal } from "../signup/signup-modal"
import { LoginModal } from "../login/login-modal"

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  children: ReactNode
  className?: string
}

function BaseModal({ isOpen, onClose, title, description, children, className = "" }: BaseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`w-[90vw] max-w-md rounded-lg p-0 sm:p-6 overflow-hidden ${className}`}>
        <div className="relative">
          <DialogHeader className="pt-6 px-6 sm:pt-8">
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-[#1a1a4b]">{title}</DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">{description}</DialogDescription>
          </DialogHeader>

          <div className="px-4 sm:px-6">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// 認証モーダル用のラッパーコンポーネント
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  mode: AuthMode
  onSwitchMode: (mode: AuthMode) => void
}

export function Modal({ isOpen, onClose, mode, onSwitchMode }: ModalProps) {
  const config = AUTH_MODAL_CONFIG[mode]

  const renderForm = () => {
    switch (mode) {
      case "login":
        return (
          <LoginModal
            onSuccess={onClose}
            onSwitchToSignup={() => onSwitchMode("signup")}
            onForgotPassword={() => onSwitchMode("forgot-password")}
          />
        )
      case "signup":
        return <SignupModal onSuccess={onClose} onSwitchToLogin={() => onSwitchMode("login")} />
      case "forgot-password":
        return <div className="py-4">パスワードリセット機能は準備中です。</div>
      default:
        return null
    }
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={config.title} description={config.description}>
      {renderForm()}
    </BaseModal>
  )
}
