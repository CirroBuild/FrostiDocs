import React, { useState } from "react"
import clsx from "clsx"

import cuCss from "../../css/index/customer.module.css"
import seCss from "../../css/section.module.css"
import { logos } from "../../assets/logos"
import { CustomerLogo } from "../../assets/types"

const logosOverrides: Record<keyof typeof logos, Partial<CustomerLogo>> = {
  yahoo: {
    width: 120,
  },

  toggle: {
    width: 120,
  },

  apacheNifi: {
    height: 45,
  },
}

const customerLogos = [
  "yahoo",
  "kepler",
  "airbus",
  "yc",
  "aquis-exchange",
  "central-group",
  "tqs-integration",
  "syndica",
  "copenhagen-atomics",
  "turk-telekom",
  "liveaction",
  "apacheNifi",
  "toggle",
  "syntropy",
].map((key) => ({ ...logos[key], ...logosOverrides[key] }))

type Props = {
  nbElements: number
}

const Slideshow = ({ nbElements }: Props) => {
  const nbPanels = Math.ceil(Object.values(logos).length / nbElements)
  const panels = Array.from({ length: nbPanels }, (_, index) => index + 1)

  const [index, setIndex] = useState<number>(1)

  const handleClickControl = (index: number) => {
    setIndex(index)
  }

  return (
    <section className={clsx(seCss["section--slim"])}>
      <div className={cuCss.logo__desktop}>
        {customerLogos.map((logo) => (
          <div key={logo.alt} className={cuCss.logo__item}>
            <img
              alt={logo.alt}
              height={logo.height}
              src={logo.src}
              width={logo.width}
              style={{ top: logo.offset ?? 0 }}
            />
          </div>
        ))}
      </div>
      <div className={cuCss.logo__mobile}>
        {panels.map((i: number) => {
          const panelLogos = customerLogos.slice(
            (i - 1) * nbElements,
            i * nbElements,
          )
          const active = i === index ? cuCss.logo__mobile_panel_active : ""
          return (
            <div key={i} className={`${cuCss.logo__mobile_panel} ${active}`}>
              {panelLogos.map((panelLogo) => (
                <div key={panelLogo.alt} className={cuCss.logo__item}>
                  <img
                    alt={panelLogo.alt}
                    height={panelLogo.height}
                    src={panelLogo.src}
                    width={panelLogo.width}
                    style={{ top: panelLogo.offset ?? 0 }}
                  />
                </div>
              ))}
            </div>
          )
        })}
        <div className={cuCss.logo__mobile_nav}>
          {panels.map((i: number) => {
            const active =
              i === index ? cuCss.logo__mobile_nav__control_active : ""
            return (
              <div
                key={i}
                className={`${cuCss.logo__mobile_nav__control} ${active}`}
                onClick={() => handleClickControl(i)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Slideshow
