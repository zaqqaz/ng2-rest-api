# ng2-rest-api
This is a REST api provider for angular for http actions request to server and instantiate models.

For Angular 1: https://github.com/zaqqaz/ng-rest-api

## Installation

To install this library, run:

```bash
$ npm install ng2-rest-api
```

Ng2-rest-api - is a rest api provider for angular 2 for http actions request to server and instantiate models.
- Describe api to define endpoints and actions
- Improves code-reusability by separating configuration from code that does actual work.
- That simplifies common GET, POST, DELETE, and UPDATE requests.
- Use a parameterized URLs.
- Easy headers read.
- Cache requests (todo)

If you need - you can get plain text response (It is sometimes convenient, but do not overdo it)

![directive](https://cloud.githubusercontent.com/assets/2823336/19967580/9fa019e8-a1d9-11e6-827e-370232277c0d.png)


## Add to project

```bash
$ npm install ng-rest-api --save
```

## STEPS
1. Describe models
2. Create config
3. Add to @NgModule and execute static method *configure*.
5. Advice: use ApiProvider only in managers/services not from controllers.
6. *Enjoy!*

## Config

You should describe endpoints and http Actions.
Ng2-rest-api already had config for popular actions (get(GET),query(GET, array), update(PUT), patch(PATCH), remove(DELETE)).
But if you need you can override them and add any others.

![directive](https://cloud.githubusercontent.com/assets/2823336/19968023/63ec14f4-a1db-11e6-818c-9f22cae7107d.png)


### Let's look at the interfaces for config:

**ApiConfig**
```typescript
interface ApiConfig {
  baseUrl: string,
  endpoints: Endpoint[]
}
```

**Endpoint**
```typescript
interface Endpoint {
  name: OpaqueToken;
  route: string;
  model?: any;
  actions?: Action[];
}
```

**Action**
```typescript
interface Action {
   name: string,
   method: string,
   instantiateModel?: boolean,
   isArray?: boolean,
   headersForReading?: Array<string>,
   params?: any,
   cache?: any
 }
```
---

## Examples:
**Model**
```typescript
import {Image} from 'api/models/Image';

export class Post {
  id?: number;
  title: string;
  description: string;
  content: string;
  image: Image | any;

  constructor({id, title, description, content, image}:
              {id?: number, title: string, description: string, content: string, image: Image|any}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.content = content;
    this.image = new Image(image);
  }

  beforeSave() {
    if (this.image) {
      this.image = this.image.id;
    }
  }
}

```
**Config:**
```typescript
import {OpaqueToken} from "@angular/core";
import {Post} from "api/models/Post";

// endpoints
export const POSTS = new OpaqueToken('POSTS');

// config
export const apiConfig = {
  baseUrl: 'http://localhost:3000',
  endpoints: [
    {
      name: POSTS,
      model: Post,
      route: '/posts/:id',
      actions: [
        {
          name: 'query',
          method: 'GET',
          isArray: true,
          headersForReading: ['X-Total-Count'],
          params: {limit: 10}
        }
      ]
    }
  ]
};
```
**@NgModule**
```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MainComponent} from './endpoints/main/main.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes'
import {TypingCarouselDirective} from "./endpoints/main/typing-carousel.directive";
import {LoaderComponent} from './shared/loader/loader.component';
import {Ng2RestApiModule, ApiProvider} from "ng2-rest-api";
import {apiConfig} from "api/config";

import {PostsManager} from './api/services/PostsManager';
import { PostsComponent } from './endpoints/posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TypingCarouselDirective,
    LoaderComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    Ng2RestApiModule.configure(apiConfig)
  ],
  providers: [ApiProvider, PostsManager],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```
**Service**
```typescript
import {ApiProvider} from "ng2-rest-api";
import {POSTS} from "api/config";
import {Injectable} from "@angular/core";
import {Post} from "api/models/Post";

@Injectable()
export class PostsManager {
  constructor(private api: ApiProvider) {
  }

  getPost(id: number) {
    return this.api.endpoint(POSTS).action('get', {id});
  }

  queryPosts(query: string, offset: number) {
    return this.api.endpoint(POSTS).action('query', {query, offset});
  }

  savePost(post: Post) {
    return post.id ? this.api.endpoint(POSTS).action('update', post) : this.api.endpoint(POSTS).action('save', post);
  }
}
```
**Controller**
```typescript
import {Component, OnInit} from '@angular/core';
import {PostsManager} from 'api/services/PostsManager';
import {Post} from 'api/models/Post';
import {Image} from 'api/models/Image';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private postsManager: PostsManager) {}

  example() {
    // search 'evolution' posts with offset = 0
    this.postsManager.queryPosts('evolution', 0).subscribe(([posts, headers]) => {
      this.total = headers['X-Total-Count'];
      this.posts = posts;
      console.log('Response', this.posts, 'X-Total-Count', this.total);
    });

    // get post with id 1
    this.postsManager.getPost(1).subscribe(post => {
      console.log('SINGLE', post);

      // update post
      post.content = 'updated content';
      this.postsManager.savePost(post).subscribe(p => console.log('updated'));
    });

    // create new post
    this.postsManager.savePost(new Post({
      title: 'test',
      description: "test",
      content: 'test',
      image: new Image({id: 1, src: ''})
    })).subscribe(p => console.log('saved'));
  }
}
```
## To Do
- Improve documentation.
- Cache
- Add tests
- Method to set headers for all actions, and for specific. (Authorization token etc.)

## Cache
Will be implemented soon.
