import { PlaylistMusics } from "../models";
import { IPlaylistMusicRepository } from "../types";
import { PlaylistMusicData } from "../types";

class PlaylistMusicRepository implements IPlaylistMusicRepository {
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

  async addMusicToPlaylist(
    playlistMusicData: PlaylistMusicData
  ): Promise<PlaylistMusics> {
    try {
      const result = await PlaylistMusics.create(playlistMusicData);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMusicPosition(
    playlistMusicData: PlaylistMusicData
  ): Promise<boolean> {
    try {
      const result = await PlaylistMusics.update(
        { position: playlistMusicData.position },
        {
          where: {
            playlistId: playlistMusicData.playlistId,
            musicId: playlistMusicData.musicId,
          },
        }
      );

      return result[0] > 0;
    } catch (error) {
      throw error;
    }
  }

  async removeMusicFromPlaylist(
    playListMusicData: PlaylistMusicData
  ): Promise<boolean> {
    try {
      const result = await PlaylistMusics.destroy({
        where: {
          playlistId: playListMusicData.playlistId,
          musicId: playListMusicData.musicId,
        },
      });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default new PlaylistMusicRepository();
