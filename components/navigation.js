import { CNavbar, CContainer,CNavbarBrand, CNavbarToggler, COffcanvas, COffcanvasHeader, COffcanvasTitle, COffcanvasBody, CNavbarNav, CCloseButton, CNavItem, CNavLink, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CForm, CFormInput, CButton } from "@coreui/react"
import { useState } from "react"

export default function Navigation(){
    const [visible, setVisible] = useState(false)
    return (
      <CNavbar style={{background: '#eead2d'}}>
        <CContainer fluid>
          <CNavbarBrand>Beer Clicker</CNavbarBrand>
          <CNavbarToggler
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            onClick={() => setVisible(!visible)}
          />
          <COffcanvas id="offcanvasNavbar" style={{background: '#eead2d'}} placement="end" portal={false} visible={visible} onHide={() => setVisible(false)}>
            <COffcanvasHeader>
              <COffcanvasTitle>Beer Clicker</COffcanvasTitle>
              <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
            </COffcanvasHeader>
            <COffcanvasBody>
              <CNavbarNav>
                <CNavItem>
                  <CNavLink href="/" active>
                    Home
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/jogo/play">Jogo</CNavLink>
                </CNavItem>
              </CNavbarNav>
            </COffcanvasBody>
          </COffcanvas>
        </CContainer>
      </CNavbar>
    )
}