import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Paper, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface RichTextEditorProps {
  title?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  title = "Rich Text Editor",
  initialValue = '', 
  onChange 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Update content when initialValue changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const handleExecCommand = (command: string, value: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    onChange?.(newContent);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 1 }}>{title}</Typography>
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
          p: 2,
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