import { IBaseResponse } from "../../../auths/authCrudModel";

interface IBlogLibraryListResponseDto extends IBaseResponse {
    data: IBlogLibraryResponseDto[];
}

interface IBlogLibraryResponseDto {
        id: string;
        title: string;
        description: string;
        status: boolean;
        blogPostInLibraryID:string;
        blogPostInLibraryStatus:boolean;
        username: string;
        createdAt: Date;
        updatedAt: Date;
}

interface IBlogPostListInLibraryResponseDto extends IBaseResponse {
    data: IBlogPostInLibraryResponseDto[];
}
interface IBlogPostInLibraryResponseDto {
    libraryID: string;

    id: string;
    blogPostID: string;
    title: string;
    slug: string;
    image: string;
    readingTime: string;
    meta: string;
    intro: string;
    content: string;
    categoryID: string;
    categoryTitle: string;
    categorySlug: string;
    username: string;
    status: boolean;
    blogPostInLibraryStatus: boolean;
    userNickname: string;
    createdAt: Date;
    updatedAt: Date;
    voteCount: number;
    viewCount: number;
}

//followingTags
interface IFollowingTagListResponseDto extends IBaseResponse {
    data: IFollowingTagResponseDto[];
}

interface IFollowingTagResponseDto {
    id: string;
    tagID: string;
    tagTitle: string;
    tagSlug: string;
    tagMeta: string;
    tagDescription: string;
    tagImage: string;
    tagStatus: boolean;
    tagUsername: string;
    tagUserNickname: string;
    username: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    IBlogLibraryListResponseDto,
    IBlogLibraryResponseDto,
    IBlogPostListInLibraryResponseDto,
    IBlogPostInLibraryResponseDto,

    //followingTags
    IFollowingTagResponseDto,
    IFollowingTagListResponseDto
}