import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProjectCard from './ProjectCard.jsx';
import ProjectDetailDialog from './ProjectDetailDialog.jsx';
import supabase from '../supabaseClient.js';

const PREVIEW_COUNT = 4;

// 홈 화면용: 대표 프로젝트 몇 개만 보여 주고 전체 목록 페이지로 안내한다.
function ProjectsPreview() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('id, title, description, tech_stack, detail_url, thumbnail_url, created_at')
        .order('sort_order', { ascending: true })
        .limit(PREVIEW_COUNT);
      setProjects(data ?? []);
      setIsLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <Box sx={{ mt: 4, textAlign: 'left' }}>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress color="inherit" /></Box>
      )}
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpenDetails={setSelectedProject} />
        ))}
      </Box>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/projects"
          sx={{ minHeight: 48, borderRadius: 0, '&:hover': { bgcolor: 'accent.main' } }}
        >
          더 보기
        </Button>
      </Box>
      <ProjectDetailDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Box>
  );
}

export default ProjectsPreview;
