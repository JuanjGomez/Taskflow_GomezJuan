import { User } from '@/types/user.types';

export interface Project {
    id: string;
    name: string;
    description: string;
    admin_id: string;
    created_at: string;
    updated_at: string;
}

export interface ProjectWithDetails extends Project {
    admin: User;
    members: User[];
    total_hours?: number;
}