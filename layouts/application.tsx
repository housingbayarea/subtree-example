import * as React from "react"
import t from "@bloom/ui-components/src/helpers/translator"
import LocalizedLink from "@bloom/ui-components/src/atoms/LocalizedLink"
import SiteHeader from "@bloom/ui-components/src/headers/SiteHeader/SiteHeader"
import SiteFooter from "@bloom/ui-components/src/footers/SiteFooter/SiteFooter"

const Layout = props => (
  <div>
    <SiteHeader
      logoSrc="/static/images/logo_glyph.svg"
      notice="This is a preview of our new website. We're just getting started. We'd love to get your feedback."
      title={t("nav.siteTitle")}
    >
      <LocalizedLink href="/listings" className="navbar-item">
        {t("nav.listings")}
      </LocalizedLink>
    </SiteHeader>
    <main>{props.children}</main>
    <SiteFooter />
  </div>
)

export default Layout
