import { TextField } from '@mui/material';
import Button from '@mui/material/Button'
import React from 'react'

const CreateArticle: React.FC = () => {
  return (
    <form style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField fullWidth sx={{ maxWidth: 600 }} label=""/>
      <Button
        type='submit'
        variant='contained'
        fullWidth
        sx={{
          maxWidth: '600px',
          padding: '10px',
          backgroundColor: '#67BE23',
          color: 'white',
          marginTop: '5px'
        }}
      >
        Submit
      </Button>
    </form>
  )
};

export default CreateArticle
