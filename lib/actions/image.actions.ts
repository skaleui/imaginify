"use server";

import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";
import cloudinary from "../../app/cloudinary";

const populateUser = (query: any) => query.populate({
  path: 'author',
  model: User,
  select: '_id firstName lastName clerkId'
})

export async function addImage({ image, userId, path}: AddImageParams) {

  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if(!author) {
      throw new Error(`User with id ${userId} not found`);
    }

    const newImage = await Image.create({
      ...image,
      author: author._id,
    });

    revalidatePath(path);


    return JSON.parse(JSON.stringify(image));
  } catch(error) {
    handleError(error);
  }
}

export async function updateImage({ image, userId, path}: UpdateImageParams) {

  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if(!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error(`Unauthorized or Image with id ${image._id} not found`);
    }

    const updatedImage = await Image.findByIdAndUpdate(imageToUpdate._id, image, { new: true});

    revalidatePath(path);


    return JSON.parse(JSON.stringify(image));
  } catch(error) {
    handleError(error);
  }
}

export async function deleteImage( imageId: string) {

  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);

  } catch(error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}

export async function getImageById(imageId: string) {

  try {
    await connectToDatabase();

    const image = await populateUser(Image.findById(imageId));


    if(!image) {
      throw new Error(`Image with id ${imageId} not found`);
    }

    return JSON.parse(JSON.stringify(image));;
  } catch(error) {
    handleError(error);
  }
}

export async function getAllImages({ limit = 9, page = 1, searchQuery = "" } : {
  limit?: number;
  page: number;
  searchQuery?: string;
}) {

  try {
    await connectToDatabase();

    let expression = 'folder=imaginify';

    if(searchQuery) {
      const newLocal = expression += ` AND ${searchQuery}`;
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourceIds = resources.map((resource: any) => resource.public_id);

    let query = {};

    if(searchQuery) {
      query = {
        publicId: {
          $in: resourceIds
        }
      }
    }

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find(query))
      .sort({updatedAt : -1})
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find(query).countDocuments();
    const savedImages = await Image.find().countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: Math.ceil(totalImages / limit),
      savedImages,
    }
  
  } catch(error) {
    handleError(error);
  }
}
// GET IMAGES BY USER
export async function getUserImages({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: string;
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find({ author: userId }).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}