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
const loginFormSchema = z.object({
  email: z.string().email({
    message: '有効なメールアドレスを入力してください',
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
  const [, setIsLogin] = useAtom(isLoginAtom);
  const router = useRouter();

  // フォームの初期化
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { setError } = form;

 
  // フォーム送信処理
  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      
      console.log(data)
      if (data.errors) {
        Object.entries(data.errors).forEach(([field, messages]) => {
          setError(field as keyof LoginFormValues , {
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

      toast.success('😇 ログインしました', {
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
    <ToastContainer / >
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
