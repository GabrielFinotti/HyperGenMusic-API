import { constants } from "..";
import { MusicData } from "../../types";

function verifyMusicData(musicData: MusicData, isUpdate: false): string;
function verifyMusicData(musicData: Partial<MusicData>, isUpdate: true): string;

function verifyMusicData(
  musicData: MusicData | Partial<MusicData>,
  isUpdate: boolean
) {
  const errors: string[] = [];

  if (isUpdate) {
    if (musicData.title && musicData.title !== musicData.title.trim()) {
      errors.push("Title cannot have leading or trailing spaces.");
    }
    if (musicData.artist && musicData.artist !== musicData.artist.trim()) {
      errors.push("Artist cannot have leading or trailing spaces.");
    }
    if (musicData.genre && musicData.genre !== musicData.genre.trim()) {
      errors.push("Genre cannot have leading or trailing spaces.");
    }

    if (musicData.title && musicData.title.length < 1) {
      errors.push("Title must be at least 1 character long.");
    }
    if (musicData.artist && musicData.artist.length < 1) {
      errors.push("Artist must be at least 1 character long.");
    }
    if (musicData.genre && musicData.genre.length < 1) {
      errors.push("Genre must be at least 1 character long.");
    }

    if (musicData.imageUrl) {
      if (musicData.imageUrl !== musicData.imageUrl.trim()) {
        errors.push("Image URL cannot have leading or trailing spaces.");
      }
      if (!constants.regex.url.test(musicData.imageUrl)) {
        errors.push("Image URL must be a valid URL.");
      }
    }
  } else {
    const fullMusicData = musicData as MusicData;

    if (fullMusicData.title !== fullMusicData.title.trim()) {
      errors.push("Title cannot have leading or trailing spaces.");
    }
    if (fullMusicData.artist !== fullMusicData.artist.trim()) {
      errors.push("Artist cannot have leading or trailing spaces.");
    }
    if (
      fullMusicData.genre &&
      fullMusicData.genre !== fullMusicData.genre.trim()
    ) {
      errors.push("Genre cannot have leading or trailing spaces.");
    }

    if (fullMusicData.title.length < 1) {
      errors.push("Title must be at least 1 character long.");
    }
    if (fullMusicData.artist.length < 1) {
      errors.push("Artist must be at least 1 character long.");
    }
    if (fullMusicData.genre && fullMusicData.genre.length < 1) {
      errors.push("Genre must be at least 1 character long.");
    }

    if (isNaN(fullMusicData.duration) || fullMusicData.duration < 0) {
      errors.push("Duration must be a positive number.");
    }

    if (fullMusicData.songUrl !== fullMusicData.songUrl.trim()) {
      errors.push("Song URL cannot have leading or trailing spaces.");
    }
    if (!constants.regex.url.test(fullMusicData.songUrl)) {
      errors.push("Song URL must be a valid URL.");
    }
    if (fullMusicData.imageUrl) {
      if (fullMusicData.imageUrl !== fullMusicData.imageUrl.trim()) {
        errors.push("Image URL cannot have leading or trailing spaces.");
      }
      if (!constants.regex.url.test(fullMusicData.imageUrl)) {
        errors.push("Image URL must be a valid URL.");
      }
    }
  }

  return errors.length > 0 ? errors.join(", ") : "";
}

export default verifyMusicData;
