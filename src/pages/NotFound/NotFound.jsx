import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 gap-3">
            <p className="text-6xl font-black gradient-text">404</p>
            <h1 className="text-2xl font-bold">Page not found</h1>
            <p className="text-base-content/70">The page you are looking for does not exist or was moved.</p>
            <div className="flex gap-3 mt-4">
                <Link to="/" className="btn btn-primary">Go Home</Link>
                <Link to="/courses" className="btn btn-outline">Browse Courses</Link>
            </div>
        </div>
    );
}
