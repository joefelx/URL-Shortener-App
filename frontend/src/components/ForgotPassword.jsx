import React ,{useState} from 'react'
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';


const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMail = async () => {

        try {
        // Make a POST request to your backend API to reset the password
        
        const response = await fetch(
            `${import.meta.env.VITE_API_ENDPOINT}/auth/forgot-password`,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            },

        );
        
        if (response.status === 200) {
            setMessage('Email sent successfully.');
        } else {
            // Handle error response from the backend
            
            const data = await response.json();

            
            setMessage(data.error || 'Email sent failed.');
        }
        } catch (error) {
        console.error('Error sending mail:', error);
        setMessage('mail send failed.');
        }
    };
    


  return (
    <Container
      maxWidth="sm"
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card>
        <Box m={2}>
          <div style={{ padding: '16px' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Forgot Password
            </Typography>
            <form>
              <Box mb={2}>
                <TextField
                  label="Enter your email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>


              <Button
                style={{ backgroundColor: '#4B3F6B' }}
                variant="contained"
                // color="primary"
                fullWidth
                onClick={handleSendMail}
              >
                Send Verification mail
              </Button>
            </form>
            <Typography variant="body1" style={{ marginTop: '16px' }}>
              {message}
            </Typography>
          </div>
        </Box>
      </Card>
    </Container>
  )
}

export default ForgotPassword
