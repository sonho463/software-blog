import React from 'react';
import styled from 'styled-components';
import TagCloud from './TagCloud';
import Bio from './bio';

const SideBarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: var(--spacing-2);
`;

const SideBar = () => {
  return (
    <SideBarWrapper>
      <Bio />
      <TagCloud />
    </SideBarWrapper>
  );
};

export default SideBar;
