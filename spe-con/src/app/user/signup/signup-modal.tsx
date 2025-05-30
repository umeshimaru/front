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
import { setCookie } from 'cookies-next';
import { isLoginAtom } from '@/app/atoms/isLoginState';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

// フォームのバリデーションスキーマ
const signupFormSchema = z
  .object({
    email: z.string().email({
      message: '有効なメールアドレスを入力してください',
    }),
    password: z.string().min(8, {
      message: 'パスワードは8文字以上で入力してください',
    }),
    password_confirmation: z
      .string()
      .min(8, { message: 'パスワード（確認）も8文字以上で入力してください' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードが一致しません',
    path: ['password_confirmation'],
  });

type SignupFormValues = z.infer<typeof signupFormSchema>;

interface SignupModalProps {
  onSuccess?: () => void;
  onSwitchToLogin: () => void;
}

export function SignupModal({ onSuccess, onSwitchToLogin }: SignupModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsLogin] = useAtom(isLoginAtom);
  const router = useRouter();

  // フォームの初期化
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const { setError } = form;

  // フォーム送信処理
  async function onSubmit(value: SignupFormValues) {
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      const data = await res.json();

      if (data.errors) {
        Object.entries(data.errors).forEach(([field, messages]) => {
          setError(field as keyof SignupFormValues, {
            type: 'server',
            message: Array.isArray(messages) ? messages.join('、') : String(messages),
          });
        });
        return;
      }

      setCookie('_access_token', res.headers.get('access-token'));
      setCookie('_client', res.headers.get('client'));
      setCookie('_uid', res.headers.get('uid'));
      setIsLogin(true);

      toast.success('😇 登録完了', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setTimeout(() => {
        router.push('/practice-menu');
      }, 2000);

      setTimeout(() => {
        if (onSuccess) onSuccess();
        form.reset();
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 py-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="sample@example.com"
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
                placeholder="8文字以上で入力"
                field={field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <PasswordInput
                name="password_confirmation"
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
            {isLoading ? '登録中...' : 'アカウント登録'}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-2 pb-6">
        <p className="text-gray-600 text-xs sm:text-sm">
          すでにアカウントをお持ちですか？{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-[#2d7f98] font-semibold hover:underline"
          >
            ログイン
          </button>
        </p>
      </div>
    </>
  );
}
