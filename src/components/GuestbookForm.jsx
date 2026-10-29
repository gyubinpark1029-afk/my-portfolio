import { useState } from 'react';
import { Alert, Box, Button, Rating, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import supabase from '../supabaseClient.js';

const EMOJIS = ['😊', '😍', '🥰', '👍', '🎉', '🔥'];
const EMPTY_FORM = { name: '', message: '', email: '', phone: '', emoji: EMOJIS[0], rating: null };

function GuestbookForm({ onSubmitted }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setErrorMessage('');
    const { error } = await supabase.from('guestbook').insert({
      name: form.name.trim(),
      message: form.message.trim(),
      // 비워 둔 선택 항목은 빈 문자열 대신 null로 저장한다.
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      emoji: form.emoji,
      rating: form.rating,
    });
    setIsSending(false);
    if (error) {
      setErrorMessage('저장하지 못했어요. 잠시 뒤에 다시 시도해 주세요.');
      return;
    }
    setForm(EMPTY_FORM);
    onSubmitted();
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ p: 3, borderRadius: 1, bgcolor: 'background.paper', color: 'text.primary', textAlign: 'left' }}
    >
      <Typography variant="h6" component="h3">방명록 남기기 ✍️</Typography>
      <TextField label="이름" required value={form.name} onChange={handleChange('name')} slotProps={{ htmlInput: { maxLength: 20 } }} />
      <TextField
        label="내용"
        required
        multiline
        minRows={3}
        value={form.message}
        onChange={handleChange('message')}
        slotProps={{ htmlInput: { maxLength: 500 } }}
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <TextField label="이메일 (선택, 비공개)" type="email" value={form.email} onChange={handleChange('email')} slotProps={{ htmlInput: { maxLength: 100 } }} />
        <TextField label="전화번호 (선택, 비공개)" type="tel" value={form.phone} onChange={handleChange('phone')} slotProps={{ htmlInput: { maxLength: 20 } }} />
      </Box>
      <Stack direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={form.emoji}
          onChange={(_, value) => value && setForm((prev) => ({ ...prev, emoji: value }))}
          aria-label="이모지 선택"
        >
          {EMOJIS.map((emoji) => (
            <ToggleButton key={emoji} value={emoji}>{emoji}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Rating value={form.rating} onChange={(_, value) => setForm((prev) => ({ ...prev, rating: value }))} />
      </Stack>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Button type="submit" variant="contained" color="warning" disabled={isSending}>
        {isSending ? '남기는 중...' : '남기기'}
      </Button>
    </Stack>
  );
}

export default GuestbookForm;
