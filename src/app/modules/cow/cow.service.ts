import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOption';
import { cowSearchableFields } from './cow.constants';
import { ICow, ICowFilters } from './cow.interfaces';
import { Cow } from './cow.model';

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (
    paginationOptions?.minPrice !== undefined &&
    paginationOptions?.maxPrice !== undefined
  ) {
    andConditions.push({
      price: {
        $gte: paginationOptions?.minPrice,
        $lte: paginationOptions?.maxPrice,
      },
    });
  }

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const result = (await Cow.create(payload)).populate({
    path: 'seller',
    options: { strictPopulate: false },
  });
  return result;
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate({
    path: 'seller',
    options: { strictPopulate: false },
  });
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate({
    path: 'seller',
    options: { strictPopulate: false },
  });
  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
  createCow,
};
