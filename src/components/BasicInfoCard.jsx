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

function BasicInfoCard({ info }) {
  return (
    // 테마에 연회색이 따로 없어서, 테마의 글자색(검정)을 흰색에 8%만 섞어 연한 회색을 만든다.
    <Card sx={{ bgcolor: 'color-mix(in srgb, var(--mui-palette-text-primary) 8%, white)' }}>
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        {/* 좁은 화면에서는 사진이 위, 정보가 아래로 쌓인다. */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 5 }}
          sx={{ alignItems: 'center' }}
        >
          {/* 사진을 못 불러오면 Avatar가 children(고양이 발자국 아이콘)을 대신 보여준다. */}
          <Avatar
            src={info.photo}
            alt={`${info.name} 프로필 사진`}
            sx={{ width: 160, height: 160, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}
          >
            <PetsIcon sx={{ fontSize: 64 }} />
          </Avatar>
          <Stack spacing={1} sx={{ alignItems: { xs: 'center', sm: 'flex-start' } }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 500, mb: 1 }}>
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

export default BasicInfoCard;
