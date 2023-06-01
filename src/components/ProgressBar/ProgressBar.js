/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import VisuallyHidden from '../VisuallyHidden';

const ProgressBar = ({ value, size }) => {
  // Aria Attributes
  // aria-valuemin = defaults to 0
  // aria-valuemax = defaults to 100
  // aria-valuenow = current value

  let completionCornerRadius;
  switch (value) {
    case 99.7: {
      completionCornerRadius = '1px';
      break;
    }
    case 99.8: {
      completionCornerRadius = '2px';
      break;
    }
    case 99.9: {
      completionCornerRadius = '3px';
      break;
    }
    case 100: {
      completionCornerRadius = '4px';
      break;
    }
    default: {
      completionCornerRadius = '0';
    }
  }

  let sizeVars;
  switch (size) {
    case 'small': {
      sizeVars = {
        '--height': '8px',
        '--border-radius': '4px',
        '--inner-padding': '0',
        '--completion-corner-radius': `4px ${completionCornerRadius} ${completionCornerRadius} 4px`,
      };
      break;
    }
    case 'medium': {
      sizeVars = {
        '--height': '12px',
        '--border-radius': '4px',
        '--inner-padding': '0',
        '--completion-corner-radius': `4px ${completionCornerRadius} ${completionCornerRadius} 4px`,
      };
      break;
    }
    case 'large': {
      sizeVars = {
        '--height': '24px',
        '--border-radius': '8px',
        '--inner-padding': '4px',
        '--completion-corner-radius': `4px ${completionCornerRadius} ${completionCornerRadius} 4px`,
      };
      break;
    }
    default: {
      console.log('Error: no size provided');
    }
  }

  // consistent across all size variants
  const sizeConsts = {
    '--width': '370px',
  };

  // combine sizeConsts and sizeVars into styles
  const styles = { ...sizeConsts, ...sizeVars };

  return (
    <>
      <label for="progress-bar">
        Process Progress:
        <VisuallyHidden>Current Progress is {value}%</VisuallyHidden>
      </label>
        <ProgressBarStyled
          id="progress-bar"
          style={styles}
          value={value}
          max="100"
        ></ProgressBarStyled>
    </>
  );
};


const ProgressBarStyled = styled.progress`
  -webkit-appearance: none;
  appearance: none;

  height: var(--height);
  width: var(--width);

  &::-webkit-progress-bar {
    box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
    background-color: ${COLORS.transparentGray15};
    border-radius: var(--border-radius);
    padding: var(--inner-padding);
    overflow: clip;
  }

  &::-webkit-progress-value {
    background-color: ${COLORS.primary};
    border-radius: var(--completion-corner-radius);
  }
`;

export default ProgressBar;
