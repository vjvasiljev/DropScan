import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

function ScrollableCards() {
  return (
    <Box sx={{
      overflowX: 'auto', // Enables horizontal scrolling
      display: 'flex', // Makes children (cards) line up horizontally
      whiteSpace: 'nowrap' // Prevents wrapping of items
    }}>
      {Array.from({ length: 10 }, (_, index) => (
        <Card
          key={index}
          sx={{
            minWidth: 200, // Minimum width for each card
            marginRight: 2, // Space between cards
            flexShrink: 0 // Prevents the card from shrinking
          }}
        >
          <Typography level="h6" component="div">
            Card {index + 1}
          </Typography>
          <Typography>
            More content here...
          </Typography>
        </Card>
      ))}
    </Box>
  );
}

export default ScrollableCards;
