import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IBlogResponseData, IBlogResponseListData, IBooleanResponse, ICreateNewBlogPostRequestData, IDeleteBlogPostRequestData, IGetAllBlogPostsRequestData, IGetBlogPostByCategoryIDRequestData, IGetBlogPostByCategorySlugRequestData, IGetBlogPostBySlugRequestData, IGetAllBlogPostsByUsernameRequestData, IGetBlogPostUserVoteControlRequestData, IGetBlogPostUserVoteControlResponseData, IGetBlogPostVotesRequestData, IGetBlogPostVotesResponseData, ISubscribeToNewsRequestData, IUpdateBlogPostContentRequestData, IUpdateBlogPostImageRequestData, IUpdateBlogPostIntroRequestData, IUpdateBlogPostMetaRequestData, IUpdateBlogPostStatusRequestData, IUpdateBlogPostTitleRequestData, IUpdateBlogPostUserVotesRequestData } from '../models/apps/blogApp/blogPostsCrudModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogPostsCrudService {

  constructor(private httpClient:HttpClient) { }
  
  apiUrl:string=environment.apiUrl + 'app/blog/';

  subscribeToNews(data:ISubscribeToNewsRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'subscribe-to-news', data, { withCredentials: true });
  }

  getAllBlogPosts(data:IGetAllBlogPostsRequestData):Observable<IBlogResponseListData>{
    return this.httpClient.post<IBlogResponseListData>(this.apiUrl + 'get-all-blog-posts', data, { withCredentials: true });
  }
  getBlogPostBySlug(data:IGetBlogPostBySlugRequestData):Observable<IBlogResponseData>{
    return this.httpClient.post<IBlogResponseData>(this.apiUrl + 'get-blog-post-by-slug/' + data.slug, data, { withCredentials: true });
  }
  getAllBlogPostsByCategoryID(data:IGetBlogPostByCategoryIDRequestData):Observable<IBlogResponseListData>{
    return this.httpClient.post<IBlogResponseListData>(this.apiUrl + 'get-all-blog-posts-by-category-id', data, { withCredentials: true });
  }
  getAllBlogPostsByCategorySlug(data:IGetBlogPostByCategorySlugRequestData):Observable<IBlogResponseListData>{
    return this.httpClient.post<IBlogResponseListData>(this.apiUrl + 'get-all-blog-posts-by-category-slug', data, { withCredentials: true });
  }

  getAllBlogPostsByUsername(data:IGetAllBlogPostsByUsernameRequestData):Observable<IBlogResponseListData>{
    return this.httpClient.post<IBlogResponseListData>(this.apiUrl + 'get-all-blog-posts-by-username', data, { withCredentials: true });
  }


  createNewBlogPost(data:ICreateNewBlogPostRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'create-new-blog-post', data, { withCredentials: true });
  }

  updateBlogPostTitle(data:IUpdateBlogPostTitleRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-post-title', data, { withCredentials: true });
  }

  updateBlogPostContent(data:IUpdateBlogPostContentRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-post-content', data, { withCredentials: true });
  }

  updateBlogPostImage(data:IUpdateBlogPostImageRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-post-image', data, { withCredentials: true });
  }

  updateBlogPostMeta(data:IUpdateBlogPostMetaRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-post-meta', data, { withCredentials: true });
  }

  updateBlogPostIntro(data:IUpdateBlogPostIntroRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-post-intro', data, { withCredentials: true });
  }

  updateBlogPostVote(data:IUpdateBlogPostUserVotesRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-post-vote', data, { withCredentials: true });
  }

  getBlogPostVoteCount(data:IGetBlogPostVotesRequestData):Observable<IGetBlogPostVotesResponseData>{
    return this.httpClient.post<IGetBlogPostVotesResponseData>(this.apiUrl + 'get-blog-post-vote-count', data, { withCredentials: true });
  }

  getBlogPostUserVoteControl(data:IGetBlogPostUserVoteControlRequestData):Observable<IGetBlogPostUserVoteControlResponseData>{
    return this.httpClient.post<IGetBlogPostUserVoteControlResponseData>(this.apiUrl + 'get-blog-post-user-vote-control', data, { withCredentials: true });
  }

  

  updateBlogPostStatus(data:IUpdateBlogPostStatusRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-post-status', data, { withCredentials: true });
  }

  deleteBlogPost(data:IDeleteBlogPostRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'delete-blog-post', data, { withCredentials: true });
  }

  
}
