import { useState } from 'react';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import supabase from '../supabaseClient.js';
import GuestbookField from './GuestbookField.jsx';
import GuestbookMood, { EMOJIS } from './GuestbookMood.jsx';

const EMPTY_FORM = { name: '', message: '', email: '', phone: '', emoji: EMOJIS[0], rating: null };
const MAX_MESSAGE_LENGTH = 500;

function GuestbookForm({ onSubmitted }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSending, setIsSending] = useState(false);
  const [isThanksOpen, setIsThanksOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleMoodChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
    setIsThanksOpen(true);
    onSubmitted();
  };

  return (
    <Stack
      component="form"
      spacing={3}
      onSubmit={handleSubmit}
      sx={{ p: 3, borderRadius: 1, bgcolor: 'background.paper', color: 'text.primary', textAlign: 'left' }}
    >
      <Typography variant="h6" component="h3">방명록 남기기 ✍️</Typography>
      <GuestbookField
        label="이름"
        placeholder="어떻게 불러드릴까요?"
        required
        icon={PersonIcon}
        value={form.name}
        onChange={handleChange('name')}
        slotProps={{ htmlInput: { maxLength: 20 } }}
      />
      <GuestbookField
        label="내용"
        placeholder="하고 싶은 말을 편하게 적어 주세요"
        required
        multiline
        minRows={4}
        icon={ChatBubbleIcon}
        value={form.message}
        onChange={handleChange('message')}
        helperText={`${form.message.length} / ${MAX_MESSAGE_LENGTH}`}
        slotProps={{ htmlInput: { maxLength: MAX_MESSAGE_LENGTH } }}
      />
      <GuestbookMood
        emoji={form.emoji}
        rating={form.rating}
        onEmojiChange={handleMoodChange('emoji')}
        onRatingChange={handleMoodChange('rating')}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        아래 연락처는 선택이에요. 적어 주셔도 화면에는 보이지 않아요 🔒
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <GuestbookField
          label="이메일"
          placeholder="example@email.com"
          type="email"
          icon={EmailIcon}
          value={form.email}
          onChange={handleChange('email')}
          slotProps={{ htmlInput: { maxLength: 100 } }}
        />
        <GuestbookField
          label="전화번호"
          placeholder="010-0000-0000"
          type="tel"
          icon={PhoneIcon}
          value={form.phone}
          onChange={handleChange('phone')}
          slotProps={{ htmlInput: { maxLength: 20 } }}
        />
      </Box>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Button type="submit" variant="contained" color="warning" size="large" endIcon={<SendIcon />} disabled={isSending}>
        {isSending ? '남기는 중...' : '남기기'}
      </Button>
      <Snackbar
        open={isThanksOpen}
        autoHideDuration={3000}
        onClose={() => setIsThanksOpen(false)}
        message="남겨 주셔서 고마워요 🧡"
      />
    </Stack>
  );
}

export default GuestbookForm;
