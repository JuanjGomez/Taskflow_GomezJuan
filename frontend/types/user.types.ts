import { Roles } from "@/types/common.types";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Roles;
    email_verified_at?: string | null;
    created_at: string;
    updated_at: string;
}