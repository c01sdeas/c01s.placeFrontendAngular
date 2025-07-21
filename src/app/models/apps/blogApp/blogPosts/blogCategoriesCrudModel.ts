import { IBaseResponse } from "../../../auths/authCrudModel";

interface IBlogCategoryResponseListData extends IBaseResponse {
    data: IBlogCategoryResponseData[];
}
interface IBlogCategoryResponseData {
    id: string;
    slug: string;
    image: string;
    meta: string;
    title: string;
    status: boolean;
    username: string;
    userNickname: string;
    description: string;
    isFollowing: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogCategoryResponseDto extends IBaseResponse{
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
        isFollowing: boolean;
        createdAt: string;
        updatedAt: string;
    }
}

interface ICreateNewBlogCategoryImageRequestDto {
    tagImage: File;
    slug: string;
}
interface ICreateNewBlogCategoryRequestDto {
    title: string;
    description: string;
    image?: string;
    status: boolean;
    meta: string;
    username: string;
}
interface IUpdateBlogCategoryTitleRequestDto {
    id: string;
    title: string;
}
interface IUpdateBlogCategoryDescriptionRequestDto {
    id: string;
    description: string;
}
interface IUpdateBlogCategoryImageRequestDto {
    id: string;
    image: string;
}
interface IUpdateBlogCategoryMetaRequestDto {
    id: string;
    meta: string;
}
interface IUpdateBlogCategoryStatusRequestDto {
    id: string;
}

interface IGetAllBlogCategoriesRequestDto {
    page: number;
    limit: number;
}
interface IGetBlogPostCategoryBySlugRequestDto {
    slug: string;
    page: number;
    limit: number;
}
interface IGetAllBlogPostCategoriesRequestDto {
    page: number;
    limit: number;
    categoryID: string;
}
interface IGetAllBlogPostCategoriesByUsernameRequestDto {
    username: string;
    page: number;
    limit: number;
}
interface IDeleteBlogCategoryRequestDto {
    id: string;
}


export type {
    IBlogCategoryResponseListData,
    ICreateNewBlogCategoryImageRequestDto,
    ICreateNewBlogCategoryRequestDto,
    IUpdateBlogCategoryTitleRequestDto,
    IUpdateBlogCategoryDescriptionRequestDto,
    IUpdateBlogCategoryImageRequestDto,
    IUpdateBlogCategoryMetaRequestDto,
    IUpdateBlogCategoryStatusRequestDto,
    IGetAllBlogCategoriesRequestDto,
    IGetBlogPostCategoryBySlugRequestDto,
    IGetAllBlogPostCategoriesRequestDto,
    IGetAllBlogPostCategoriesByUsernameRequestDto,
    IDeleteBlogCategoryRequestDto,
    IBlogCategoryResponseDto
};