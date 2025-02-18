import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Paper } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue = '', onChange }) => {
  const [content, setContent] = useState(initialValue);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleExecCommand = (command: string, value: string = '') => {
    // Focus the editor before executing command
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onChange?.(newContent);
  };

  // Ensure the cursor is placed at the end of content when focusing
  const handleFocus = () => {
    const el = editorRef.current;
    if (el) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
        <Button 
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleExecCommand('bold')}
        >
          <FormatBoldIcon />
        </Button>
        <Button 
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleExecCommand('italic')}
        >
          <FormatItalicIcon />
        </Button>
        <Button 
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleExecCommand('underline')}
        >
          <FormatUnderlinedIcon />
        </Button>
        <Button 
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleExecCommand('insertUnorderedList')}
        >
          <FormatListBulletedIcon />
        </Button>
      </ButtonGroup>
      <Paper 
        sx={{ 
          p: 2, 
          minHeight: '200px',
          border: '1px solid #ccc',
        }}
      >
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={handleFocus}
          suppressContentEditableWarning
          className="rich-text-editor"
          style={{
            minHeight: '100%',
            outline: 'none',
            padding: '8px',
            overflowY: 'auto'
          }}
        />
      </Paper>
    </Box>
  );
};

export default RichTextEditor;