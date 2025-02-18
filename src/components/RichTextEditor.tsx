import React, { useState, useEffect } from 'react';
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

  const handleExecCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
  };

  useEffect(() => {
    onChange?.(content);
  }, [content, onChange]);

  return (
    <Box sx={{ width: '100%' }}>
      <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
        <Button onClick={() => handleExecCommand('bold')}>
          <FormatBoldIcon />
        </Button>
        <Button onClick={() => handleExecCommand('italic')}>
          <FormatItalicIcon />
        </Button>
        <Button onClick={() => handleExecCommand('underline')}>
          <FormatUnderlinedIcon />
        </Button>
        <Button onClick={() => handleExecCommand('insertUnorderedList')}>
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
          contentEditable
          style={{ outline: 'none', minHeight: '100%' }}
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Paper>
    </Box>
  );
};

export default RichTextEditor;