import { useState } from 'react';
import {
  Box, Button, Card, CardActions, CardContent, CircularProgress, Skeleton, Stack, Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import TechStack from './TechStack.jsx';
import getGithubUrl from '../utils/getGithubUrl.js';

const LOADING_MS = 1500;

function ProjectCard({ project, onOpenDetails }) {
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
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        // 터치 화면에서는 누르는 순간 살짝 눌리는 피드백을 준다.
        '&:active': { transform: 'scale(0.98)' },
        // 마우스가 있는 기기에서만 썸네일을 확대한다.
        '@media (hover: hover)': { '&:hover img.thumb': { transform: 'scale(1.2)' } },
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', bgcolor: 'divider' }}>
        {!isImageLoaded && (
          <Skeleton variant="rectangular" sx={{ position: 'absolute', inset: 0, height: '100%' }} />
        )}
        <Box
          component="img"
          className="thumb"
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
            transition: 'transform 0.2s',
            opacity: isImageLoaded ? 1 : 0,
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1.5}>
          <Typography variant="h6" component="h3">{project.title}</Typography>
          <Typography
            color="text.secondary"
            sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {project.description}
          </Typography>
          <TechStack items={project.tech_stack} />
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          onClick={handleLiveDemo}
          disabled={isOpening}
          startIcon={isOpening ? <CircularProgress size={16} color="inherit" /> : <OpenInNewIcon />}
          sx={{ minHeight: 48 }}
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
            sx={{ minHeight: 48 }}
          >
            GitHub
          </Button>
        )}
        <Button onClick={() => onOpenDetails(project)} sx={{ minHeight: 48 }}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
