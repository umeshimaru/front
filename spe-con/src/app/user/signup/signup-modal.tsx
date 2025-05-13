"use client"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/app/common/components/layouts/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/common/components/layouts/ui/form"
import { Input } from "@/app/common/components/layouts/ui/input"
import { PasswordInput } from "../components/password-input"

// フォームのバリデーションスキーマ
const signupFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "名前は2文字以上で入力してください",
    }),
    password: z.string().min(8, {
      message: "パスワードは8文字以上で入力してください",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupFormSchema>

interface SignupModalProps {
  onSuccess?: () => void
  onSwitchToLogin: () => void
}

export function SignupModal({ onSuccess, onSwitchToLogin }: SignupModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  // フォームの初期化
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  // フォーム送信処理
  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true)

    try {
      // ここに実際のサインアップ処理を実装
      console.log(values)

      // 成功したら3秒後にコールバック実行（デモ用）
      setTimeout(() => {
        if (onSuccess) onSuccess()
        form.reset()
      }, 3000)
    } catch (error) {
      console.error("サインアップエラー:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">お名前</FormLabel>
                <FormControl>
                  <Input placeholder="山田 太郎" {...field} className="h-9 sm:h-10 text-sm sm:text-base" />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                name="password"
                label="パスワード"
                placeholder="8文字以上で入力"
                field={field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <PasswordInput
                name="confirmPassword"
                label="パスワード（確認）"
                placeholder="パスワードを再入力"
                field={field}
              />
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#2d7f98] hover:bg-[#236a80] h-9 sm:h-10 text-sm sm:text-base mt-2"
            disabled={isLoading}
          >
            {isLoading ? "登録中..." : "アカウント登録"}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-2 pb-6">
        <p className="text-gray-600 text-xs sm:text-sm">
          すでにアカウントをお持ちですか？{" "}
          <button onClick={onSwitchToLogin} className="text-[#2d7f98] font-semibold hover:underline">
            ログイン
          </button>
        </p>
      </div>
    </>
  )
}
