import { IBaseResponse } from "../../auths/authCrudModel";

interface IBlogCategoryResponseListData extends IBaseResponse {
    data: IBlogCategoryResponseListData[];
}
interface IBlogCategoryResponseListData {
    id: string;
    slug: string;
    image: string;
    meta: string;
    title: string;
    status: boolean;
    username: string;
    userNickname: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogCategoryResponseData extends IBaseResponse{
    data: {
        id: string;
        slug: string;
        image: string;
        meta: string;
        title: string;
        status: boolean;
        username: string;
        userNickname: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    }
}

interface ICreateNewBlogCategoryImageRequestData {
    tagImage: File;
    slug: string;
}
interface ICreateNewBlogCategoryRequestData {
    title: string;
    description: string;
    image?: string;
    status: boolean;
    meta: string;
    username: string;
}
interface IUpdateBlogCategoryTitleRequestData {
    id: string;
    title: string;
}
interface IUpdateBlogCategoryDescriptionRequestData {
    id: string;
    description: string;
}
interface IUpdateBlogCategoryImageRequestData {
    id: string;
    image: string;
}
interface IUpdateBlogCategoryMetaRequestData {
    id: string;
    meta: string;
}
interface IUpdateBlogCategoryStatusRequestData {
    id: string;
    status: boolean;
}

interface IGetAllBlogCategoriesRequestData {
    page: number;
    limit: number;
}
interface IGetBlogPostCategoryBySlugRequestData {
    slug: string;
    page: number;
    limit: number;
}
interface IGetAllBlogPostCategoriesRequestData {
    page: number;
    limit: number;
    categoryID: string;
}
interface IDeleteBlogCategoryRequestData {
    id: string;
}

export type {
    IBlogCategoryResponseListData,
    ICreateNewBlogCategoryImageRequestData,
    ICreateNewBlogCategoryRequestData,
    IUpdateBlogCategoryTitleRequestData,
    IUpdateBlogCategoryDescriptionRequestData,
    IUpdateBlogCategoryImageRequestData,
    IUpdateBlogCategoryMetaRequestData,
    IUpdateBlogCategoryStatusRequestData,
    IGetAllBlogCategoriesRequestData,
    IGetBlogPostCategoryBySlugRequestData,
    IGetAllBlogPostCategoriesRequestData,
    IDeleteBlogCategoryRequestData,
    IBlogCategoryResponseData
};