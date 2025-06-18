'use client';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import type { ControllerRenderProps, FieldValues, FieldPath } from 'react-hook-form';

interface PasswordInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  name: TName;
  label: string;
  placeholder: string;
  field: ControllerRenderProps<TFieldValues, TName>;
}

// confirmPassword用

export function PasswordInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ label, placeholder, field }: PasswordInputProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem>
      <FormLabel className="text-sm sm:text-base">{label}</FormLabel>
      <div className="relative">
        <FormControl>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            {...field}
            className="h-9 sm:h-10 text-sm sm:text-base pr-10"
          />
        </FormControl>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          <span className="sr-only">{showPassword ? 'パスワードを隠す' : 'パスワードを表示'}</span>
        </Button>
      </div>
      <FormMessage className="text-xs sm:text-sm" />
    </FormItem>
  );
}
