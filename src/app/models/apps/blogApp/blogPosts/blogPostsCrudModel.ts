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
    viewCount: number;
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
        viewCount: number;
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

interface IUpdateBlogPostViewLogRequestDto {
    blogPostID: string;
}

interface IUpdateBlogPostViewLogResponseDto extends IBaseResponse {
    data: number;
}


//blogPostComments
interface ICreateNewCommentRequestDto {
    blogPostID: string;
    comment: string;
    parentID?: string;
    username: string;
}

interface IUpdateCommentRequestDto {
    id: string;
    comment: string;
}


interface IComment {
    _id: string;
    blogPostID: string;
    comment: string;
    parentID?: string;
    username: string;
    userNickname: string;
    voteCount: number;
    vote: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface ICommentListResponseDto extends IBaseResponse {
    data: IComment[];
}

interface ICommentResponseDto extends IBaseResponse {
    data: IComment;
}

interface ICommentDeleteResponseDto extends IBaseResponse {
    data: boolean;
}

interface ICommentUpdateResponseDto extends IBaseResponse {
    data: IComment;
}

interface ICreateNewCommentResponseDto extends IBaseResponse {
    data: IComment;
}

interface ICommentWithReplies extends IComment {
    replies?: ICommentWithReplies[];
}

interface ICommentListWithRepliesResponseDto extends IBaseResponse {
    data: ICommentWithReplies[];
}

interface IUpdateCommentVoteRequestDto {
    commentID: string;
    vote: number;
}

interface ICommentVoteCountByUsernameResponseDto extends IBaseResponse {
    data: number;
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
    IUpdateBlogPostViewLogRequestDto,
    IUpdateBlogPostViewLogResponseDto,
    IComment,
    //subscribetonews
    ISubscribeToNewsRequestDto,

    //blogPostComments
    ICreateNewCommentRequestDto,
    IUpdateCommentRequestDto,
    ICommentListResponseDto,
    ICommentResponseDto,
    ICommentDeleteResponseDto,
    ICommentUpdateResponseDto,
    ICreateNewCommentResponseDto,
    ICommentWithReplies,
    ICommentListWithRepliesResponseDto,
    IUpdateCommentVoteRequestDto,
    ICommentVoteCountByUsernameResponseDto
};