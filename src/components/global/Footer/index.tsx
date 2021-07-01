import Link from 'next/link'

import {
  FooterWrapper,
  FooterContainer,
  BrandRow,
  CopyrightRow,
  IconsCol,
  CopyrightCol,
} from './style'

const Footer = () => {
  return (
    <FooterWrapper as="footer">
      <FooterContainer thin>
        <BrandRow>
          <img
            src="/logo.svg"
            alt="Bankless Community Logo"
            width={60}
            height={60}
          />
          <strong>Bankless DAO</strong>
        </BrandRow>
        <CopyrightRow>
          <IconsCol>
            <Link href="https://medium.com/bankless-dao">
              <a>
                <img
                  src="/images/icon-social-medium.svg"
                  alt="Medium Icon"
                  width={48}
                  height={27}
                />
              </a>
            </Link>
            <Link href="https://banklessdao.substack.com/">
              <a>
                <img
                  src="/images/icon-social-substack.svg"
                  alt="Substack Icon"
                  width={25}
                  height={28}
                />
              </a>
            </Link>
            <Link href="https://discord.gg/bjPz2w9Zts ">
              <a>
                <img
                  src="/images/icon-social-discord.svg"
                  alt="Discord Icon"
                  width={32}
                  height={35}
                />
              </a>
            </Link>
            <Link href="https://twitter.com/banklessDAO">
              <a>
                <img
                  src="/images/icon-social-twitter.svg"
                  alt="Twitter Icon"
                  width={35}
                  height={28}
                />
              </a>
            </Link>
            <Link href="https://github.com/BanklessDAO">
              <a>
                <img
                  src="/images/icon-social-github.svg"
                  alt="Github Icon"
                  width={32}
                  height={31}
                />
              </a>
            </Link>
          </IconsCol>
          <CopyrightCol>
            &copy; {new Date().getFullYear()} Bankless DAO
          </CopyrightCol>
        </CopyrightRow>
      </FooterContainer>
    </FooterWrapper>
  )
}

export default Footer
