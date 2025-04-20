import { DefaultResponseResult } from "../handling/defaultReponse";
import { UploadedFiles } from "../uploads/uploadedFilesInterface";

export interface MusicAdminService {
  insertMusic(
    title: string,
    duration: string | number,
    files: UploadedFiles,
    baseUrl: string,
    artist?: string,
    genre?: string
  ): Promise<DefaultResponseResult>;
  deleteMusic(id: number): Promise<DefaultResponseResult>;
  deleteAllMusics(): Promise<DefaultResponseResult>;
  editMusic(
    musicId: number,
    baseUrl: string,
    title?: string,
    artist?: string,
    genre?: string,
    files?: UploadedFiles
  ): Promise<DefaultResponseResult>;
}
