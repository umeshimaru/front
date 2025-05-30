import { PracticeMenu } from '@/app/practice-menu/components/practice-menu';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <PracticeMenu />
      </div>
    </main>
  );
}
