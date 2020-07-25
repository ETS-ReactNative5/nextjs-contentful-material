import Head from 'next/head'

import { getAllPostsForHome } from '../api/contentful'
import HeroPost from '../../components/blog/HeroPost/HeroPost'
import MainBlogList from '../../components/blog/Thumbs/MainBlogList'
import PageIntro from '../../components/PageIntro'

export default function BlogIndex({ allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  const heroParagraph = `I'm an avid writer. Below, you'll find a few
  pieces that I'm particularly proud of. If you care to understand my
  thought process, check out a few posts and let me know what you think.`
  return (
    <>
      <Head>
        <title>Steven's Blog</title>
        <meta property='og:title' content="Steven's Blog" />
      </Head>
      <PageIntro title='Blog' paragraph={heroParagraph} />
      <main>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage.url}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            readingTime={heroPost.stats.text}
            titlePosition='right'
          />
        )}
        {morePosts.length > 0 && <MainBlogList posts={morePosts} />}
      </main>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { preview, allPosts },
  }
}
