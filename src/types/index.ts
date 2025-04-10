import { UserInterface } from "./user/userInterface";
import { MusicInterface } from "./music/musicInterface";
import { UploadedFiles } from "./uploads/uploadedFilesInterface";
import {
  DefaultResponseFunction,
  DefaultResponseResult,
} from "./handling/defaultReponse";
import { IMusicRepository, IUserRepository } from "./repositories";
import {
  UserService,
  MusicService,
  UserAdminService,
  MusicAdminService,
} from "./services";

export {
  UserInterface,
  MusicInterface,
  UploadedFiles,
  DefaultResponseFunction,
  DefaultResponseResult,
  IMusicRepository,
  IUserRepository,
  UserService,
  MusicService,
  UserAdminService,
  MusicAdminService,
};
