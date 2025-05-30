'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/app/common/components/layouts/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/common/components/layouts/ui/form';
import { Input } from '@/app/common/components/layouts/ui/input';
import { PasswordInput } from '../components/password-input';

// フォームのバリデーションスキーマ
const loginFormSchema = z.object({
  username: z.string().min(1, {
    message: 'ユーザー名を入力してください',
  }),
  password: z.string().min(1, {
    message: 'パスワードを入力してください',
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginModalProps {
  onSuccess?: () => void;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

export function LoginModal({ onSuccess, onSwitchToSignup, onForgotPassword }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  // フォームの初期化
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // フォーム送信処理
  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);

    try {
      // ここに実際のログイン処理を実装
      console.log(values);

      // 成功したら3秒後にコールバック実行（デモ用）
      setTimeout(() => {
        if (onSuccess) onSuccess();
        form.reset();
      }, 3000);
    } catch (error) {
      console.error('ログインエラー:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 py-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">ユーザー名</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ユーザー名を入力"
                    {...field}
                    className="h-9 sm:h-10 text-sm sm:text-base"
                  />
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
                placeholder="パスワードを入力"
                field={field}
              />
            )}
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs sm:text-sm text-[#2d7f98] hover:underline"
            >
              パスワードをお忘れですか？
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2d7f98] hover:bg-[#236a80] h-9 sm:h-10 text-sm sm:text-base mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-2 pb-6">
        <p className="text-gray-600 text-xs sm:text-sm">
          アカウントをお持ちでないですか？{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-[#2d7f98] font-semibold hover:underline"
          >
            新規登録
          </button>
        </p>
      </div>
    </>
  );
}
