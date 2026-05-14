// app/[locale]/page.tsx

import React from 'react';

// 这是一个简单的首页组件，用来测试页面是否能正常显示
export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🎉 网站部署成功！</h1>
      <p>这是你的国际化首页。</p>
    </div>
  );
}
