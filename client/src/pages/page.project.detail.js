import React from 'react';
import {connect} from 'react-redux';
import styles from './pages.module.scss';
import * as allActions from '../actions';
import TaskTemplate from '../components/component.task';
import Chat from '../components/component.chat';
import Utility from '../common/Utility';
import BasePage from './page.base';

class ProjectDetail extends BasePage {
  constructor(props) {
    super(props);
    this.state.info = {};
    this.state.isEdit = false;
  }

  componentDidMount() {
    this.getTaskUserList();
    this.getDetail();
  }

  update() {
    this.setState({ts: new Date()});
  }

  async getTaskUserList() {
    await this.props.taskUserList();
    this.update();
  }

  async getDetail() {
    const id = this.props.match.params.id;
    await this.props.projectDetail(id);
    const detail = this.props.Project.detail;
    this.state.info = {...detail};
    this.update();
  }

  setShowConfirm(val) {
    this.state.showConfirmDialog = val;
    this.update();
  }

  handleChange(field, source) {
    this.state.info[field] = source.target.value;
    this.update();
  }

  handleEdit() {
    this.state.isEdit = !this.state.isEdit;
    this.update();
  }

  async handleUpdate() {
    await this.props.projectUpdate(this.state.info);
    Utility.Alert('update success');
    this.handleEdit();
  }

  render() {
    const {isEdit} = this.state;
    const info = this.state.info || {};
    const {userList} = this.props.Task;
    const {detail = {}} = this.props.Project;
    const {id: user_id} = Utility.UserInfo || {};
    return (
      <div className={styles.projectDetail}>
        <div className={styles.row}>
          <div className={styles.col0}>{user_id === detail.user_id && <button onClick={this.handleEdit.bind(this)}>{isEdit ? 'Cancel' : 'Edit'}</button>}</div>
          <div className={styles.col}></div>
          <div className={styles.col0}>
            <button onClick={() => this.props.history.goBack()}>Back</button>
          </div>
        </div>

        <div className={`${styles.row} ${styles.alignCenter}`}>
          <div className={styles.projectLabel}>Project Name</div>
          <div className={styles.col}>
            <input disabled={!isEdit} placeholder="Please enter project name" value={info.project_name || ''} onChange={this.handleChange.bind(this, 'project_name')} />
          </div>
          <div className={styles.projectLabel}>Begin Time</div>
          <div className={styles.col}>
            <input
              disabled={!isEdit}
              type="date"
              value={info.project_begin_time || ''}
              placeholder="Please enter project begin time"
              onChange={this.handleChange.bind(this, 'project_begin_time')}
            />
          </div>
          <div className={styles.projectLabel}>End Time</div>
          <div className={styles.col}>
            <input
              disabled={!isEdit}
              type="date"
              value={info.project_end_time || ''}
              placeholder="Please enter project end time"
              onChange={this.handleChange.bind(this, 'project_end_time')}
            />
          </div>
          <div className={styles.projectLabel}>State</div>
          <div className={styles.col}>
            <select disabled={!isEdit} value={info.project_state} onChange={this.handleChange.bind(this, 'project_state')}>
              <option value={1}>has not started</option>
              <option value={2}>processing</option>
              <option value={3}>completed</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.projectLabel}>Describe</div>
          <div className={styles.col}>
            {isEdit ? (
              <textarea placeholder="Please enter project describe" onChange={this.handleChange.bind(this, 'project_describe')} value={info.project_describe} />
            ) : (
              <div className={styles.project_describe}>{info.project_describe}</div>
            )}
          </div>
        </div>
        {isEdit && (
          <div className={`${styles.row} ${styles.alignCenter}`}>
            <div className={styles.projectLabel}> </div>
            <div className={styles.col}>
              <button onClick={this.handleUpdate.bind(this)}>Save</button>
            </div>
          </div>
        )}
        <div className={styles.row}></div>
        <div className={styles.splitLine}></div>
        <div className={styles.row}></div>

        <TaskTemplate taskList={info.taskList} {...info} isEdit={isEdit} userList={userList} />

        <div className={styles.row}></div>
        <div className={styles.splitLine}></div>
        <div className={styles.row}></div>
        {info && info.id && (
          <div className={styles.chat600}>
            <Chat projectInfo={info} />
          </div>
        )}
      </div>
    );
  }
}

export default connect((state) => ({...state}), {...allActions})(ProjectDetail);
