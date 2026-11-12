import { useState } from 'react';
import {
  Box, Button, Card, CardActions, CardContent, CircularProgress, Link, Skeleton, Stack, Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import TechStack from './TechStack.jsx';
import getGithubUrl from '../utils/getGithubUrl.js';

const LOADING_MS = 1500;

// 버튼 3개를 한 줄에 같은 폭으로 놓는다. minWidth: 0이 있어야 좁은 화면에서 글자가 줄바꿈되지 않고 칸 안에 맞춰진다.
const ACTION_BUTTON_SX = {
  flex: 1,
  minWidth: 0,
  minHeight: 48,
  px: 1,
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  // 카드 전체가 링크일 때도 버튼은 따로 눌리도록 한다.
  pointerEvents: 'auto',
  // 레퍼런스처럼 각진 버튼. 검정 버튼에 마우스를 올리면 파란 포인트색으로 바뀐다.
  borderRadius: 0,
  '& .MuiButton-startIcon': { mr: 0.5, ml: 0 },
};

// onOpenDetails를 주면 "View Details" 버튼이 생기고, 주지 않으면 버튼이 없다.
// isCardLink가 true이면 카드 어디를 눌러도 프로젝트 사이트가 새 탭으로 열린다. (홈 화면용)
function ProjectCard({ project, onOpenDetails, isCardLink = false }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const githubUrl = getGithubUrl(project.detail_url);

  // 새 탭이 열리는 동안 버튼에 로딩 표시를 잠깐 보여 준다.
  const handleLiveDemo = () => {
    setIsOpening(true);
    window.open(project.detail_url, '_blank', 'noopener,noreferrer');
    setTimeout(() => setIsOpening(false), LOADING_MS);
  };

  return (
    <Card
      // 마우스를 올리면 커서가 글이 적힌 큰 원으로 바뀐다.
      data-cursor={isCardLink ? 'VISIT' : 'VIEW'}
      sx={{
        // 키보드로 카드 링크에 이동했을 때 카드 전체에 윤곽선이 보이게 한다.
        '&:has(.stretched-link:focus-visible)': { outline: '2px solid', outlineColor: 'accent.main', outlineOffset: 2 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        // 흰 바탕, 각진 모서리, 검정 테두리. 그림자 대신 테두리 색으로 반응을 보여 준다.
        borderRadius: 0,
        boxShadow: 'none',
        border: 1,
        borderColor: 'text.primary',
        bgcolor: 'background.paper',
        color: 'text.primary',
        transition: 'transform 0.2s, border-color 0.2s',
        // 터치 화면에서는 누르는 순간 살짝 눌리는 피드백을 준다.
        '&:active': { transform: 'scale(0.98)' },
        // 마우스가 있는 기기에서만 카드 전체를 확대한다. zIndex는 옆 카드 위로 올라오게 한다.
        '@media (hover: hover)': {
          '&:hover': { transform: 'scale(1.02)', zIndex: 1, borderColor: 'accent.main' },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '4 / 3',
          overflow: 'hidden',
          bgcolor: 'divider',
          borderBottom: 1,
          borderColor: 'text.primary',
        }}
      >
        {!isImageLoaded && (
          <Skeleton variant="rectangular" sx={{ position: 'absolute', inset: 0, height: '100%' }} />
        )}
        <Box
          component="img"
          src={project.thumbnail_url}
          alt={`${project.title} 스크린샷`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
            opacity: isImageLoaded ? 1 : 0,
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1.5}>
          <Typography
            variant="h6"
            component="h3"
            sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 500 })}
          >
            {isCardLink ? (
              // 제목을 링크로 만들고, ::after로 카드 전체를 덮어서 어디를 눌러도 이동하게 한다. (버튼은 위에 따로 올라온다)
              <Link
                className="stretched-link"
                href={project.detail_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} 사이트 열기 (새 탭)`}
                underline="none"
                color="inherit"
                sx={{ '&::after': { content: '""', position: 'absolute', inset: 0 }, '&:hover': { color: 'inherit' }, '&:focus-visible': { outline: 'none' } }}
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {project.description}
          </Typography>
          <TechStack items={project.tech_stack} />
        </Stack>
      </CardContent>
      <CardActions
        disableSpacing
        // 링크 모드에서는 버튼 사이의 빈 곳을 눌러도 카드 링크가 눌리도록 통과시킨다.
        sx={{ position: 'relative', px: 2, pb: 2, gap: 1, pointerEvents: isCardLink ? 'none' : 'auto' }}
      >
        <Button
          variant="contained"
          onClick={handleLiveDemo}
          disabled={isOpening}
          startIcon={isOpening ? <CircularProgress size={16} color="inherit" /> : <OpenInNewIcon />}
          sx={{ ...ACTION_BUTTON_SX, '&:hover': { bgcolor: 'accent.main' } }}
        >
          Live Demo
        </Button>
        {githubUrl && (
          <Button
            variant="outlined"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
            sx={{ ...ACTION_BUTTON_SX, borderColor: 'text.primary', '&:hover': { borderColor: 'accent.main', color: 'accent.main' } }}
          >
            GitHub
          </Button>
        )}
        {onOpenDetails && (
          <Button onClick={() => onOpenDetails(project)} sx={{ ...ACTION_BUTTON_SX, '&:hover': { color: 'accent.main' } }}>
            View Details
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
