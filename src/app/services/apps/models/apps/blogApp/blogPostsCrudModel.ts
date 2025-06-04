import { IBaseResponse } from "../../auths/authCrudModel";

interface ISubscribeToNewsRequestData {
    email: string;
}

interface IBlogResponseListData extends IBaseResponse {
    data: IBlogResponseDataForList[];
}

interface IBlogResponseDataForList {
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

interface IBlogResponseData extends IBaseResponse {
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

interface ICreateNewBlogPostRequestData {
    slug: string;
    image?: string;
    meta: string;
    title: string;
    intro: string;
    content: string;
    username: string;
}

interface IUpdateBlogPostTitleRequestData {
    id: string;
    title: string;
}

interface IUpdateBlogPostContentRequestData {
    id: string;
    content: string;
}

interface IUpdateBlogPostImageRequestData {
    id: string;
    image: string;
}

interface IUpdateBlogPostMetaRequestData {
    id: string;
    meta: string;
}

interface IUpdateBlogPostIntroRequestData {
    id: string;
    intro: string;
}

interface IUpdateBlogPostUserVotesRequestData {
    blogID: string;
    username: string;
    vote: number;
}

interface IGetBlogPostVotesRequestData {
    blogID: string;
}

interface IGetBlogPostVotesResponseData extends IBaseResponse {
    data: number;
}

interface IGetBlogPostUserVoteControlRequestData {
    blogID: string;
    username: string;
}

interface IGetBlogPostUserVoteControlResponseData extends IBaseResponse {
    data: number;
}

interface IUpdateBlogPostStatusRequestData {
    id: string;
}

interface IDeleteBlogPostRequestData {
    id: string;
}

interface IGetAllBlogPostsRequestData {
    page: number;
    limit: number;
}

interface IGetBlogPostBySlugRequestData {
    slug: string;
}

interface IGetBlogPostByCategoryIDRequestData {
    categoryID: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByCategorySlugRequestData {
    slug: string;
    page: number;
    limit: number;
}

interface IGetAllBlogPostsByUsernameRequestData {
    username: string;
    page: number;
    limit: number;
}

export type {
    ICreateNewBlogPostRequestData,
    IUpdateBlogPostTitleRequestData,
    IUpdateBlogPostContentRequestData,
    IUpdateBlogPostImageRequestData,
    IUpdateBlogPostMetaRequestData,
    IUpdateBlogPostIntroRequestData,
    IUpdateBlogPostUserVotesRequestData,
    IGetBlogPostVotesRequestData,
    IUpdateBlogPostStatusRequestData,
    IDeleteBlogPostRequestData,
    IGetBlogPostBySlugRequestData,
    IGetAllBlogPostsRequestData,
    IGetBlogPostByCategoryIDRequestData,
    IGetBlogPostByCategorySlugRequestData,
    IGetAllBlogPostsByUsernameRequestData,
    IBooleanResponse,
    IBlogResponseListData,
    IBlogResponseData,
    IGetBlogPostVotesResponseData,
    IGetBlogPostUserVoteControlRequestData,
    IGetBlogPostUserVoteControlResponseData,
    //subscribetonews
    ISubscribeToNewsRequestData
};