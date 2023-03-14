import { Link } from "react-router-dom";

const NotFound = ({ user }) => {
   return (
    <div>
        Not Found

        <div>
            <Link to={ user ?   '/dashboard' : '/' } >
            Take me to  { user ?   'dashboard' : 'home' }
            </Link>
        </div>
    </div>
   )
}

export default NotFound;
