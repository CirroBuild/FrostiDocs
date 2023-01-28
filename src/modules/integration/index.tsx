import React from "react"
import { Section } from "../../components/Section"
import type { CustomerLogo } from "../../assets/types"
import { logos } from "../../assets/logos"
import Link from "@docusaurus/Link"

import styles from "./styles.module.css"
import SvgImage from "../../components/SvgImage"

import KeyVault from "../../../static/img/logos/Key-Vaults.svg"
import StorageAccounts from "../../../static/img/logos/Storage-Accounts.svg"
import AzureSQL from "../../../static/img/logos/SQL-Database.svg"
import AzureCosmosDb from "../../../static/img/logos/Azure-Cosmos-DB.svg"
import AppServices from "../../../static/img/logos/App-Services.svg"
import AzureAD from "../../../static/img/logos/Managed-Identities.svg"


const integrations: Array<{
  label: string
  logo: CustomerLogo & { svg: any }
  src?: string
}> = [
  {
    logo: { ...logos.AppServices, svg: AppServices },
    label: "App Services",
    src: "/docs/develop/first-app/",
  },
  {
    logo: { ...logos.keyvault, svg: KeyVault },
    label: "Key Vault",
    src: "/docs/develop/connect/",
  },
  {
    logo: { ...logos.AzureAD, svg: AzureAD },
    label: "Azure AD",
    src: "/docs/develop/connect/",
  },
  {
    logo: { ...logos.AzureCosmosDb, svg: AzureCosmosDb },
    label: "CosmosDb",
    src: "/docs/develop/cosmos/",
  },
  {
    logo: { ...logos.AzureSQL, svg: AzureSQL },
    label: "Azure SQL",
    src: "/docs/develop/cosmos/",
  },
  {
    logo: { ...logos.StorageAccounts, svg: StorageAccounts },
    label: "Storage Accounts",
    src: "/docs/develop/cosmos/",
  },
]

export const Integration = () => (
  <Section noGap>
    <Section.Title size="small" center>
      Integrate with your favorite services (and more soon!)
    </Section.Title>

    <div className={styles.integrations}>
      {integrations.map(({ label, logo, src }, index: number) => {
        const props = {
          key: index,
          className: styles.integration,
        }

        return React.createElement(
          typeof src === "string" ? Link : "div",
          {
            ...props,
            ...(typeof src === "string" ? { href: src } : {}),
          },

          <>
            <SvgImage
              title={logo.alt}
              image={React.createElement(logo.svg, {
                className: styles.logo,
                alt: logo.alt,
                width: logo.width ?? 50,
                height: logo.height ?? 50,
                loading: "lazy",
              })}
            />
            <p style={{textAlign: "center"}}>
              {label}
            </p>
          </>,
        )
      })}
    </div>
  </Section>
)
