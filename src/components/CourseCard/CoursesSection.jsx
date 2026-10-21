import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCourses } from "../../services/courses.api";
import CoursesFilters from "./CoursesFilters";
import CoursesGrid from "./CoursesGrid";
import CoursesPagination from "./CoursesPagination";

// value that only updates after the user stops typing for `delay` ms
function useDebouncedValue(value, delay) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}

export default function CoursesSection() {
    const { user } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // query states
    const [page, setPage] = useState(1);
    const [limit] = useState(8);
    const [search, setSearch] = useState("");
    const [submittedSearch, setSubmittedSearch] = useState("");
    const [sort, setSort] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");

    // typing in the text filters should not send a request per keystroke
    const debouncedCategory = useDebouncedValue(category.trim(), 400);
    const debouncedTags = useDebouncedValue(tags.trim(), 400);

    // go back to page 1 whenever the active filters change (before fetching)
    const filtersKey = [submittedSearch, sort, debouncedCategory, debouncedTags].join("|");
    const [prevFiltersKey, setPrevFiltersKey] = useState(filtersKey);
    if (filtersKey !== prevFiltersKey) {
        setPrevFiltersKey(filtersKey);
        setPage(1);
    }

    useEffect(() => {
        // ignore responses that arrive after newer filters were applied
        let ignore = false;

        const fetchCourses = async () => {
            try {
                setLoading(true);
                setError(null);

                const params = {
                    page,
                    limit,
                    search: submittedSearch || undefined,
                    sort: sort || undefined,
                    category: debouncedCategory || undefined,
                    tags: debouncedTags || undefined,
                };

                const res = await getCourses(params);
                if (ignore) return;
                setCourses(res.data.courses || []);
                setTotalPages(res.data.totalPages || 1);
            } catch (err) {
                if (!ignore) setError(err.response?.data?.message || "Failed to load courses");
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchCourses();
        return () => {
            ignore = true;
        };
    }, [page, limit, submittedSearch, sort, debouncedCategory, debouncedTags]);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setSubmittedSearch(search.trim());
    };

    return (
        <div className="space-y-6">

            <CoursesFilters
                search={search} setSearch={setSearch}
                sort={sort} setSort={setSort}
                category={category} setCategory={setCategory}
                tags={tags} setTags={setTags}
                onSearchSubmit={onSearchSubmit}
            />

            {/* states */}
            {loading && (
                <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {error && (
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            )}

            {!loading && !error && courses.length === 0 && (
                <div className="rounded-xl border border-primary/20 bg-base-200 p-6 text-center">
                    <h3 className="text-lg font-semibold text-primary">
                        No courses found
                    </h3>
                    <p className="mt-1 text-base-content/70">
                        Try adjusting your search or filters.
                    </p>
                </div>
            )}


            {!loading && !error && courses.length > 0 && (
                <>
                    <CoursesGrid courses={courses} />
                    {user?.role === "admin" && (
                        <div className="flex justify-center pt-4">
                            <Link
                                to="/admin/courses"
                                className="btn btn-primary btn-wide"
                            >
                                Manage Courses
                            </Link>
                        </div>
                    )}
                </>
            )}

            <CoursesPagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
        </div>
    );
}
