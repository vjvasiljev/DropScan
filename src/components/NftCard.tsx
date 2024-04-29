import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function NftCard() {
    return (
      
    <Card  variant='soft' color="danger">
      <div>
        <Typography level="title-sm">Top 50%</Typography>
       
        {/* <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton> */}
      </div>
      <AspectRatio ratio="1/1">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/1943386813/display_1500/stock-photo-nft-non-fungible-token-crypto-art-concept-technology-selling-unique-collectibles-games-1943386813.jpg"
          srcSet="https://www.shutterstock.com/shutterstock/photos/1943386813/display_1500/stock-photo-nft-non-fungible-token-crypto-art-concept-technology-selling-unique-collectibles-games-1943386813.jpg 2x"
          loading="lazy"
          alt=""
        />
            </AspectRatio>
            <Typography level="body-xs"> Requirments not met</Typography>
      <CardContent orientation="horizontal" sx={{alignSelf: 'center' }}>
        {/* <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            $2,900
          </Typography>
        </div> */}
        <Button disabled
          variant="solid"
          size="md"
          color="danger"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600  }}
        >
          Mint
        </Button>
      </CardContent>
    </Card>
  );
}
