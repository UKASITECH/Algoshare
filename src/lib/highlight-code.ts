const languageMap: Record<string, string> = {
  python: "python",
  javascript: "javascript",
  typescript: "typescript",
  java: "java",
  cpp: "cpp",
  c: "c",
  go: "go",
  rust: "rust",
  plaintext: "txt",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function highlightCode(code: string, language: string) {
  try {
    const { codeToHtml } = (await import("shiki")) as any;
    return await codeToHtml(code, {
      lang: languageMap[language] ?? language,
      theme: "github-dark",
    });
  } catch {
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}
