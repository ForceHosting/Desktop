import { useEffect } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
import fetch from 'node-fetch';
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
//
import { MotivationIllustration } from '../../assets/index';


// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Authing() {

useEffect(()=>{
    (async function getData(){
      const response = await fetch('http://localhost:25566/api/auth/discord/data', {
        method: 'GET',
        headers: {
          cookie: 'X-Panel_INFO=s%3AkQIKPEvNadujluQX-73kfdFwdJFJBRUa.zHU%2B4b2Y14GxmwH8uF4inMEFhNETPz8OPiubBKgQcKQ'
        }
      });
const body = await response;

console.log(body);
      document.cookie = `X-Panel_INFO=s%3AOOfB88ISGwLfhkSyygHzTubz3fH3_mXo.N80XjldrAS3bBR%2BJF6i88TwTBNUbFL3Gas8pcL4gEyE`
    const res = await axios.get('http://localhost:25566/api/auth/discord/data', {

    });
      console.log(res)
      //    localStorage.setItem('token', res.data)
    })();
})

  return (
    <Page title="Authorizing">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
        <MotivationIllustration
         sx={{ my: 10, height: 240 }} />
          <Typography variant="h3" paragraph>
            Account Authorization
          </Typography>
          <Typography sx={{ color: 'text.secondary', marginBottom: 2 }}>Please wait while your account connects to our secure servers to gather your information.</Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
