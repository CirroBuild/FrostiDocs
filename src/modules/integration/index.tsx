import React from "react"
import { Section } from "../../components/Section"
import type { CustomerLogo } from "../../assets/types"
import { logos } from "../../assets/logos"
import Link from "@docusaurus/Link"

import styles from "./styles.module.css"
import SvgImage from "../../components/SvgImage"

import KeyVault from "../../../static/img/logos/Key-Vaults.svg"
import Storage from "../../../static/img/logos/Storage-Accounts.svg"
import AzureSQL from "../../../static/img/logos/SQL-Database.svg"
import AzureCosmosDb from "../../../static/img/logos/Azure-Cosmos-DB.svg"
import WebApp from "../../../static/img/logos/App-Services.svg"
import ManagedIdentity from "../../../static/img/logos/Managed-Identities.svg"
import AppInsights from "../../../static/img/logos/App-Insights.svg"
import FunctionApp from "../../../static/img/logos/FunctionApp.svg"


const integrations: Array<{
  label: string
  logo: CustomerLogo & { svg: any }
  src?: string
}> = [
  {
    logo: { ...logos.AzureAD, svg: ManagedIdentity },
    label: "Managed Identity",
    src: "/docs/azure/managed-identity/",
  },
  {
    logo: { ...logos.KeyVault, svg: KeyVault },
    label: "Azure KeyVault",
    src: "/docs/azure/keyvault/",
  },
  {
    logo: { ...logos.WebApp, svg: WebApp },
    label: "Azure WebApp",
    src: "/docs/azure/web-app/",
  },
  {
    logo: { ...logos.FunctionApp, svg: FunctionApp },
    label: "Azure FunctionApp",
    src: "/docs/azure/function-app/",
  },
  {
    logo: { ...logos.AzureCosmosDb, svg: AzureCosmosDb },
    label: "Azure CosmosDb",
    src: "/docs/azure/cosmos/",
  },
  {
    logo: { ...logos.AzureSQL, svg: AzureSQL },
    label: "Azure SQL",
    src: "/docs/azure/sql/",
  },
  {
    logo: { ...logos.AppInsights, svg: AppInsights },
    label: "Application Inisghts",
    src: "/docs/azure/app-insights/",
  },
  {
    logo: { ...logos.StorageAccounts, svg: Storage },
    label: "Azure Storage",
    src: "/docs/azure/storage/",
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
