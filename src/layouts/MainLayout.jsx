import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { getMeAsync } from "../store/slices/authSlice";
import { fetchMyEnrollments } from "../store/slices/enrollmentSlice";

export default function MainLayout() {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.auth);

    // load the signed-in user once (also after a page refresh)
    useEffect(() => {
        if (token && !user) {
            dispatch(getMeAsync());
        }
    }, [token, user, dispatch]);

    // only students have enrollments
    useEffect(() => {
        if (user?.role === "student") {
            dispatch(fetchMyEnrollments());
        }
    }, [user?.role, dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
