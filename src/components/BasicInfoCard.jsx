import { memo } from 'react';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

// 라벨과 값을 한 줄로 보여주는 작은 행
function InfoRow({ label, value }) {
  return (
    <Stack direction="row" spacing={2}>
      <Typography color="text.secondary" sx={{ minWidth: 56 }}>
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
}

// isStacked가 true이면 화면 크기와 상관없이 사진이 위, 정보가 아래로 쌓인다. (좁은 옆칸용)
function BasicInfoCard({ info, isStacked = false }) {
  return (
    // 레퍼런스 사이트처럼 흰 바탕, 각진 모서리, 검정 테두리로 만든다.
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 'none',
        border: 1,
        borderColor: 'text.primary',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        {/* 좁은 화면에서는 사진이 위, 정보가 아래로 쌓인다. */}
        <Stack
          direction={isStacked ? 'column' : { xs: 'column', sm: 'row' }}
          spacing={isStacked ? 3 : { xs: 3, sm: 5 }}
          sx={{ alignItems: 'center' }}
        >
          {/* 사진을 못 불러오면 Avatar가 children(고양이 발자국 아이콘)을 대신 보여준다. */}
          <Avatar
            src={info.photo}
            alt={`${info.name} 프로필 사진`}
            slotProps={{ img: { loading: 'lazy' } }}
            // 사진은 동그랗게 두고, 검정 테두리를 둘러 박스들과 맞춘다.
            sx={{
              width: 160,
              height: 160,
              border: 1,
              borderColor: 'text.primary',
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
            }}
          >
            <PetsIcon sx={{ fontSize: 64 }} />
          </Avatar>
          <Stack spacing={1} sx={{ alignItems: isStacked ? 'stretch' : { xs: 'center', sm: 'flex-start' } }}>
            <Typography
              variant="h4"
              component="h1"
              sx={(theme) => ({
                fontFamily: theme.typography.fontFamilyPoint,
                fontWeight: 700,
                mb: 1,
                textAlign: isStacked ? 'center' : 'inherit',
              })}
            >
              {info.name}
            </Typography>
            <InfoRow label="학력" value={info.education} />
            <InfoRow label="전공" value={info.major} />
            <InfoRow label="경력" value={info.experience} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default memo(BasicInfoCard);
