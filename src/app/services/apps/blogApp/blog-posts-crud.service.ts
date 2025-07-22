import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IBlogResponseDto, IBlogListResponseDto, IBooleanResponse, ICreateNewBlogPostRequestDto, IDeleteBlogPostRequestDto, IGetAllBlogPostsRequestDto, IGetBlogPostByCategoryIDRequestDto, IGetBlogPostByCategorySlugRequestDto, IGetBlogPostBySlugRequestDto, IGetAllBlogPostsByUsernameRequestDto, IGetBlogPostUserVoteControlRequestDto, IGetBlogPostUserVoteControlResponseDto, IGetBlogPostVotesRequestDto, IGetBlogPostVotesResponseDto, ISubscribeToNewsRequestDto, IUpdateBlogPostContentRequestDto, IUpdateBlogPostImageRequestDto, IUpdateBlogPostIntroRequestDto, IUpdateBlogPostMetaRequestDto, IUpdateBlogPostStatusRequestDto, IUpdateBlogPostTitleRequestDto, IUpdateBlogPostUserVotesRequestDto, IUpdateBlogPostViewCountRequestDto, ICreateNewBlogPostImageRequestDto, ICreateNewBlogPostImageResponseDto, IUpdateBlogPostViewLogRequestDto, IUpdateBlogPostViewLogResponseDto } from '../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogPostsCrudService {

  constructor(private httpClient:HttpClient) { }
  
  apiUrl:string=environment.apiUrl + 'app/blog/';

  subscribeToNews(data:ISubscribeToNewsRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'subscribe-to-news', data, { withCredentials: true });
  }

  getAllBlogPosts(data:IGetAllBlogPostsRequestDto):Observable<IBlogListResponseDto>{
    let params = new HttpParams();
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    return this.httpClient.get<IBlogListResponseDto>(this.apiUrl + 'get-all-blog-posts', { withCredentials: true, params });
  }
  getBlogPostBySlug(data:IGetBlogPostBySlugRequestDto):Observable<IBlogResponseDto>{
    let params = new HttpParams();
    params = params.append('slug', data.slug.toString());
    return this.httpClient.get<IBlogResponseDto>(this.apiUrl + 'get-blog-post-by-slug', { withCredentials: true, params });
  }
  getAllBlogPostsByCategoryID(data:IGetBlogPostByCategoryIDRequestDto):Observable<IBlogListResponseDto>{
    let params = new HttpParams();
    params = params.append('categoryID', data.categoryID.toString());
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    return this.httpClient.get<IBlogListResponseDto>(this.apiUrl + 'get-all-blog-posts-by-category-id', { withCredentials: true, params });
  }
  getAllBlogPostsByCategorySlug(data:IGetBlogPostByCategorySlugRequestDto):Observable<IBlogListResponseDto>{
    let params = new HttpParams();
    params = params.append('slug', data.slug.toString());
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    return this.httpClient.get<IBlogListResponseDto>(this.apiUrl + 'get-all-blog-posts-by-category-slug', { withCredentials: true, params });
  }

  getAllBlogPostsByUsername(data:IGetAllBlogPostsByUsernameRequestDto):Observable<IBlogListResponseDto>{
    let params = new HttpParams();
    params = params.append('username', data.username?.toString() || '');
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    return this.httpClient.get<IBlogListResponseDto>(this.apiUrl + 'get-all-blog-posts-by-username', { withCredentials: true, params });
  }


  createNewBlogPost(data:ICreateNewBlogPostRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'create-new-blog-post', data, { withCredentials: true });
  }

  createNewBlogPostImage(data:FormData):Observable<ICreateNewBlogPostImageResponseDto>{
    return this.httpClient.post<ICreateNewBlogPostImageResponseDto>(this.apiUrl + 'create-new-blog-post-image', data, { withCredentials: true });
  }

  updateBlogPostTitle(data:IUpdateBlogPostTitleRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-title',data, { withCredentials: true });
  }

  updateBlogPostContent(data:IUpdateBlogPostContentRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-content',data, { withCredentials: true });
  }

  updateBlogPostImage(data:IUpdateBlogPostImageRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-image',data, { withCredentials: true });
  }

  updateBlogPostMeta(data:IUpdateBlogPostMetaRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-meta',data, { withCredentials: true });
  }

  updateBlogPostIntro(data:IUpdateBlogPostIntroRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-intro',data, { withCredentials: true });
  }

  updateBlogPostVote(data:IUpdateBlogPostUserVotesRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-vote',data, { withCredentials: true });
  }

  updateBlogPostViewCount(data:IUpdateBlogPostViewCountRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-view-count',data, { withCredentials: true });
  }

  updateBlogPostViewLog(data:IUpdateBlogPostViewLogRequestDto):Observable<IUpdateBlogPostViewLogResponseDto>{
    let params = new HttpParams();
    params = params.append('blogPostID', data.blogPostID.toString());
    return this.httpClient.get<IUpdateBlogPostViewLogResponseDto>(this.apiUrl + 'update-blog-post-view-log', { withCredentials: true, params });
  }

  getBlogPostVoteCount(data:IGetBlogPostVotesRequestDto):Observable<IGetBlogPostVotesResponseDto>{
    let params = new HttpParams();
    params = params.append('blogPostID', data.blogPostID.toString());
    return this.httpClient.get<IGetBlogPostVotesResponseDto>(this.apiUrl + 'get-blog-post-vote-count', { params, withCredentials: true });
  }

  getBlogPostUserVoteControl(data:IGetBlogPostUserVoteControlRequestDto):Observable<IGetBlogPostUserVoteControlResponseDto>{
    let params = new HttpParams();
    params = params.append('blogPostID', data.blogPostID.toString());
    params = params.append('username', data.username.toString());
    return this.httpClient.get<IGetBlogPostUserVoteControlResponseDto>(this.apiUrl + 'get-blog-post-user-vote-control', { params, withCredentials: true });
  }

  

  updateBlogPostStatus(data:IUpdateBlogPostStatusRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-post-status', data, { withCredentials: true });
  }

  deleteBlogPost(data:IDeleteBlogPostRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.delete<IBooleanResponse>(this.apiUrl + 'delete-blog-post',{ withCredentials: true, body:data });
  }

  searchInBlogPosts(data:{data:string}):Observable<IBlogListResponseDto>{
    let params = new HttpParams();
    params = params.append('data', data.data.toString());
    return this.httpClient.get<IBlogListResponseDto>(this.apiUrl + 'search-in-blog-posts', { params, withCredentials: true });
  }

  
}
