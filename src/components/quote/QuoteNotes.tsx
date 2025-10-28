import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

interface QuoteNotesProps {
  notes?: string;
}

// Utility function to convert text with URLs into clickable links
const parseTextWithLinks = (text: string): React.ReactNode[] => {
  if (!text) return [];

  // Regex to match URLs (http, https, or www)
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyCounter = 0;

  // Split by URLs and preserve line breaks
  const matches = Array.from(text.matchAll(urlRegex));
  
  if (matches.length === 0) {
    // No URLs found, just return the text with line breaks preserved
    return text.split('\n').map((line, idx, arr) => (
      <span key={`text-${idx}`}>
        {line}
        {idx < arr.length - 1 && <br key={`br-${idx}`} />}
      </span>
    ));
  }

  matches.forEach((match) => {
    const url = match[0];
    const matchStart = match.index!;
    const matchEnd = matchStart + url.length;

    // Add text before the URL
    if (matchStart > lastIndex) {
      const beforeText = text.substring(lastIndex, matchStart);
      if (beforeText) {
        const lines = beforeText.split('\n');
        lines.forEach((line, idx) => {
          if (idx > 0) {
            keyCounter++;
            parts.push(<br key={`br-${keyCounter}`} />);
          }
          if (line) {
            parts.push(line);
          }
        });
      }
    }

    // Add the clickable link
    const href = url.startsWith('http') ? url : `https://${url}`;
    keyCounter++;
    parts.push(
      <a
        key={`link-${keyCounter}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline break-all"
      >
        {url}
      </a>
    );

    lastIndex = matchEnd;
  });

  // Add remaining text after the last URL
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    const lines = remainingText.split('\n');
    lines.forEach((line, idx, arr) => {
      if (idx > 0) {
        keyCounter++;
        parts.push(<br key={`br-after-${keyCounter}`} />);
      }
      if (line || idx === arr.length - 1) {
        parts.push(line);
      }
    });
  }

  return parts;
};

export const QuoteNotes = ({ notes }: QuoteNotesProps) => {
  if (!notes || notes.trim() === "") {
    return null;
  }

  const parsedContent = parseTextWithLinks(notes);

  return (
    <Card className="border-primary/20 mx-2 sm:mx-0">
      <CardHeader className="p-2 sm:p-4">
        <CardTitle className="flex items-center gap-2 text-primary text-lg sm:text-xl">
          <StickyNote className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span>Ghi chú</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="text-sm sm:text-base whitespace-pre-wrap break-words">
          {parsedContent}
        </div>
      </CardContent>
    </Card>
  );
};

