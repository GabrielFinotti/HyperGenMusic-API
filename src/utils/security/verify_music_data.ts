/**
 * Utilitário de Validação de Dados de Música - HyperMusic API v2.0
 *
 * Fornece validação robusta de dados de música para operações de
 * criação e atualização, aplicando regras de negócio específicas
 * como formato de URLs, duração e validação de metadados.
 *
 * Funcionalidades:
 * - Validação completa para criação de música
 * - Validação parcial para atualizações
 * - Verificação de URLs de audio e imagem
 * - Validação de duração e metadados
 * - Verificação de tipos e comprimentos mínimos
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 *
 * @param musicData - Dados da música a serem validados
 * @param isUpdate - Se true, permite validação parcial; se false, exige dados completos
 * @returns String com erros encontrados (vazia se válido)
 *
 * @example
 * ```typescript
 * // Validação para criação
 * const errors = verifyMusicData(newMusic, false);
 *
 * // Validação para atualização
 * const updateErrors = verifyMusicData({ title: "New Title" }, true);
 * ```
 */
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
