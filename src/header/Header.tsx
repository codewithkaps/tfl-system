import { SELECT_SERVICE } from '../store/actions';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import _ from 'underscore';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header(props: any) {
  const menuItemClick = (item: any, state: any, dispatch: any) => {
    dispatch({ type: SELECT_SERVICE, data: item });
  }

  const buildMenuItems = (state: any, dispatch: any) => {
    const menuitems = _.sortBy(state.services, 'modeName');

    return menuitems.map((item: any) => {
      const isNightService = !!item["serviceTypes"] ? item["serviceTypes"].filter((record: any) => (record["name"] === "Night")) : false;
      const isFacingDisruption = !!item["lineStatuses"] ? item["lineStatuses"].filter((record: any) => (record["statusSeverity"] !== 10)) : false;
      return (
        <NavDropdown.Item onClick={() => menuItemClick(item, state, dispatch)}>
          <Link to={`/service/${item.id}`}>
            {item.name} {isNightService.length ? '(N) ' : ''} {isFacingDisruption.length ? '(SD)' : ''}
          </Link>
        </NavDropdown.Item>
      );
    });
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="TFL Services" id="basic-nav-dropdown">
              {buildMenuItems(props.state, props.dispatch)}
            </NavDropdown>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default Header;
