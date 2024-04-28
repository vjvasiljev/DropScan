import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function DottedConnector() {
  return (
    <Stepper
      sx={{
              width: '100%',
              margin: 'auto',
              //Changes position of the text to the top but breaks the code
        // [`& .${stepClasses.root}`]: {
        //   flexDirection: 'column-reverse',
        //   '&::after': {
        //     top: 'unset',
        //     bottom:
        //       'calc(var(--StepIndicator-size) / 2 - var(--Step-connectorThickness) / 2)',
        //   },
        // },
        [`& .${stepClasses.completed}::after`]: {
          bgcolor: 'primary.500',
        },
        [`& .${stepClasses.active} .${stepIndicatorClasses.root}`]: {
          borderColor: 'primary.500',
        },
        [`& .${stepClasses.root}:has(+ .${stepClasses.active})::after`]: {
          color: 'primary.500',
          backgroundColor: 'transparent',
          backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)',
          backgroundSize: '7px 7px',
          backgroundPosition: 'center left',
        },
        [`& .${stepClasses.disabled} *`]: {
          color: 'neutral.plainDisabledColor',
        },
      }}
    >
      <Step
        completed
        orientation="vertical"
        indicator={
          <StepIndicator variant="solid" color="primary">
            <CheckRoundedIcon />
          </StepIndicator>
        }
      >
        <Typography
          level="h4"
          fontWeight="xl"
          endDecorator={
            <Typography fontSize="sm" fontWeight="normal">
              TOP 50%
            </Typography>
          }
        >
          
        </Typography>
      </Step>
      <Step
        completed
        orientation="vertical"
        indicator={
          <StepIndicator variant="solid" color="primary">
            <CheckRoundedIcon />
          </StepIndicator>
        }
      >
        <Typography
          level="h4"
          fontWeight="xl"
          endDecorator={
            <Typography fontSize="sm" fontWeight="normal">
              TOP 25%
            </Typography>
          }
        >
          
        </Typography>
      </Step>
      <Step
        active
        orientation="vertical"
        indicator={
          <StepIndicator variant="outlined" color="primary">
            <KeyboardArrowDownRoundedIcon />
          </StepIndicator>
        }
      >
        <Typography
          level="h4"
          fontWeight="xl"
          endDecorator={
            <Typography fontSize="sm" fontWeight="normal">
              TOP 10%
            </Typography>
          }
        >
          
        </Typography>
      </Step>
      <Step
        disabled
        orientation="vertical"
        indicator={<StepIndicator variant="outlined" color="neutral" />}
      >
        <Typography
          level="h4"
          fontWeight="xl"
          endDecorator={
            <Typography fontSize="sm" fontWeight="normal">
              TOP 5%
            </Typography>
          }
        >
          
        </Typography>
      </Step>
    </Stepper>
  );
}
