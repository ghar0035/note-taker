import { Link } from "react-router-dom";
import img404 from '../../images/404.png'
import { Container } from "../Register";

const NotFound = ({ user }) => {
   return (
    <Container className="container">
        <img src={img404} alt="not found" width={600} />

        <div>
            <Link to={ user ?   '/dashboard' : '/' } >
            Take me to  { user ?   'dashboard' : 'home' }
            </Link>
        </div>
    </Container>
   )
}

export default NotFound;
