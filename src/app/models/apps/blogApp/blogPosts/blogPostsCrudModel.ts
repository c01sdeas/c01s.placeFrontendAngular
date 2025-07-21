import { IBaseResponse } from "../../../auths/authCrudModel";

interface ISubscribeToNewsRequestDto {
    email: string;
}

interface IBlogListResponseDto extends IBaseResponse {
    data: IBlogResponseDtoForList[];
}

interface IBlogResponseDtoForList {
    id: string;
    slug: string;
    image: string;
    readingTime: string;
    meta: string;
    title: string;
    intro: string;
    content: string;
    categoryID: string;
    categoryTitle: string;
    categorySlug: string;
    categoryStatus: boolean;
    username: string;
    status: boolean;
    voteCount: number;
    userNickname: string;
    comments: {username:string, userNickname:string, content:string, createdAt:Date}[];
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogResponseDto extends IBaseResponse {
    data: {
        id: string;
        slug: string;
        image: string;
        readingTime: string;
        meta: string;
        title: string;
        intro: string;
        content: string;
        categoryID: string;
        categoryTitle: string;
        categorySlug: string;
        username: string;
        status: boolean;
        voteCount: number;
        userNickname: string;
        comments: {username:string, userNickname:string, content:string, createdAt:Date}[];
        createdAt: Date;
        updatedAt: Date;
    }
}

interface IBooleanResponse extends IBaseResponse {
    data: boolean;
}

interface ICreateNewBlogPostRequestDto {
    slug: string;
    image?: string;
    meta: string;
    title: string;
    intro: string;
    content: string;
    username: string;
}

interface ICreateNewBlogPostImageResponseDto extends IBaseResponse {
    data: string;
}

interface ICreateNewBlogPostImageRequestDto {
    image: File;
}

interface IUpdateBlogPostTitleRequestDto {
    id: string;
    title: string;
}

interface IUpdateBlogPostContentRequestDto {
    id: string;
    content: string;
}

interface IUpdateBlogPostImageRequestDto {
    id: string;
    image: string;
}

interface IUpdateBlogPostMetaRequestDto {
    id: string;
    meta: string;
}

interface IUpdateBlogPostIntroRequestDto {
    id: string;
    intro: string;
}

interface IUpdateBlogPostUserVotesRequestDto {
    blogPostID: string;
    username: string;
    vote: number;
}

interface IGetBlogPostVotesRequestDto {
    blogPostID: string;
}

interface IGetBlogPostVotesResponseDto extends IBaseResponse {
    data: number;
}

interface IGetBlogPostUserVoteControlRequestDto {
    blogPostID: string;
    username: string;
}

interface IGetBlogPostUserVoteControlResponseDto extends IBaseResponse {
    data: number;
}

interface IUpdateBlogPostStatusRequestDto {
    id: string;
}

interface IDeleteBlogPostRequestDto {
    id: string;
}

interface IGetAllBlogPostsRequestDto {
    page: number;
    limit: number;
}

interface IGetBlogPostBySlugRequestDto {
    slug: string;
}

interface IGetBlogPostByCategoryIDRequestDto {
    categoryID: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByCategorySlugRequestDto {
    slug: string;
    page: number;
    limit: number;
}

interface IGetAllBlogPostsByUsernameRequestDto {
    username: string;
    page: number;
    limit: number;
}

interface IUpdateBlogPostViewCountRequestDto {
    id: string;
}

export type {
    ICreateNewBlogPostRequestDto,
    ICreateNewBlogPostImageRequestDto,
    ICreateNewBlogPostImageResponseDto,
    IUpdateBlogPostTitleRequestDto,
    IUpdateBlogPostContentRequestDto,
    IUpdateBlogPostImageRequestDto,
    IUpdateBlogPostMetaRequestDto,
    IUpdateBlogPostIntroRequestDto,
    IUpdateBlogPostUserVotesRequestDto,
    IGetBlogPostVotesRequestDto,
    IUpdateBlogPostStatusRequestDto,
    IDeleteBlogPostRequestDto,
    IGetBlogPostBySlugRequestDto,
    IGetAllBlogPostsRequestDto,
    IGetBlogPostByCategoryIDRequestDto,
    IGetBlogPostByCategorySlugRequestDto,
    IGetAllBlogPostsByUsernameRequestDto,
    IBooleanResponse,
    IBlogListResponseDto,
    IBlogResponseDto,
    IGetBlogPostVotesResponseDto,
    IGetBlogPostUserVoteControlRequestDto,
    IGetBlogPostUserVoteControlResponseDto,
    IUpdateBlogPostViewCountRequestDto,
    //subscribetonews
    ISubscribeToNewsRequestDto
};