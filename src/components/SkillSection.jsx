import { Stack, Typography } from '@mui/material';
import SkillCard from './SkillCard.jsx';
import { skillGroups } from '../data/skillData.js';

// Design과 Code 두 줄로 나누어 "둘 다 한다"는 점을 보여준다.
function SkillSection() {
  return (
    <Stack spacing={4} sx={{ mt: 4 }}>
      {skillGroups.map((group) => (
        <div key={group.category}>
          <Typography
            sx={(theme) => ({
              mb: 2,
              fontFamily: theme.typography.fontFamilyPoint,
              letterSpacing: 2,
            })}
          >
            {group.category}
          </Typography>
          <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {group.skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </Stack>
        </div>
      ))}
    </Stack>
  );
}

export default SkillSection;
