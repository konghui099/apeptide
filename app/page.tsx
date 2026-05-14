import { redirect } from 'next/navigation';

export default function RootPage() {
  // 这里假设你的默认语言是 'zh'，如果是英文就改成 'en'
  redirect('/en');
}
