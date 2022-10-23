import React from "react"
import useBaseUrl from "@docusaurus/useBaseUrl"
import styled, { css } from "styled-components"

const Root = styled.div<{
  width: number
  headHeight: number
  headerButtonsImgPath: string
}>`
  display: inline-block;

  ${({ headHeight, headerButtonsImgPath }) => css`
    padding-top: ${headHeight}px;
    background: #2f313c url(${headerButtonsImgPath}) top left no-repeat;
    background-size: auto ${headHeight}px;
  `};

  border-radius: 6px;
  max-width: 100%;
  box-shadow: 0 15px 61px 5px rgba(20, 23, 37, 0.94);
`

const Picture = styled.img`
  background-color: rgb(38, 40, 51);
  height: auto;
`

type Props = {
  width: number
  height: number
  src: string
  headHeight?: number
  className?: string
  style?: React.CSSProperties
}

export const Screenshot = ({
  width,
  height,
  src,
  headHeight = 16,
  className,
  style,
}: Props) => {
  const headerButtonsImgPath = useBaseUrl("/img/pages/index/window-header.svg")

  return (
    <Root
      style={style}
      className={className}
      width={width}
      headHeight={headHeight}
      headerButtonsImgPath={headerButtonsImgPath}
    >
      <Picture width={width} height={height} src={src} />
    </Root>
  )
}
