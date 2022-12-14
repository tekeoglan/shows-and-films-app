import Footer from "compenents/Footer";
import Header from "compenents/Header";
import SimilarContents from "./compenents/SimilarContents";
import styles from "./Content.module.css";
import { TMDB_IMAGE_PATH, YT_WATCH_PATH } from "config/constants/endpoints";
import Image from "next/image";

type ContentProps = {
  kind: string;
  data: any;
  videos: any;
  reviews: any;
  similars: any;
};

const parseGenres = (genres: any[]): string => {
  let s = "";
  genres?.map((genre) => {
    s += `${genre.name}, `;
  });
  return s;
};

const TvAttributes = ({ data }) => {
  return (
    <ul>
      <li>{`Genres: ${parseGenres(data?.genres)}`}</li>
      <li>{`Release Date: ${data?.first_air_date || ""}`}</li>
      <li>{`Total Episodes: ${data?.number_of_episodes || "0"}`}</li>
      <li>{`Total Seasons: ${data?.number_of_seasons || "0"}`}</li>
    </ul>
  );
};

const MovieAttributes = ({ data }) => {
  return (
    <ul>
      <li>{`Genres: ${parseGenres(data?.genres)}`}</li>
      <li>{`Release Date: ${data?.release_date || ""}`}</li>
      <li>{`Budget: ${data.budget?.toLocaleString() || "0"}`}</li>
      <li>{`Revenue: ${data.revenue?.toLocaleString() || "0"}`}</li>
    </ul>
  );
};

const Content = ({ kind, data, videos, reviews, similars }: ContentProps) => {
  const propsStyle = {
    backgroundImage: `url(${TMDB_IMAGE_PATH}${data?.backdrop_path})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#1b263b",
  };

  return (
    <>
      <Header />
      <main className={styles.content}>
        <div className={styles.contentProps} style={propsStyle}>
          <div id={styles["part1"]} className={styles.part}>
            <Image
              src={`${TMDB_IMAGE_PATH}${data?.poster_path}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div id={styles["part2"]} className={styles.part}>
            <iframe
              width="100%"
              height="100%"
              src={`${YT_WATCH_PATH}${videos[0]?.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div id={styles["part3"]} className={styles.part}>
            {kind === "movie" ? (
              <MovieAttributes data={data} />
            ) : (
              <TvAttributes data={data} />
            )}
          </div>
          <div id={styles["part4"]} className={styles.part}>
            <p>{data?.overview || "Overview"}</p>
          </div>
        </div>
        <div className={styles.reviews}>
          <p>
            <span>{`${reviews[0]?.author || "Author"}: `}</span>
            {`${reviews[0]?.content || "review"}`}
          </p>
        </div>
        <SimilarContents spec={kind} data={similars} />
      </main>
      <Footer />
    </>
  );
};

export default Content;
