import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interfaces';

export type IAcademicDepartment = {
  title: string;
  User: Types.ObjectId | IUser;
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  User?: Types.ObjectId;
};
