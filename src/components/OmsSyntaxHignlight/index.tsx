import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  coyWithoutShadows,
  darcula,
} from 'react-syntax-highlighter/dist/esm/styles/prism'; // 代码高亮主题风格

// vscDarkPlus vscode 暗色主题
// darcula  webstorm 暗色主题
// coyWithoutShadows 上面展示的效果

type tProps = {
  textContent: string;
  language: string;
  darkMode?: boolean;
};

const them = {
  dark: vscDarkPlus,
  light: coyWithoutShadows,
};

const OmsSyntaxHighlight = (props: tProps) => {
  const { textContent, darkMode, language = 'txt' } = props;
  if (typeof darkMode === 'undefined') {
    them.light = darcula;
  }
  if (typeof darkMode === 'boolean') {
    them.light = coyWithoutShadows;
  }
  return (
    <SyntaxHighlighter
      showLineNumbers={true} // 是否展示左侧行数
      lineNumberStyle={{ color: '#ddd', fontSize: 10 }} // 左侧行数的样式
      style={darkMode ? them.dark : them.light} // 主题风格
      language={language} // 需要语言类型 如css, jsx , javascript 等
      PreTag="div"
    >
      {String(textContent).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

export default OmsSyntaxHighlight;
