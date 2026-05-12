'use client';

import { Check, Copy, FileText } from 'lucide-react';
import { isValidElement, type HTMLAttributes, type ReactNode, useEffect, useState } from 'react';

function getNodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return getNodeText(node.props.children);
  return '';
}

function getCodeClassName(node: ReactNode): string {
  if (isValidElement<{ className?: string; children?: ReactNode }>(node)) {
    return node.props.className ?? getCodeClassName(node.props.children);
  }

  if (Array.isArray(node)) {
    return node.map(getCodeClassName).find(Boolean) ?? '';
  }

  return '';
}

function getCodeLabel(className: string) {
  const language = className.match(/language-([a-z0-9_-]+)/i)?.[1];
  if (!language) return 'code';

  const labels: Record<string, string> = {
    bash: 'terminal',
    shell: 'terminal',
    sh: 'terminal',
    zsh: 'terminal',
    powershell: 'powershell',
    sql: 'sql',
    python: 'python',
    py: 'python',
    json: 'json',
    tsx: 'tsx',
    ts: 'typescript',
    js: 'javascript',
  };

  return labels[language] ?? language;
}

export function CodeBlock({ children, ...props }: HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const code = getNodeText(children).trimEnd();
  const label = getCodeLabel(getCodeClassName(children));

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyCode() {
    try {
      await window.navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopied(true);
  }

  return (
    <div className="q-code-block">
      <div className="q-code-block-header">
        <div className="q-code-block-title">
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>{label}</span>
        </div>
        <button
          type="button"
          className="q-code-copy"
          aria-label={copied ? 'Copied' : 'Copy code'}
          title={copied ? 'Copied' : 'Copy code'}
          onClick={copyCode}
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      <pre {...props}>{children}</pre>
    </div>
  );
}
