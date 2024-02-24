import Reactå from "react";
import {Link} from 'react-router-dom'

const Home = () =>{
    const padding = {
        padding: 5
      }

    return(
        <div>
            <Link style={padding} to="/loginpage">LOGIN</Link>
            <Link style={padding} to="/signup">SIGNUP</Link>

        </div>
    )
}

export default Home;