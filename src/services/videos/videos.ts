import { getCategories } from './categories';
import { updateAuthor, getAuthors, getAuthorById } from './authors';
import { Format, ProcessedVideo } from '../../common/interfaces';
import { Author } from './../../common/interfaces';
import { getCategoryName } from './../../utils/getCategoryName';

/**
 * Getting Highest Format
 * @param {array} categories
 * @param {number[]} catIds
 * @returns {Array<filteredCategories>[]}
 */
const getHighestFormat = (formats: Format) => {
  const format = Object.values(formats);
  return format.reduce((prev: Format, current: Format) => (prev.size > current.size ? prev : current));
};

/**
 * Getting Videos
 * @returns {Promise<ProcessedVideo[]>}
 */
export const getVideos = async (): Promise<ProcessedVideo[]> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);

  /** Approach 1 */

  //   const videos = authors.map((author) => {
  //     return author.videos.map((video) => {
  //       return {
  //         id: video.id,
  //         name: video.name,
  //         author: author.name,
  //         categories: filterCategories(categories, video.catIds),
  //         formats: getHighestFormat(video.formats),
  //         releaseDate: video.releaseDate,
  //       };
  //     });
  //   });
  //   const conactAllVideos = Array.prototype.concat.apply([], videos)
  //   return conactAllVideos;

  /** Approach 2 */

  // Getting all videos and author in one array
  let videos: any = [];
  authors.forEach((eachAuthor) => {
    videos = videos.concat([{ ...eachAuthor }], eachAuthor.videos);
  });

  // Getting merge videos with author name, category and format
  let videoWithCompleteData: any = [];
  videos.forEach((eachVideo: any, i: any, arr: any) => {
    if (!eachVideo.hasOwnProperty('videos')) {
      eachVideo.author = arr[i - 1].author ? { ...arr[i - 1].author } : { id: arr[i - 1].id, name: arr[i - 1].name };
      eachVideo.categories = getCategoryName(categories, eachVideo.catIds, false);
      eachVideo.formats = getHighestFormat(eachVideo.formats);
      videoWithCompleteData.push(eachVideo);
    }
  });

  return videoWithCompleteData;
};

export const createVideo = async (id: number, data: Author) => {
  await updateAuthor(id, data);
};

export const getVideoById = async (id: number) => {
  const author = await getAuthorById(id);
  return author;
};
