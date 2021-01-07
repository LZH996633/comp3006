import ModelTask from '../model/model.task';
import BaseService from './BaseService';
import ProjectService from './ProjectService';
import UserService from './UserService';

class TaskService extends BaseService {
  constructor() {
    super(ModelTask);
  }

  /**
   * create new task and save database
   *
   * @param {*} data
   * @returns
   * @memberof TaskService
   */
  async AddTask(data) {
    const {project_id, task_name, task_begin_time, task_end_time, task_user_id, task_username} = data;
    if (!project_id) {
      this.failure('task project id is not empty');
    }
    if (!task_name) {
      this.failure('task name is not empty');
    }
    if (!task_begin_time) {
      this.failure('task begin time is not empty');
    }
    if (!task_end_time) {
      this.failure('task end time is not empty');
    }
    if (!task_user_id) {
      this.failure('task people is not empty');
    }
    if (!task_username) {
      const uInfo = await UserService.findById(task_user_id);
      if (!uInfo) {
        this.failure('task people is not exists');
      }
      data.task_username = task_username;
    }

    const projectInfo = await ProjectService.findById(project_id);
    if (!projectInfo) {
      this.failure('task project is not exists');
    }
    data.project_name = projectInfo.project_name;

    await this.create(data);
    return this.success('add task success');
  }

  /**
   * delete task by id
   *
   * @param {*} id
   * @param {*} user_id
   * @returns
   * @memberof TaskService
   */
  async DeleteTask(id, user_id) {
    const taskInfo = await this.findById(id);
    if (!taskInfo) {
      this.failure('task is not exists');
    }
    if (taskInfo.own_id !== user_id) {
      this.failure(`It's not yours. I don't have the right to operate it`);
    }
    await this.findByIdAndDelete(id);
    return this.success('delete task success');
  }

  /**
   * update task information
   *
   * @param {*} data
   * @returns
   * @memberof TaskService
   */
  async UpdateTask(data) {
    const {id, task_name, task_begin_time, task_end_time, task_state, task_describe} = data;
    const updateField = {};
    if (task_name) {
      updateField.task_name = task_name;
    }
    if (task_begin_time) {
      updateField.task_begin_time = task_begin_time;
    }
    if (task_end_time) {
      updateField.task_end_time = task_end_time;
    }
    if (task_state) {
      updateField.task_state = task_state;
    }
    if (task_describe) {
      updateField.task_describe = task_describe;
    }

    await this.findByIdAndUpdate(id, updateField);
    return this.success('update task success');
  }
}

export default new TaskService();
