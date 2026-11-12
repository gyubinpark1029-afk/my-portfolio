import { Accordion, AccordionDetails, AccordionSummary, Chip, Stack, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// expandedId와 onChange는 부모가 관리한다. 한 번에 하나만 열리게 하려는 목적이다.
// isEditing이 true이면 내용을 입력칸으로 바꿔서, 고친 글을 onContentChange로 부모에게 알린다.
function AboutSectionAccordion({ sections, expandedId, onChange, isEditing = false, onContentChange }) {
  return (
    <div>
      {sections.map((section) => (
        <Accordion
          key={section.id}
          expanded={expandedId === section.id}
          onChange={() => onChange(section.id)}
          disableGutters
          // 각진 흰 박스에 검정 테두리. 겹친 테두리가 두꺼워지지 않게 위로 1px 당긴다.
          sx={{
            borderRadius: 0,
            boxShadow: 'none',
            border: 1,
            borderColor: 'text.primary',
            bgcolor: 'background.paper',
            '&:before': { display: 'none' },
            '&:not(:first-of-type)': { mt: '-1px' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography
                variant="h6"
                component="h2"
                sx={(theme) => ({ fontFamily: theme.typography.fontFamilyPoint, fontWeight: 500 })}
              >
                {section.title}
              </Typography>
              {section.showInHome && <Chip size="small" color="secondary" label="홈 탭 표시" sx={{ borderRadius: 0 }} />}
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3 }}>
            {isEditing ? (
              <TextField
                multiline
                fullWidth
                minRows={3}
                value={section.content}
                onChange={(event) => onContentChange(section.id, event.target.value)}
                slotProps={{ htmlInput: { 'aria-label': `${section.title} 내용` } }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
              />
            ) : (
              <Typography sx={{ lineHeight: 1.8 }}>{section.content}</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default AboutSectionAccordion;
