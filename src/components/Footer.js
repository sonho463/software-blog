import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaInstagram, FaLink } from 'react-icons/fa';
import { IconLink } from './IconLink';

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
`;

const Footer = ({links}) => {
  return (
    <FooterWrapper>
      <p>
        <small>
          Copyright © {new Date().getFullYear()} pitang1965 All Rights Reserved.
        </small>
      </p>
      <IconLink
        href={links.twitter}
        icon={<FaTwitter tw="w-4 h-4 fill-current" />}
        label="Twitter"
      />
      <IconLink
        href={links.instagram}
        icon={<FaInstagram tw="w-4 h-4 fill-current" />}
        label="Instagram"
      />
      <IconLink
        href={links.linktree}
        icon={<FaLink tw="w-4 h-4 fill-current" />}
        label="Linktree"
      />
    </FooterWrapper>
  );
};

export default Footer;
