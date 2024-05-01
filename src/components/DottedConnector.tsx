import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

export function StepGenerator({ completed, active, disabled, label }) {

  return (
    
    <Step
      completed={completed}
      active={active}
      disabled={disabled}
      orientation="vertical"
      indicator={
        <StepIndicator variant={disabled || active ?"outlined":"solid" } color="primary">
            {completed && <CheckRoundedIcon />}
            {active && <HourglassTopIcon />}
            
            
          </StepIndicator>
        }
      >
        <Typography
          level="h4"
          fontWeight="xl"
          endDecorator={
            <Typography fontSize="sm" fontWeight="normal">
              {label}
            </Typography>
          }
        >
        </Typography>
      </Step>
  )
}


export function StepCompleted() {
  return (
    <Step
        completed={false}
        orientation="vertical"
        indicator={
          <StepIndicator variant="outline" color="primary">
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
  )
}

export function StepActive() {
  return (
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
  )
}

export function StepDisabled() {
  return (
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
  )
}
const stepsDefault = [
  { completed: true, active: false, disabled: false, label: 'TOP 75%' },
  { completed: true, active: false, disabled: false, label: 'TOP 50%' },
  { completed: false, active: true, disabled: false, label: 'TOP 25%' },
  { completed: false, active: false, disabled: true, label: 'TOP 10%' },
  { completed: false, active: false, disabled: true, label: 'TOP 5%' },
];
export default function DottedConnector({ steps=stepsDefault }) {
  return (
    //TODO stepClasses. active has a prombelm color diffrence
    <Stepper
      sx={{
              width: '100%',
        margin: 'auto',
        '--StepIndicator-size': '2rem',
        [`& .${stepClasses.completed}::after`]: {
          bgcolor: 'primary.500',
        },
        [`& .${stepClasses.active} .${stepIndicatorClasses.root}`]: {
          borderColor: 'success.500',
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
        }, [`& .${stepClasses.root}:last-child::after`]: {
          content: 'none', // This prevents the last step from having a horizontal line
        },
      }}
    >
      {/* {Array.from(Array(2)).map((_, index) => (
        <>
        <StepCompleted key={`stepCompleted-${index}`} />
        <StepActive key={`stepActive-${index}`} />
        <StepDisabled key={`stepDisabled-${index}`} />
</>
      ))} */}

      {steps.map((step, index) => (
        <StepGenerator
          key={`step-${index}`}
          completed={step.completed}
          active={step.active}
          disabled ={step.disabled}
          label={step.label}
        />
      ))}
     
    </Stepper>
  );
}
