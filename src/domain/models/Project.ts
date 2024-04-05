import { Project, ProjectStatus } from "../entities/Project";

export default class ProjectImpl implements Project {
  constructor(
    public id: string,
    public title: string,
    public _status: Project["status"],
    public owner: Project["owner"],
    public collaborators: Project["owner"][] = [],
  ) {}
  get projectInfos(): Project {
    return {
      id: this.id,
      title: this.title,
      status: this._status,
      owner: this.owner,
      collaborators: this.collaborators,
    };
  }
  set status(status: ProjectStatus) {
    this._status = status;
  }
}
