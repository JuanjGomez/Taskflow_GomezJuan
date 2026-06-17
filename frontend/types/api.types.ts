import { StatusResponse } from '@/types/common.types';

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: StatusResponse;
    errors?: Record<string, string[]>;
}