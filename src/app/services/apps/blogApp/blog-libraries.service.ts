import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICreateNewBlogLibraryRequestDto, IUpdateBlogLibraryDescriptionRequestDto, IUpdateBlogLibraryStatusRequestDto, IUpdateBlogLibraryTitleRequestDto, IDeleteBlogLibraryRequestDto, IGetAllBlogLibrariesByUsernameRequestDto, IGetAllBlogPostsInLibraryRequestDto, ICreateNewBlogPostInLibraryRequestDto, IUpdateBlogPostInLibraryRequestDto, IDeleteBlogPostInLibraryRequestDto, IUpdateBlogPostInLibraryStatusRequestDto, IDeleteFollowingTagRequestDto, IUpdateFollowingTagStatusRequestDto, ICreateNewFollowingTagRequestDto, IGetAllFollowingTagsByUsernameRequestDto, IGetAllBlogPostsByFollowingTagsRequestDto, IGetAllBlogPostsByUsernameForLibraryRequestDto } from '../../../models/apps/blogApp/blogLibraries/blogLibrariesRequestModel';
import { Observable } from 'rxjs';
import { IBlogListResponseDto, IBooleanResponse } from '../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { IBlogLibraryListResponseDto, IBlogPostListInLibraryResponseDto, IFollowingTagListResponseDto } from '../../../models/apps/blogApp/blogLibraries/blogLibrariesResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BlogLibrariesService {

  constructor(private httpClient:HttpClient) { }
    
  apiUrl:string=environment.apiUrl + 'app/blog/';

  //blogLibraries
  createNewBlogLibraryService(data:ICreateNewBlogLibraryRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'create-new-blog-library', data, { withCredentials: true });
  }

  updateBlogLibraryTitleService(data:IUpdateBlogLibraryTitleRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-library-title', data, { withCredentials: true });
  }

  updateBlogLibraryDescriptionService(data:IUpdateBlogLibraryDescriptionRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-library-description', data, { withCredentials: true });
  }

  updateBlogLibraryStatusService(data:IUpdateBlogLibraryStatusRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-library-status', data, { withCredentials: true });
  }

  deleteBlogLibraryService(data:IDeleteBlogLibraryRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.delete<IBooleanResponse>(this.apiUrl + 'delete-blog-library', { withCredentials: true, body:data });
  }

  getAllBlogLibrariesByUsernameService(data:IGetAllBlogLibrariesByUsernameRequestDto):Observable<IBlogLibraryListResponseDto>{
    let params = new HttpParams();
    params = params.append('username', data.username?.toString() || '');
    params = params.append('blogPostID', data.blogPostID?.toString() || '');
    return this.httpClient.get<IBlogLibraryListResponseDto>(this.apiUrl + 'get-all-blog-libraries-by-username', { withCredentials: true, params });
  }

  //blogPostsInLibraries
  getAllBlogPostsInLibraryService(data:IGetAllBlogPostsInLibraryRequestDto):Observable<IBlogPostListInLibraryResponseDto>{
    let params = new HttpParams();
    params = params.append('libraryID', data.libraryID.toString());
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    return this.httpClient.get<IBlogPostListInLibraryResponseDto>(this.apiUrl + 'get-all-blog-posts-in-library', { withCredentials: true, params });
  }

  temporarySaveToLibraryData:string="";
  createNewBlogPostInLibraryService(data:ICreateNewBlogPostInLibraryRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'create-new-blog-post-in-library', data, { withCredentials: true });
  }

  updateBlogPostInLibraryService(data:IUpdateBlogPostInLibraryRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-in-library', data, { withCredentials: true });
  }

  deleteBlogPostInLibraryService(data:IDeleteBlogPostInLibraryRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.delete<IBooleanResponse>(this.apiUrl + 'delete-blog-post-in-library', { withCredentials: true, body:data });
  }

  updateBlogPostInLibraryStatusService(data:IUpdateBlogPostInLibraryStatusRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-in-library-status', data, { withCredentials: true });
  }

  //followingTags
  createNewFollowingTagService(data:ICreateNewFollowingTagRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'create-new-following-tag', data, { withCredentials: true });
  }

  updateFollowingTagStatusService(data:IUpdateFollowingTagStatusRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-following-tag-status', data, { withCredentials: true });
  }

  deleteFollowingTagService(data:IDeleteFollowingTagRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.delete<IBooleanResponse>(this.apiUrl + 'delete-following-tag', { withCredentials: true, body:data });
  }

  getAllBlogPostsByFollowingTagsService(data:IGetAllBlogPostsByFollowingTagsRequestDto):Observable<IBlogListResponseDto>{
    let params = new HttpParams();
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    return this.httpClient.get<IBlogListResponseDto>(this.apiUrl + 'get-all-blog-posts-by-following-tags', { withCredentials: true, params });
  }

  getAllFollowingTagsByUsernameService(data:IGetAllFollowingTagsByUsernameRequestDto):Observable<IFollowingTagListResponseDto>{
    let params = new HttpParams();
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    return this.httpClient.get<IFollowingTagListResponseDto>(this.apiUrl + 'get-all-following-tags-by-username', { withCredentials: true, params });
  }

  getAllFollowingTags():Observable<IFollowingTagListResponseDto>{
    return this.httpClient.get<IFollowingTagListResponseDto>(this.apiUrl + 'get-all-following-tags', { withCredentials: true });
  }

  getAllBlogPostsByUsernameForLibraryService(data:IGetAllBlogPostsByUsernameForLibraryRequestDto):Observable<IBlogListResponseDto>{
    let params = new HttpParams();
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    return this.httpClient.get<IBlogListResponseDto>(this.apiUrl + 'get-all-blog-posts-by-username-for-library', { withCredentials: true, params });
  }
}
