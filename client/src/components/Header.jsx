import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-green-700">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">

            <h1 className="font-bold">Welcome <span style={{color:'white',fontFamily:"-moz-initial"}}>{currentUser?.username}</span></h1>

        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li style={{color:'white'}}>Home</li>
          </Link>
          {currentUser ? (
            <>
              <Link to="/profile">
                <li>
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </li>
              </Link>
              {currentUser.role === "admin" && (
                <Link to="/admin-dash">
                  <li style={{color:'white'}}>Dashboard</li>
                </Link>
              )}
            </>
          ) : (
            <Link to="/sign-in">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
