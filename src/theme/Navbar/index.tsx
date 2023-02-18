import clsx from "clsx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React, { ComponentProps, useCallback, useState, useEffect } from "react"

import Button from "@theme/Button"
import useLockBodyScroll from "@theme/hooks/useLockBodyScroll"
import useWindowSize, { windowSizes } from "@theme/hooks/useWindowSize"

import styles from "./styles.module.css"
import NavbarItem from "@theme/NavbarItem"

const DefaultNavItemPosition = "right"



function splitNavItemsByPosition(
  items: Array<ComponentProps<typeof NavbarItem>>,
): {
  leftItems: Array<ComponentProps<typeof NavbarItem>>
  rightItems: Array<ComponentProps<typeof NavbarItem>>
} {
  const leftItems = items.filter(
    (item) =>
      // @ts-expect-error: temporary, will be fixed in Docusaurus TODO remove soon
      (item.position ?? DefaultNavItemPosition) === "left",
  )
  const rightItems = items.filter(
    (item) =>
      // @ts-expect-error: temporary, will be fixed in Docusaurus TODO remove soon
      (item.position ?? DefaultNavItemPosition) === "right",
  )
  
  return {
    leftItems,
    rightItems,
  }
}

function Navbar(): JSX.Element {
  const {
    siteConfig: {
      themeConfig: {
        navbar: { items },
      },
    },
  } = useDocusaurusContext()
  const [sidebarShown, setSidebarShown] = useState(false)
  

  useLockBodyScroll(sidebarShown)

  const showSidebar = useCallback(() => {
    setSidebarShown(true)
  }, [])
  const hideSidebar = useCallback(() => {
    setSidebarShown(false)
  }, [])

  const windowSize = useWindowSize()

  

  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setSidebarShown(false)
    }
  }, [windowSize])

  const { leftItems, rightItems } = splitNavItemsByPosition(items)
  

  function useUserInfo() {
    const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
      const getUserInfo = async () => {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        console.log(payload)
        setUserInfo(clientPrincipal.userDetails);
      }
      getUserInfo()
      .catch((e: Error) => {
        console.log(e);
      });
    }, []);

    return String(userInfo);
  }
  const userInfo = useUserInfo();

  function LoggedOut(){
    if( userInfo !== 'NULL'){
      return(
        <Button
          className={clsx(styles.ctaButton, styles.getQuestdb)}
          size="xsmall"
          variant="secondary"
          to="/docs/get-started/provision/"
        >
          Start Now
        </Button>
      )
    }
    else {
      return(
        <Button
          className={clsx(styles.ctaButton, styles.getQuestdb)}
          size="xsmall"
          variant="secondary"
          to="/.auth/login/aad/?post_login_redirect_uri=/enterprise/"
        >
          Sign Up
        </Button>
      )
    }
  }
 

  return (
    <nav
      className={clsx("navbar", styles.navbar, "navbar--light", {
        "navbar-sidebar--show": sidebarShown,
      })}
    >
      <div className={clsx("navbar__inner", styles.inner)}>
        <div className="navbar__items">
          <div
            aria-label="Navigation bar toggle"
            className="navbar__toggle"
            role="button"
            tabIndex={0}
            onClick={showSidebar}
            onKeyDown={showSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              role="img"
              focusable="false"
            >
              <title>An icon showing a hamburger menu</title>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          </div>
          <a
            className={clsx("navbar__brand", styles.brand)}
            href="/"
            onClick={hideSidebar}
          >
            Frosti Build
          </a>
          {leftItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </div>
        <div className="navbar__items navbar__items--right">
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
          
          <LoggedOut />
          <Button
            className={clsx(styles.ctaButton, styles.getQuestdb)}
            size="xsmall"
            variant="secondary"
            to="/cloud/"
          >
            Contact Us
          </Button>
          
          
        </div>
      </div>
      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={hideSidebar}
      />
      <div className="navbar-sidebar">
        <div className="navbar-sidebar__brand">
          <a className={clsx("navbar__brand", styles.brand)} href="/">
            Frosti Build
          </a>
        </div>
        <div className="navbar-sidebar__items">
          <div className="menu">
            <ul className="menu__list">
              {items.map((item, i) => (
                <NavbarItem
                  mobile
                  {...item}
                  {...(item.type !== "search" && { onClick: hideSidebar })} // Search type def does not accept onClick
                  key={i}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
