import * as React from "react";
import { useState, useEffect } from "react";
import Stepper from "@mui/joy/Stepper";
import Step, { stepClasses } from "@mui/joy/Step";
import StepIndicator, { stepIndicatorClasses } from "@mui/joy/StepIndicator";
import Typography from "@mui/joy/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export function StepGenerator({ completed, active, disabled, label }) {
  return (
    <Step
      completed={completed}
      active={active}
      // disabled={disabled}
      orientation="vertical"
      sx={{ width: "100%" }}
      indicator={
        <StepIndicator
          variant={active ? "outlined" : "solid"}
          color="primary"
          sx={{
            backgroundColor: completed
              ? "success.500"
              : disabled
              ? "danger.500"
              : undefined,
          }}
        >
          {completed && <CheckRoundedIcon />}
          {active && <HourglassTopIcon />}
          {disabled && <CloseOutlinedIcon />}
        </StepIndicator>
      }
    >
      <Typography
        level="h4"
        fontWeight="sm"
        endDecorator={
          <Typography level="body-xs" fontWeight="normal">
            {label}
          </Typography>
        }
      ></Typography>
    </Step>
  );
}

const stepsDefault = [
  {
    percent: 75,
  },
  {
    percent: 50,
  },
  {
    percent: 25,
  },
  {
    percent: 10,
  },
  {
    percent: 5,
  },
];
export default function DottedConnector({
  steps = stepsDefault,
  currentPercentageLevel = 0,
}) {
  const firstNotCompletedIndex = steps.findIndex(
    (step) => currentPercentageLevel > step.percent
  );
  return (
    //TODO stepClasses. active has a prombelm color diffrence
    <Stepper
      // orientation={isVertical ? "vertical" : "horizontal"}
      sx={{
        // display: isVertical ? "none" : "block",
        width: "100%",
        margin: "auto",
        alignItems: "center",
        "--StepIndicator-size": "2rem",
        [`& .${stepClasses.completed}::after`]: {
          bgcolor: "primary.500",
        },
        [`& .${stepClasses.active} .${stepIndicatorClasses.root}`]: {
          borderColor: "danger.500",
          color: "primary.500",
        },

        [`& .${stepClasses.root}:has(+ .${stepClasses.active})::after`]: {
          color: "primary.500",
          backgroundColor: "transparent",
          backgroundImage: "radial-gradient(currentColor 2px, transparent 2px)",
          backgroundSize: "7px 7px",
          backgroundPosition: "center left",
        },
        [`& .${stepClasses.disabled} *`]: {
          color: "neutral.plainDisabledColor",
        },
        [`& .${stepClasses.root}:last-child::after`]: {
          content: "none", // This prevents the last step from having a horizontal line
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
          completed={currentPercentageLevel <= step.percent ? true : false}
          active={index === firstNotCompletedIndex}
          disabled={
            currentPercentageLevel > step.percent &&
            index !== firstNotCompletedIndex
              ? true
              : false
          }
          label={"Top " + step.percent + "%"}
        />
      ))}
    </Stepper>
  );
}
