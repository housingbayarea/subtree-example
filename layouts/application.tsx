import * as React from "react"
import Head from "next/head"
import t from "@bloom-housing/ui-components/src/helpers/translator"
import LocalizedLink from "@bloom-housing/ui-components/src/atoms/LocalizedLink"
import SiteHeader from "@bloom-housing/ui-components/src/headers/SiteHeader/SiteHeader"
import SiteFooter from "@bloom-housing/ui-components/src/footers/SiteFooter/SiteFooter"

const Layout = props => (
  <div>
    <Head>
      <title>{t("nav.siteTitle")}</title>
    </Head>
    <SiteHeader
      logoSrc="/static/images/logo_glyph.svg"
      notice="This is a preview of our new website. We're just getting started. We'd love to get your feedback."
      title={t("nav.siteTitle")}
    >
      <LocalizedLink href="/listings" className="navbar-item">
        {t("nav.listings")}
      </LocalizedLink>
      {/* Only show Get Assistance if housing counselor data is available */}
      {process.env.housingCounselorServiceUrl && (
        <LocalizedLink href="/housing-counselors" className="navbar-item">
          {t("nav.getAssistance")}
        </LocalizedLink>
      )}
    </SiteHeader>
    <main>{props.children}</main>
    <SiteFooter />
  </div>
)

export default Layout
