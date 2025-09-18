import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Link,
  Divider,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.100',
        py: 4,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              多智能体DSL框架
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Multi-Agent Domain-Specific Language Framework
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              创新算法 • 企业级应用 • 学术研究
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Link
              href="https://github.com/Max-YUAN-22/Final-DSL"
              target="_blank"
              rel="noopener"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <GitHubIcon />
              <Typography variant="body2">GitHub</Typography>
            </Link>

            <Link
              href="mailto:contact@example.com"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <EmailIcon />
              <Typography variant="body2">联系</Typography>
            </Link>

            <Link
              href="#"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <SchoolIcon />
              <Typography variant="body2">论文</Typography>
            </Link>

            <Link
              href="#"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <CodeIcon />
              <Typography variant="body2">演示</Typography>
            </Link>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 多智能体DSL框架. 保留所有权利.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            基于 MIT 许可证开源
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;