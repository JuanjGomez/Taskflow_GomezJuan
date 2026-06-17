type Roles = "admin" | "user";
type StattusResponse = "completed" | "pending" |"error";

interface User {
    id: string;
    name: string;
    email: string;
    role: Roles;
};

interface Project {
    id: string;
    name: string;
    description: string;
    admin_id: string;
    created: string;
};

interface TimeEntry {
    id: number;
    user_id: string;
    project_id: string;
    hours: number;
    description: string;
    date: string;
};

interface ProjectWithDetails {

}

interface ApiResponse {
    data: string;
    message: string;
    status: StattusResponse;
}