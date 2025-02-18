import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Paper, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue = '', onChange }) => {
  const [savedUserData, setSavedUserData] = useState<any[]>([]);
  const [content, setContent] = useState(initialValue);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData') || '[]');
    setSavedUserData(data);
  }, []);

  const handleExecCommand = (command: string, value: string = '') => {
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

  const formatUserData = () => {
    return `
      <style>
        .user-entry {
          margin: 0px 0;
          padding: 3px;
          border-bottom: 1px solid #ccc;
        }
        .user-entry:first-child {
          margin-top: 0;
        }
        .user-entry:last-child {
          margin-bottom: 0px;
          border-bottom: none;
        }
        .user-entry h3 {
          font-size: 16px;
          color: #1E3C72;
        }
        .user-entry p {
          margin: 0 0 9px 0;
          font-size: 14px;
        }
      </style>
      ${savedUserData.map((user, index) => `
        <div class="user-entry">
          <h3>User ${index + 1}</h3>
          <p><strong>ID:</strong> ${user.id}</p>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
        </div>
      `).join('')}
    `;
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = formatUserData();
    }
  }, [savedUserData]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Saved User Data</Typography>
      <ButtonGroup variant="outlined" sx={{ mb: 1 }}>
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
          p: 1.5,
          minHeight: '200px',
          maxHeight: '400px',
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: '100%',
          overflowY: 'auto',
          overflowX: 'hidden'
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
            width: '100%',
            maxWidth: '100%',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        />
      </Paper>
    </Box>
  );
};

export default RichTextEditor;