import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TechStack from './TechStack.jsx';

// 모바일에서는 전체 화면, 데스크톱에서는 일반 팝업으로 보여 준다.
function ProjectDetailDialog({ project, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={Boolean(project)}
      onClose={onClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth="sm"
      // 팝업도 흰 바탕에 각진 모서리, 검정 테두리로 맞춘다.
      slotProps={{ paper: { sx: { borderRadius: 0, boxShadow: 'none', border: 1, borderColor: 'text.primary' } } }}
    >
      {project && (
        <>
          <DialogTitle sx={(currentTheme) => ({ fontFamily: currentTheme.typography.fontFamilyPoint, fontWeight: 700 })}>
            {project.title}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Box
                component="img"
                src={project.thumbnail_url}
                alt={`${project.title} 스크린샷`}
                sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', objectPosition: 'top', border: 1, borderColor: 'text.primary' }}
              />
              <Typography>{project.description}</Typography>
              <TechStack items={project.tech_stack} />
              <Typography variant="body2" color="text.secondary">
                등록일: {new Date(project.created_at).toLocaleDateString('ko-KR')}
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={onClose} sx={{ minHeight: 48, borderRadius: 0, '&:hover': { color: 'accent.main' } }}>
              닫기
            </Button>
            <Button
              variant="contained"
              href={project.detail_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ minHeight: 48, borderRadius: 0, '&:hover': { bgcolor: 'accent.main' } }}
            >
              사이트 방문
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default ProjectDetailDialog;
