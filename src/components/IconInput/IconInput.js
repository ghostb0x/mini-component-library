import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const IconInput = ({
  label,
  icon,
  width = 250,
  size,
  placeholder,
}) => {
  let sizeVars;
  let fontSize;
  switch (size) {
    case 'small': {
      sizeVars = {
        '--font-size': '14px',
        '--border-stroke': '1px',
        '--padding-left': '25px',
      };
      fontSize = 14;
      break;
    }
    case 'large': {
      sizeVars = {
        '--font-size': '18px',
        '--border-stroke': '2px',
        '--padding-left': '32px',
      };
      fontSize = 18;
      break;
    }
    default: {
      console.log('no size provided');
    }
  }

  const providedVars = {
    '--width': `${width}px`,
    '--height': `${24 / { fontSize }}rem`,
  };

  const styles = { ...sizeVars, ...providedVars };

  const [queryInput, setQueryInput] = React.useState('');

  const textBoxRef = React.useRef();

  return (
    <Wrapper
      style={styles}
      onClick={() => textBoxRef.current.focus()}
    >
      <StyledIcon id={icon} size={fontSize} />

      <VisuallyHidden>
        <label htmlFor={label}>{label}</label>
      </VisuallyHidden>

      <TextBox
        ref={textBoxRef}
        type="text"
        name={label}
        placeholder={placeholder}
        value={queryInput}
        onChange={(e) => {
          setQueryInput(e.target.value);
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: var(--width);
  border-bottom: var(--border-stroke) solid black;

  &:focus-within {
    outline: var(--border-stroke) solid black;
    outline-offset: 4px;
    border-radius: 1px;
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  left: 1px;
  top: 2px;
  display: inline-block;
  color: ${COLORS.gray700};

  ${Wrapper}:hover & {
    color: ${COLORS.black};
  }
`;

const TextBox = styled.input`
  display: inline-block;
  padding-left: var(--padding-left);
  border: none;
  height: var(--height);
  font-size: var(--font-size);
  width: auto;
  color: ${COLORS.gray700};
  font-weight: 700;

  &::placeholder {
    color: ${COLORS.gray500};
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  ${Wrapper}:hover & {
    color: ${COLORS.black};
  }
`;

export default IconInput;
