import { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField,
} from '@mui/material';
import { SKILL_CATEGORIES } from '../data/skillData.js';

// level은 화면에 보이지 않지만, 홈 탭의 정렬 기능이 쓰므로 기본값을 넣어 둔다.
const EMPTY_FORM = { name: '', category: SKILL_CATEGORIES[0], level: 50, description: '' };

// 스킬 이름, 카테고리, 설명을 받아 onAdd로 넘긴다. 저장은 부모가 맡는다.
function AddSkillDialog({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd({ ...form, name: form.name.trim(), description: form.description.trim() });
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
          sx: { borderRadius: 0, boxShadow: 'none', border: 1, borderColor: 'text.primary' },
        },
      }}
    >
      <DialogTitle sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 700 })}>
        스킬 추가
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            label="스킬 이름"
            required
            value={form.name}
            onChange={handleChange('name')}
            slotProps={{ htmlInput: { maxLength: 20 } }}
          />
          <TextField select label="카테고리" value={form.category} onChange={handleChange('category')}>
            {SKILL_CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="설명 (선택)"
            value={form.description}
            onChange={handleChange('description')}
            slotProps={{ htmlInput: { maxLength: 60 } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} sx={{ minHeight: 48, borderRadius: 0 }}>취소</Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ minHeight: 48, borderRadius: 0, '&:hover': { bgcolor: 'accent.main' } }}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSkillDialog;
