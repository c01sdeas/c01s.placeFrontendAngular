interface ICreateNewBlogLibraryRequestDto {
    title: string;
    description: string;
}

interface IUpdateBlogLibraryTitleRequestDto {
    id: string;
    title: string;
}
interface IUpdateBlogLibraryDescriptionRequestDto {
    id: string;
    description: string;
}
interface IUpdateBlogLibraryStatusRequestDto {
    id: string;
}

interface IDeleteBlogLibraryRequestDto {
    id: string;
}

interface IGetAllBlogLibrariesByUsernameRequestDto {
    blogPostID?: string;
}
interface IGetAllBlogPostsByUsernameForLibraryRequestDto {
    page: number;
    limit: number;
}


interface ICreateNewBlogPostInLibraryRequestDto {
    blogPostID: string;
    libraryID: string;
}

interface IUpdateBlogPostInLibraryRequestDto {
    id: string;
    blogPostID: string;
    libraryID: string;
}
interface IUpdateBlogPostInLibraryStatusRequestDto {
    id: string;
    status: boolean;
}
interface IDeleteBlogPostInLibraryRequestDto {
    libraryID: string;
    blogPostID: string;
}
interface IGetAllBlogPostsInLibraryRequestDto {
    libraryID: string;
    page: number;
    limit: number;
}

//followingTags
interface ICreateNewFollowingTagRequestDto {
    tagID: string;
}
interface IUpdateFollowingTagRequestDto {
    id: string;
    tagID: string;
}
interface IDeleteFollowingTagRequestDto {
    id: string;
}
interface IGetAllFollowingTagsByUsernameRequestDto {
    page: number;
    limit: number;
}
interface IGetAllBlogPostsByFollowingTagsRequestDto {
    page: number;
    limit: number;
}
interface IUpdateFollowingTagStatusRequestDto {
    tagID: string;
}

export type {
    ICreateNewBlogLibraryRequestDto,
    ICreateNewBlogPostInLibraryRequestDto,
    IUpdateBlogLibraryTitleRequestDto,
    IUpdateBlogLibraryDescriptionRequestDto,
    IUpdateBlogLibraryStatusRequestDto,
    IUpdateBlogPostInLibraryRequestDto,
    IUpdateBlogPostInLibraryStatusRequestDto,
    IDeleteBlogLibraryRequestDto,
    IDeleteBlogPostInLibraryRequestDto,
    IGetAllBlogLibrariesByUsernameRequestDto,
    IGetAllBlogPostsInLibraryRequestDto,
    IGetAllBlogPostsByUsernameForLibraryRequestDto,
    //followingTags
    ICreateNewFollowingTagRequestDto,
    IUpdateFollowingTagRequestDto,
    IDeleteFollowingTagRequestDto,
    IGetAllFollowingTagsByUsernameRequestDto,
    IUpdateFollowingTagStatusRequestDto,
    IGetAllBlogPostsByFollowingTagsRequestDto
}