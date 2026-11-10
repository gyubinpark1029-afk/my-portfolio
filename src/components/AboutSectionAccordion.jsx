import { Accordion, AccordionDetails, AccordionSummary, Chip, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// expandedId와 onChange는 부모가 관리한다. 한 번에 하나만 열리게 하려는 목적이다.
function AboutSectionAccordion({ sections, expandedId, onChange }) {
  return (
    <div>
      {sections.map((section) => (
        <Accordion
          key={section.id}
          expanded={expandedId === section.id}
          onChange={() => onChange(section.id)}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                {section.title}
              </Typography>
              {section.showInHome && <Chip size="small" color="secondary" label="홈 탭 표시" />}
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3 }}>
            <Typography sx={{ lineHeight: 1.8 }}>{section.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default AboutSectionAccordion;
