import { useState } from 'react';
import { Chip, Stack } from '@mui/material';

// 기술 이름 -> simple-icons 아이콘 이름
const ICON_SLUGS = {
  React: 'react',
  Supabase: 'supabase',
  PostgreSQL: 'postgresql',
  CSS3: 'css3',
  'Unsplash API': 'unsplash',
  MUI: 'mui',
};

function TechChip({ name }) {
  const [hasIconError, setHasIconError] = useState(false);
  const slug = ICON_SLUGS[name];
  const icon = slug && !hasIconError ? (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt=""
      width={16}
      height={16}
      onError={() => setHasIconError(true)}
    />
  ) : undefined;

  // 아이콘을 못 불러와도 이름은 항상 보이도록 라벨을 함께 둔다.
  return <Chip size="small" variant="outlined" icon={icon} label={name} sx={{ borderRadius: 0, borderColor: 'text.primary', '& img': { ml: 1 } }} />;
}

function TechStack({ items }) {
  return (
    <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
      {items.map((name) => (
        <TechChip key={name} name={name} />
      ))}
    </Stack>
  );
}

export default TechStack;
