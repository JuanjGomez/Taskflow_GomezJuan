import { User } from '@/types/user.types';
import { Project } from "@/types/project.types"

export interface TimeEntry {
    id: string;
    user_id: string;
    project_id: string;
    hours: number;
    description: string;
    date: string;
    created_at: string;
    updated_at: string;
}

export interface TimeEntryWithDetails extends TimeEntry {
    user: User;
    project: Project;
}