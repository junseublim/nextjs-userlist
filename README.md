# Next.js Practice

유튜브 강의 [Next.js Tutorial for Beginners](https://www.youtube.com/playlist?list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw) 기반 Next.js 학습 프로젝트입니다.

## About Project

jsonplaceholder api를 사용해서 받아온 유저 데이터를 보여주는 간단한 웹사이트입니다.

## Link

[User_List_App](https://nextjs-userlist.vercel.app)

- deployed using vercel

# Next.js

## About Next.js

Next.js는 리액트 애플리케이션을 위한 서버 사이드 렌더링(Server Side Rendering) 구현을 도와주는 프레임워크입니다. Next.js는 또한 코드 번들링, 코드 스플리팅 등을 도와줍니다.

Next.js는 또한 다음과 같은 기능들을 제공합니다.

- Page-based routing
- Pre-rednering
- 자동적인 코드 스플리팅
- 빌트인 CSS, Sass 지원
- Fast Refresh


## Pages

Pages 디렉토리 내에서 export 되는 '.js', '.jsx', '.ts', '.tsx' 파일들을 page라고 합니다. 각 페이지는 자동으로 이름을 기반으로 생성된 route와 연결됩니다.

가령 'page/about.js' 파일에서 export하는 About 컴포넌트는 '/about'을 통해 접근 가능합니다.

https://nextjs-userlist.vercel.app/about

### Pages with Dynamic Routes

동적인 라우팅을 위해서는 param을 [ ] 으로 감싼 이름의 파일을 생성하면 됩니다.

가령 'users/[id].js' 파일에서는 각 id에 대한 html 페이지들을 미리 생생(Pre-render)해놓습니다. 따라서 예를 들어 1번 유저에 대한 디테일한 정보는 '/users/1'을 통해 접근 가능합니다.

https://nextjs-userlist.vercel.app/users/1

### Pre-rendering

Next.js는 클라이언트 사이드에서 html 페이지를 생성하는 대신 모든 페이지들을 Pre-render 해놓습니다. 따라서 더 나은 성능과 SEO를 보여줍니다.

각 생성된 html은 그 페이지만을 위한 최소한은 Javascript 코드와 함께 보내집니다. 브라우저에서 페이지가 로드되면 이 Javascript 코드를 통해 페이지가 interactive하게 됩니다. (hydration이라고 합니다.)

### Two forms of Pre-rendering

Next.js는 Pre-rendering을 위해 **Static Generation**과 **Server side Rendering**를 제공합니다. 이 두가지의 차이는 언제 html을 생성하는지입니다.

- Static Generation(권장됨) : HTML이 빌드 타임에 생성되며 향후 각 request 마다 재사용됩니다.
- Server-side Rendering : HTML이 각 request마다 생성됩니다.

Next.js는 이 둘중에 하나를 각 페이지마다 선택할 수 있도록 해줍니다. 따라서 어느 페이지에서는 Static Generation을 사용하고 어느 페이지에서는 Server-side Rendering을 사용하도록 할 수도 있습니다.

## Data Fetching

데이터를 가져오는 방식에는 3가지 함수들을 제공합니다.

- getStaticProps(Static Generation) : 빌드 타임 때 데이터를 가져옵니다.
- getStaticPaths(Static Generation) : 가져온 데이터를 기반으로 동적 라우트를 명시합니다.
- getServerSideProps(Server-side Rendering) : 각 request마다 데이터를 가져옵니다.

### getStaticProps

'getStaticProps'라는 이름의 async 함수를 export 하면 Next.js는 이 함수가 반환하는 props를 가지고 페이지를 Pre-render 합니다.

```js
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
```

'context' 매개변수는 다음을 포함하는 객체입니다.

- params : 동적 라우트를 사용하는 페이지들의 router 파라미터를 포함합니다. 예를 들어 페이지 이름이 [id].js라면 '{id : ...}'의 형태일 것입니다.
- preview: 프리뷰 모드이면 true, 아닐 경우 false 입니다.
- locale
- locales
- defaultLocale

getStaticProps는 다음을 포함하는 객체를 반환해야 합니다.

- props : 필수적인 객체로, 페이지 컴포넌트가 받을 prop을 포함합니다. serializable 객체이어야 합니다.
- revalidate : 선택적인 객체로, 페이지 재생성하기까지의 시간(초)를 포함합니다. 이는 Incremental Static Regeneration과 관련있습니다.
- notFound : 선택적인 객체로, true일 경우 페이지가 404 상태와 페이지를 반환하는 것을 허용합니다.
- redirect : 선택적인 객체로, 내부 혹은 외부적인 리소스로 리다이렉팅에 대한 값들을 포함합니다.

다음은 getStaticProps의 예입니다.

```js
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
```

getStaticProps는 다음의 상황에서 사용합니다.

- 페이지를 생성할 떄 필요한 데이터가 빌드 타임 떄 가져올 수 있는 경우
- 데이터가 공개적으로 캐시될 수 있는 경우 (특정 유저를 위한 것이 아닌 경우)

### getStaticPaths

동적 라우트가 필요하다면 getStaticPaths으로 paths의 리스트를 정의해야 빌드타임에 html 페이지들을 렌더링한다.

```js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } }
    ],
    fallback: true or false
  };
}
```

- path : 어떤 path가 렌더링되어야 할지를 결정한다. 예를 들어 'pages/posts/[id].js'라는 동적 라우트가 필요하다면 다음과 같은 paths를 가지는 객체를 반환해야한다.

  ```js
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: ...
  }
  ```

  Next.js가 자동으로 'posts/1', 'posts/2'와 같은 페이지를 빌드 타임에 생성한다.
  path안에 params는 페이지 내에 사용하는 파라미터와 일치해야한다.

- fallback :
  - false일 경우, 반환된 path가 아닌 경우 404page로 리다이렉트된다. 이는 path의 수가 적어 pre-render 해야하는 페이지의 수가 적을 경우 사용하면 된다. 또한 새로운 페이지들이 자주 추가되지 않는 경우 유용하다. 만약 새로운 페이지들을 렌더해야될 경우 다시 빌드를 해야되기 때문이다.
  - true일 경우, 반환된 path가 아닌 경우 그 페이지의 fallback 버전을 보여준다. 동시에 서버에서는 그 path에 대한 html을 생성하고 완료될 경우 이 json을 브라우저에 보내 새로운 데이터를 페이지를 변경한다. Next.js는 이 path를 pre-rendered pages 리스트에 추가한다. 이후 리퀘스트부터는 원래 있었던 페이지처럼 동작한다.

### getServerSideProps

getServerSideProps라는 이름의 함수를 export하면 Next.js가 리퀘스트가 들어올때마다 이 함수에서 받은 prop을 이용하여 페이지를 pre-render한다.

```js
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
```

context 파라미터는 다음의 키와 값을 가지는 객체이다.

- params : 동적 route를 사용하는 페이지일 경우 param은 route 파라미터를 포함한다. 만약 페이지 이름이 [id].js 일경우 param은 {id: ...}의 모양을 한다.
- req : HTTP IncomingMessage Object
- res : HTTP response object
- query : 쿼리 스트링
- preview : true일 경우 페이지가 프리뷰 모드.
- previewData : setPreviewData에서 설정된 프리뷰 데이터
- resolvedUrl : request url의 정규화된 버전.

getServerSideProps는 다음을 포함하는 객체를 반환해야 한다.

- props: 페이지에 제공하는 props
- notFound : boolean 값으로 페이지가 404 status를 반환하도록 한다.

```js
export async function getServerSideProps(context) {
  const res = await fetch(`https://...`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
```

#### 언제 getServerSideProps를 사용해야 할까?

getServerSideProps는 데이터를 리퀘스트가 왔을때 fetch해야할 경우 사용해야한다. 매번 결과를 계산해야 하기 때문에 Time to first byte(TTFB)가 getStaticProps보다 느리다.

### SWR

만약 클라이언트 사이드에서 데이터를 가져와야 한다면, SWR를 사용하면 된다.
SWR은 데이터 fetching을 위한 리액트 훅 라이브러리이다.
우선 stale한 데이터를 먼저 보여주고, 데이터를 fetching한 후, 다시 최신 데이터를 보여주는 형식으로 작동한다.
캐싱, revalidation, focus tracking, refetching on interval 등의 기능을 제공한다.


```js
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

## Routing

Next.js는 파일 시스템 기반 라우터를 제공한다. pages 디렉토리 내에 파일을 생성하면 자동적으로 route으로 사용된다. 

### Index routes

index라고 이름 지어진 파일은 root로 자동적으로 route된다.
`pages/index.js` -> `/`

### Nexted routes

pages 내에 폴더를 생성하면 중첩 라우팅이 가능하다.

### Dynamic route segments

파라미터랑 매칭시켜 라우팅하려면 파일 이름을 []으로 감싸면 된다.

### Linking between pages

Link를 사용하면 클라이언트 사이드에서 라우팅을 할 수 있다.
```js
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
```

