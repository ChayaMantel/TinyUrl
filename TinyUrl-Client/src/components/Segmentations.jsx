import React, { useState } from 'react';
import LinkClicksBySourceChart from '../components/LinkClicksBySourceChart';
import TotalClicksPerUserChart from '../components/TotalClicksPerUserChart';
import UserClicksByDayOfWeekChart from '../components/DailyClicksChart';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const Segmentations = () => {
  const [url, setUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'url') {
      setUrl(value);
    } else if (name === 'userId') {
      setUserId(value);
    } else if (name === 'option') {
      setSelectedOption(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (selectedOption) {
        case 'urlClicksBySource':
          setSelectedOption('urlClicksBySource');
          break;
        case 'userTotalClicks':
          setSelectedOption('userTotalClicks');
          break;
        case 'userClicksByDay':
          setSelectedOption('userClicksByDay');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Data Decoding
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Enter URL"
              variant="outlined"
              name="url"
              value={url}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Enter User ID"
              variant="outlined"
              name="userId"
              value={userId}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Chart Option</InputLabel>
            <Select
              name="option"
              value={selectedOption}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select...</MenuItem>
              <MenuItem value="urlClicksBySource">
                Clicks by Source for URL
              </MenuItem>
              <MenuItem value="userTotalClicks">Total Clicks for User</MenuItem>
              <MenuItem value="userClicksByDay">Clicks by Day for User</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Generate Chart
          </Button>
        </form>

        <Box mt={4}>
          {selectedOption === 'urlClicksBySource' && (
            <LinkClicksBySourceChart url={url} />
          )}
          {selectedOption === 'userTotalClicks' && (
            <TotalClicksPerUserChart userId={userId} />
          )}
          {selectedOption === 'userClicksByDay' && (
            <UserClicksByDayOfWeekChart userId={userId} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Segmentations;
