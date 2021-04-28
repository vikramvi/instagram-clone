import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function PasswordReset() {
    return (
        <div>
            <Link
                to={ROUTES.LOGIN}
            >
                Back to Login
            </Link>
        </div>
    )
}