import { Playlist } from "../models";
import { IPlaylistRepository } from "../types";
import { PlaylistData } from "../types";

class PlaylistRepository implements IPlaylistRepository {
  async getPlaylistsByUserId(userId: number): Promise<Playlist[]> {
    try {
      const playlists = await Playlist.findAll({ where: { userId } });

      return playlists;
    } catch (error) {
      throw error;
    }
  }

  async getPlaylistById(playlistId: number) {
    try {
      const playlist = await Playlist.findByPk(playlistId);

      return playlist;
    } catch (error) {
      throw error;
    }
  }

  async createPlaylist(playlistData: PlaylistData): Promise<Playlist> {
    try {
      const newPlaylist = await Playlist.create(playlistData);

      return newPlaylist;
    } catch (error) {
      throw error;
    }
  }

  async updatePlaylist(
    playlistId: number,
    playlistData: Partial<PlaylistData>
  ): Promise<Playlist> {
    const transaction = await Playlist.sequelize?.transaction();

    try {
      const playlist = await Playlist.findByPk(playlistId, { transaction });

      if (!playlist) {
        throw new Error(`Playlist com ID ${playlistId} não encontrada.`);
      }

      await playlist.update(playlistData, { transaction });

      await transaction?.commit();

      return playlist;
    } catch (error) {
      await transaction?.rollback();

      throw error;
    }
  }

  async deletePlaylist(playlistId: number): Promise<boolean> {
    try {
      const result = await Playlist.destroy({ where: { id: playlistId } });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default new PlaylistRepository();
