import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import PageContainer from '../components/PageContainer.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import Reveal from '../components/Reveal.jsx';
import ProjectDetailDialog from '../components/ProjectDetailDialog.jsx';
import supabase from '../supabaseClient.js';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, tech_stack, detail_url, thumbnail_url, created_at')
        .order('sort_order', { ascending: true });
      setHasError(Boolean(error));
      setProjects(data ?? []);
      setIsLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <PageContainer maxWidth="lg">
      <Typography
        variant="h5"
        component="h2"
        sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 700 })}
      >
        Projects
      </Typography>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      )}
      {hasError && <Alert severity="error" sx={{ borderRadius: 0 }}>프로젝트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</Alert>}
      {!isLoading && !hasError && projects.length === 0 && (
        <Typography color="text.secondary">아직 등록된 프로젝트가 없어요.</Typography>
      )}
      {/* 모바일 1열 -> 태블릿 2열 -> 데스크톱 3열 */}
      <Reveal>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenDetails={setSelectedProject} />
          ))}
        </Box>
      </Reveal>
      <ProjectDetailDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </PageContainer>
  );
}

export default Projects;
