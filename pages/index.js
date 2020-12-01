import "react-photoswipe/lib/photoswipe.css";
import Gallery from "../components/gallery";
import styles from "../styles/Home.module.css";


export default function Home({ memes }) {
  
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}> Reddit Meme Gallery</h1>
        <hr />
        <Gallery items={memes} />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://reddit.com/r/memes.json?limit=1000");
  const resjson = await res.json();
  const memes = resjson.data.children
    .filter((post) => {
      return post.data.thumbnail && post.data.post_hint == "image";
    })
    .map((post) => {
      var meme = post.data;
      return {
        thumbnail: meme.thumbnail,
        src: meme.url,
        w: 1200,
        h: 900,
        title: meme.title,
      };
    });
  return { props: { memes } };
};
