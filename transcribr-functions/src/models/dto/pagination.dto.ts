export interface PaginationDto<T> {
  page: number;
  pages?: number;
  size?: number;
  limit: number;
  orderBy: string;
  ascending: boolean;
  data?: T[];
}
