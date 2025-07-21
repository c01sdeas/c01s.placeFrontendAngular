import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IBlogCategoryResponseDto, IBlogCategoryResponseListData, IDeleteBlogCategoryRequestDto, IGetAllBlogCategoriesRequestDto, IGetBlogPostCategoryBySlugRequestDto,  ICreateNewBlogCategoryRequestDto, IUpdateBlogCategoryDescriptionRequestDto, IUpdateBlogCategoryImageRequestDto, IUpdateBlogCategoryMetaRequestDto, IUpdateBlogCategoryStatusRequestDto, IUpdateBlogCategoryTitleRequestDto,ICreateNewBlogCategoryImageRequestDto, IGetAllBlogPostCategoriesByUsernameRequestDto } from '../../../models/apps/blogApp/blogPosts/blogCategoriesCrudModel';
import { IBooleanResponse } from '../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';


@Injectable({
  providedIn: 'root'
})
export class BlogCategoriesCrudService {

  constructor(private httpClient:HttpClient) { }

  apiUrl:string=environment.apiUrl + 'app/blog/';

  getAllBlogCategories(data:IGetAllBlogCategoriesRequestDto):Observable<IBlogCategoryResponseListData>{
    let params = new HttpParams();
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    return this.httpClient.get<IBlogCategoryResponseListData>(this.apiUrl + 'get-all-blog-categories', { withCredentials: true, params });
  }

  getAllBlogPostCategoriesByUsername(data:IGetAllBlogPostCategoriesByUsernameRequestDto):Observable<IBlogCategoryResponseListData>{
    let params = new HttpParams();
    params = params.append('page', data.page.toString());
    params = params.append('limit', data.limit.toString());
    params = params.append('username', data.username.toString());
    return this.httpClient.get<IBlogCategoryResponseListData>(this.apiUrl + 'get-all-blog-post-categories-by-username', { withCredentials: true, params });
  }

  getBlogPostCategoryBySlug(data:IGetBlogPostCategoryBySlugRequestDto):Observable<IBlogCategoryResponseDto>{
    let params = new HttpParams();
    params = params.append('slug', data.slug.toString());
    return this.httpClient.get<IBlogCategoryResponseDto>(this.apiUrl + 'get-blog-post-category-by-slug', { withCredentials: true, params });
  }

  createNewBlogCategoryImage(data:FormData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'create-new-blog-category-image', data, { withCredentials: true });
  }
  createNewBlogCategory(data:ICreateNewBlogCategoryRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'create-new-blog-category', data, { withCredentials: true });
  }

  updateBlogCategoryTitle(data:IUpdateBlogCategoryTitleRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-category-title', data, { withCredentials: true });
  }

  updateBlogCategoryDescription(data:IUpdateBlogCategoryDescriptionRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-category-description', data, { withCredentials: true });
  }

  updateBlogCategoryImage(data:IUpdateBlogCategoryImageRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-category-image', data, { withCredentials: true });
  }

  updateBlogCategoryMeta(data:IUpdateBlogCategoryMetaRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-category-meta', data, { withCredentials: true });
  }

  updateBlogCategoryStatus(data:IUpdateBlogCategoryStatusRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.patch<IBooleanResponse>(this.apiUrl + 'update-blog-category-status', data, { withCredentials: true });
  }

  deleteBlogCategory(data:IDeleteBlogCategoryRequestDto):Observable<IBooleanResponse>{
    return this.httpClient.delete<IBooleanResponse>(this.apiUrl + 'delete-blog-category', { withCredentials: true, body:data });
  }

}
