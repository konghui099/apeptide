import { redirect } from 'next/navigation';

export default function RootPage() {
  // 强制跳转到中文页面
  redirect('/zh');
}
