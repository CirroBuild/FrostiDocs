import React from "react"
import useThemeContext from "@theme/hooks/useThemeContext"

import style from "./style.module.css"

const clients: Array<{
  label: string
  logoSrc: string
  lightThemeLogoSrc?: string
  src: string
  openInNewTab?: boolean
}> = [
  {
    label: "Python",
    logoSrc: "/img/logos/python.svg",
    src: "https://github.com/questdb/py-questdb-client",
    openInNewTab: true,
  },
  {
    label: "NodeJS",
    logoSrc: "/img/logos/nodejs-light.svg",
    lightThemeLogoSrc: "/img/logos/nodejs-dark.svg",
    src: "https://github.com/questdb/nodejs-questdb-client",
    openInNewTab: true,
  },
  {
    label: ".NET",
    logoSrc: "/img/logos/dotnet.svg",
    src: "https://github.com/questdb/net-questdb-client",
    openInNewTab: true,
  },
  {
    label: "Java",
    logoSrc: "/img/logos/java.svg",
    src: "/docs/reference/clients/java_ilp",
  },
  {
    label: "C and C++",
    logoSrc: "/img/logos/cplusplus.svg",
    src: "https://github.com/questdb/c-questdb-client",
    openInNewTab: true,
  },
  {
    label: "Golang",
    logoSrc: "/img/logos/go.svg",
    src: "https://github.com/questdb/go-questdb-client",
    openInNewTab: true,
  },
]

export const ILPClientsTable = () => {
  const { isDarkTheme } = useThemeContext()

  return (
    <div className={style.root}>
      {clients.map(
        ({ label, src, logoSrc, lightThemeLogoSrc, openInNewTab = false }) => (
          <a
            href={src}
            className={style.client}
            key={label}
            {...(openInNewTab && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            <img
              className={style.image}
              src={isDarkTheme ? logoSrc : lightThemeLogoSrc ?? logoSrc}
              alt={label}
            />
            {label}
          </a>
        ),
      )}
    </div>
  )
}
