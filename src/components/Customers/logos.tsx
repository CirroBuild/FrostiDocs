import React from "react"
import SvgImage from "../SvgImage"
import clsx from "clsx"
import styles from "./styles.module.css"
import { logos as logosManifest } from "../../assets/logos"

// importing SVGs individually to inject them into the DOM and avoid HTTP request
import yahoo from "../../../static/img/pages/customers/logos/yahoo.svg"
import kepler from "../../../static/img/pages/customers/logos/kepler.svg"
import airbus from "../../../static/img/pages/customers/logos/airbus.svg"
import aquis from "../../../static/img/pages/customers/cards/aquis.svg"
import central_group from "../../../static/img/pages/customers/logos/central_group.svg"
import tqs_integration from "../../../static/img/pages/customers/logos/tqs-integration.svg"
import syndica from "../../../static/img/pages/customers/cards/syndica.svg"
import ca from "../../../static/img/pages/customers/logos/ca.svg"
import turk_telekom from "../../../static/img/pages/customers/logos/turk_telekom.svg"
import liveaction from "../../../static/img/pages/customers/logos/liveaction.svg"
import apache_nifi from "../../../static/img/pages/customers/logos/apache-nifi.svg"
import toggle from "../../../static/img/pages/customers/logos/toggle.svg"
import synology from "../../../static/img/pages/customers/logos/synology.svg"
import prediko from "../../../static/img/pages/customers/logos/prediko.svg"
import electric_era from "../../../static/img/pages/customers/logos/electric-era.svg"
import razor_secure from "../../../static/img/pages/customers/logos/razor_secure.svg"
import datron from "../../../static/img/pages/customers/cards/datron.svg"
import netapp from "../../../static/img/logos/netapp.svg"

const svgs = [
  {
    ...logosManifest.yahoo,
    svg: yahoo,
    width: 120,
  },
  {
    ...logosManifest.toggle,
    svg: toggle,
    width: 120,
  },
  {
    ...logosManifest.apacheNifi,
    svg: apache_nifi,
    height: 45,
  },
  {
    ...logosManifest.synology,
    svg: synology,
    width: 120,
    height: 30,
  },
  {
    ...logosManifest.prediko,
    svg: prediko,
    width: 120,
    height: 30,
  },
  {
    ...logosManifest.razor_secure,
    width: 140,
    height: 40,
    svg: razor_secure,
  },
  {
    ...logosManifest.electric_era,
    svg: electric_era,
    width: 120,
  },

  {
    ...logosManifest.kepler,
    svg: kepler,
  },

  {
    ...logosManifest.airbus,
    svg: airbus,
  },

  {
    ...logosManifest.netapp,
    svg: netapp,
    width: 115,
  },

  {
    ...logosManifest["aquis-exchange"],
    svg: aquis,
  },

  {
    ...logosManifest["central-group"],
    svg: central_group,
  },

  {
    ...logosManifest["tqs-integration"],
    svg: tqs_integration,
  },

  {
    ...logosManifest.syndica,
    svg: syndica,
  },

  {
    ...logosManifest["copenhagen-atomics"],
    svg: ca,
  },

  {
    ...logosManifest["turk-telekom"],
    svg: turk_telekom,
  },

  {
    ...logosManifest.liveaction,
    svg: liveaction,
  },

  {
    ...logosManifest.datron,
    svg: datron,
    width: 120,
  },
]

export const Logos = ({ isDarkTheme }) => (
  <>
    {svgs.map(({ svg, width, height, alt }, i) => (
      <div
        key={i}
        className={clsx(styles.logo, { [styles.logoDark]: isDarkTheme })}
      >
        <SvgImage
          key={i}
          image={React.createElement(svg, {
            alt,
            width,
            height,
          })}
        />
      </div>
    ))}
  </>
)
