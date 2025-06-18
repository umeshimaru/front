import type { ReactNode } from 'react';

export interface CardProps {
  title: string;
  description: ReactNode;
}

// 以下の型定義は不要になりました（コンポーネント内で直接定義）
// export interface SectionHeadingProps {
//   title: string
//   subtitle?: string
//   className?: string
// }

// export interface FeatureProps {
//   title: string
//   description: string
//   imageSrc: string
//   imageAlt: string
// }
