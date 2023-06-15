import React, { useRef } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import Icon from '../Icon';
import { getDisplayedValue } from './Select.helpers';

const Select = ({ label, value, onChange, children }) => {
  const refSelect = React.useRef();

  const refWrapper = React.useRef();

  function wrapperIsFocused(e) {
    function handleEnter(e) {
      if (e.code === 'Space' || e.code === 'Enter') {
        console.log(refSelect.current);
        refSelect.current.focus();
      }

      refWrapper.current.removeEventListener('keydown', handleEnter);
    }

    refWrapper.current.addEventListener('keydown', handleEnter);
  }

  React.useEffect(() => {
    refSelect.current.blur();
  }, [value]);

  const displayedValue = getDisplayedValue(value, children);

  return (
    <Wrapper
      role="button"
      tabIndex="0"
      ref={refWrapper}
      onFocus={wrapperIsFocused}
    >
      <FakeSelect>{displayedValue}</FakeSelect>
      <StyledIcon id="chevron-down" strokeWidth="2" />
      <StyledSelect ref={refSelect} value={value} onChange={onChange}>
        {children}
      </StyledSelect>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  background-color: ${COLORS.transparentGray15};
  color: ${COLORS.gray700};
  padding: 16px;
  border-radius: 0.5rem;
  text-align: center;

  &:hover {
    color: black;
  }
`;

const StyledSelect = styled.select`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  appearance: none;
`;

const StyledIcon = styled(Icon)`
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 12px;
`;

const FakeSelect = styled.div`
  text-transform: capitalize;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  width: fit-content;
  display: inline-block;
  background-color: transparent;
  color: inherit;
  padding-right: 25px;
`;

export default Select;
