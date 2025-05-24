import { PlaylistMusics } from "../models";
import { IPlaylistMusicRepository } from "../types";
import { PlaylistMusicData } from "../types";

class PlaylistMusicRepository implements IPlaylistMusicRepository {
  async addMusicToPlaylist(data: PlaylistMusicData): Promise<PlaylistMusics> {
    try {
      const result = await PlaylistMusics.create(data);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async removeMusicFromPlaylist(
    playlistId: number,
    musicId: number
  ): Promise<boolean> {
    try {
      const result = await PlaylistMusics.destroy({
        where: { playlistId, musicId },
      });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }

  async getMusicsByPlaylistId(playlistId: number): Promise<PlaylistMusics[]> {
    try {
      const result = await PlaylistMusics.findAll({
        where: { playlistId },
        order: [["position", "ASC"]],
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMusicPosition(
    playlistId: number,
    musicId: number,
    newPosition: number
  ): Promise<boolean> {
    try {
      const result = await PlaylistMusics.update(
        { position: newPosition },
        { where: { playlistId, musicId } }
      );

      return result[0] > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default new PlaylistMusicRepository();
