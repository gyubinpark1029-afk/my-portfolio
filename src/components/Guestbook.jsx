import { useCallback, useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import supabase from '../supabaseClient.js';
import GuestbookForm from './GuestbookForm.jsx';
import GuestbookList from './GuestbookList.jsx';

function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadEntries = useCallback(async () => {
    // 이메일/전화번호는 비공개라서 공개 컬럼만 골라 읽는다.
    const { data, error } = await supabase
      .from('guestbook')
      .select('id, name, message, emoji, rating, created_at')
      .order('created_at', { ascending: false });
    setHasError(Boolean(error));
    setEntries(data ?? []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  return (
    <Stack spacing={3} sx={{ mt: 5 }}>
      <Typography variant="h6" component="h3" sx={{ textAlign: 'left' }}>방명록 🧡</Typography>
      <GuestbookForm onSubmitted={loadEntries} />
      <GuestbookList entries={entries} isLoading={isLoading} hasError={hasError} />
    </Stack>
  );
}

export default Guestbook;
