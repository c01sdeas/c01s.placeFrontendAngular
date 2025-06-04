import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IBlogResponseListData, IBooleanResponse } from '../models/apps/blogApp/blogPostsCrudModel';
import { IBlogCategoryResponseData, IBlogCategoryResponseListData, IDeleteBlogCategoryRequestData, IGetAllBlogCategoriesRequestData, IGetBlogPostCategoryBySlugRequestData,  ICreateNewBlogCategoryRequestData, IUpdateBlogCategoryDescriptionRequestData, IUpdateBlogCategoryImageRequestData, IUpdateBlogCategoryMetaRequestData, IUpdateBlogCategoryStatusRequestData, IUpdateBlogCategoryTitleRequestData,ICreateNewBlogCategoryImageRequestData } from '../models/apps/blogApp/blogCategoriesCrudModel';


@Injectable({
  providedIn: 'root'
})
export class BlogCategoriesCrudService {

  constructor(private httpClient:HttpClient) { }

  apiUrl:string=environment.apiUrl + 'app/blog/';

  getAllBlogCategories(data:IGetAllBlogCategoriesRequestData):Observable<IBlogCategoryResponseListData>{
    return this.httpClient.post<IBlogCategoryResponseListData>(this.apiUrl + 'get-all-blog-categories', data, { withCredentials: true });
  }

  getBlogPostCategoryBySlug(data:IGetBlogPostCategoryBySlugRequestData):Observable<IBlogCategoryResponseData>{
    return this.httpClient.post<IBlogCategoryResponseData>(this.apiUrl + 'get-blog-post-category-by-slug', data, { withCredentials: true });
  }

  createNewBlogCategoryImage(data:FormData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'create-new-blog-category-image', data, { withCredentials: true });
  }
  createNewBlogCategory(data:ICreateNewBlogCategoryRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'create-new-blog-category', data, { withCredentials: true });
  }

  updateBlogCategoryTitle(data:IUpdateBlogCategoryTitleRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-category-title', data, { withCredentials: true });
  }

  updateBlogCategoryDescription(data:IUpdateBlogCategoryDescriptionRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-category-description', data, { withCredentials: true });
  }

  updateBlogCategoryImage(data:IUpdateBlogCategoryImageRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-category-image', data, { withCredentials: true });
  }

  updateBlogCategoryMeta(data:IUpdateBlogCategoryMetaRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-category-meta', data, { withCredentials: true });
  }

  updateBlogCategoryStatus(data:IUpdateBlogCategoryStatusRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'update-blog-category-status', data, { withCredentials: true });
  }

  deleteBlogCategory(data:IDeleteBlogCategoryRequestData):Observable<IBooleanResponse>{
    return this.httpClient.post<IBooleanResponse>(this.apiUrl + 'delete-blog-category', data, { withCredentials: true });
  }

}
